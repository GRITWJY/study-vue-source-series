import { mergeOptions } from "../util/index";

export function initExtend(Vue) {
  /**
   *每个实例构造函数（包括Vue）都有一个唯一的
   *cid。这使我们能够创建包装的“子对象”
   *“构造函数”用于原型继承并缓存它们。
   */
  Vue.cid = 0;
  let cid = 1;

  /**
   * 基于 Vue 去扩展子类，该子类同样支持进一步的扩展
   * 扩展时可以传递一些默认配置，就像 Vue 也会有一些默认配置
   * 默认配置如果和基类有冲突则会进行选项合并（mergeOptions)
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};

    const Super = this; // vue
    const SuperId = Super.cid;

    // 定义 Sub 构造函数，和 Vue 构造函数一样

    const Sub = function VueComponent(options) {
      // 初始化
      this._init(options);
    };

    // super的到Sub上
    // 通过原型继承的方式继承 Vue
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    // 选项合并，合并 Vue 的配置项到 自己的配置项上来
    Sub.options = mergeOptions(Super.options, extendOptions);
    return Sub;
  };
}
