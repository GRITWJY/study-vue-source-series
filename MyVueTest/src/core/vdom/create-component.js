import { isUndef, isObject } from "../util/index";
import { resolveConstructorOptions } from "../instance/init";
import VNode from "./VNode";
import { activeInstance } from "../instance/lifecycle";

// patch 期间在组件 vnode 上调用内联钩子
// inline hooks to be invoked on component VNodes during patch
const componentVNodeHooks = {
  // createElement时， 会在判断i.init时，并执行
  // 把componentInstance挂载到上面
  init(vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
    } else {
      // activeInstance  vm  ？
      // 如何创建componentInstance
      const child = (vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      ));
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
    console.log("componentVNodeHooks -init");
  },
  // 更新 VNode，用新的 VNode 配置更新旧的 VNode 上的各种属性
  prepatch() {
    console.log("componentVNodeHooks -prepatch");
  },
  // 执行组件的 mounted 声明周期钩子
  insert() {
    console.log("componentVNodeHooks -insert");
  },
  /**
   * 销毁组件
   *   1、如果组件被 keep-alive 组件包裹，则使组件失活，不销毁组件实例，从而缓存组件的状态
   *   2、如果组件没有被 keep-alive 包裹，则直接调用实例的 $destroy 方法销毁组件
   */
  destroy() {
    console.log("componentVNodeHooks  -destroy");
  },
};

const hooksToMerge = Object.keys(componentVNodeHooks);

export function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  const baseCtor = context.$options._base;

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }
  if (typeof Ctor !== "function") {
    return;
  }

  let asyncFactory;
  if (isUndef(Ctor.cid)) {
    // todo:
  }

  data = data || {};

  const propsData = "";
  const listeners = "";

  /**
   * 在组件的 data 对象上设置 hook 对象，
   * hook 对象增加四个属性，init、prepatch、insert、destroy，
   * 负责组件的创建、更新、销毁，这些方法在组件的 patch 阶段会被调用
   * install component management hooks onto the placeholder node
   */
  installComponentHooks(data);
  const name = Ctor.options.name || tag;
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ""}`,
    data,
    undefined,
    undefined,
    undefined,
    context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  );
  return vnode;
}

/**
 * 在组件的 data 对象上设置 hook 对象，
 * hook 对象增加四个属性，init、prepatch、insert、destroy，
 * 负责组件的创建、更新、销毁
 */
function installComponentHooks(data) {
  const hooks = data.hook || (data.hook = {});
  // 遍历 hooksToMerge 数组，hooksToMerge = ['init', 'prepatch', 'insert' 'destroy']
  for (let i = 0; i < hooksToMerge.length; i++) {
    // 比如 key = init
    const key = hooksToMerge[i];
    // 从 data.hook 对象中获取 key 对应的方法
    const existing = hooks[key];
    // componentVNodeHooks 对象中 key 对象的方法
    const toMerge = componentVNodeHooks[key];
    // 合并用户传递的 hook 方法和框架自带的 hook 方法，其实就是分别执行两个方法
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = toMerge;
    }
  }
}

export function createComponentInstanceForVnode(vnode, parent) {
  // parent=>activeInstance in lifecycle state
  // 为node创建实例

  const options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent,
  };

  // 调用到_init，/core/instalce
  // 这里调用Ctor，就会走到initlifecycle
  return new vnode.componentOptions.Ctor(options);
}
