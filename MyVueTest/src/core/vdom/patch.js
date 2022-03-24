import { isUndef, isDef, isPrimitive } from "../../shared/util";
import VNode from "./VNode";

export function createPatchFunction(backend) {
  const { modules, nodeOps } = backend;

  /**
   * 基于 vnode 创建整棵 DOM 树，并插入到父节点上
   */
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm) {
    // 尝试创建组件的实例
    /**
     * 重点
     * 1、如果 vnode 是一个组件，则执行 init 钩子，创建组件实例并挂载，
     *   然后为组件执行各个模块的 create 钩子
     *   如果组件被 keep-alive 包裹，则激活组件
     * 2、如果是一个普通元素，则什么也不错
     */
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    // 获取 data 对象
    const data = vnode.data;
    // 所有的孩子节点
    const children = vnode.children;
    // 标签名
    const tag = vnode.tag;
    if (isDef(tag)) {
      // 创建新节点
      vnode.elm = nodeOps.createElement(tag, vnode);
      // 递归创建所有的子节点（普通元素、组件）
      createChildren(vnode, children, insertedVnodeQueue);
      insert(parentElm, vnode.elm);
    } else {
      // 文本节点，创建文本节点并插入父节点内
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm);
    }
  }

  /**
   * 如果 vnode 是一个组件，则执行 init 钩子，创建组件实例，并挂载
   * 然后为组件执行各个模块的 create 方法
   * @param {*} vnode 组件新的 vnode
   * @param {*} insertedVnodeQueue 数组
   * @param {*} parentElm oldVnode 的父节点
   * @param {*} refElm oldVnode 的下一个兄弟节点
   * @returns 如果组件被 keep-alive 包裹，则返回 true，否则为 undefined
   */
  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    // 获取 vnode.data 对象
    let i = vnode.data;
    if (isDef(i)) {
      const isReactivated = isDef(vnode.componentInstance);
      // 如果存在init钩子则执行
      // 执行实例创建和挂载
      if (isDef((i = i.hook)) && isDef((i = i.init))) {
        // 此时i是init，应该是在这里执行init的时候挂载componentInstance
        i(vnode, false);
      }
      if (isDef(vnode.componentInstance)) {
        // 如果 vnode 是一个子组件，则调用 init 钩子之后会创建一个组件实例，并挂载
        // 这时候就可以给组件执行各个模块的的 create 钩子了
        initComponent(vnode, insertedVnodeQueue);
        // 将组件的 DOM 节点插入到父节点内
        insert(parentElm, vnode.elm, refElm);
        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    vnode.elm = vnode.componentInstance.$el;
  }

  function insert(parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (let i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(
        vnode.elm,
        nodeOps.createTextNode(String(vnode.text))
      );
    }
  }

  // 创建空节点
  function emptyNodeAt(elm) {
    return new VNode(
      nodeOps.tagName(elm).toLowerCase(),
      {},
      [],
      undefined,
      elm
    );
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    const insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      createElm(vnode, insertedVnodeQueue);
    } else {
      const isRealElement = isDef(oldVnode.nodeType);
      if (isRealElement) {
        oldVnode = emptyNodeAt(oldVnode);
      }
      const oldElm = oldVnode.elm;
      const parentElm = nodeOps.parentNode(oldElm);
      // 将新的vdom转换为真实dom
      createElm(
        vnode,
        insertedVnodeQueue,
        parentElm,
        nodeOps.nextSibling(oldElm)
      );
    }
    // 主要问题是子组件时，在path里的createComponenet中没有执行那个方法
    // 然后这里没返回vm
    return vnode.elm;
  };
}
