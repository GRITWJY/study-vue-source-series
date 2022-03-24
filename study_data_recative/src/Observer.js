import { def } from "./utils";
import defineReactive from "./defineReactive";
import { arrayMethods } from "./array";
import observe from "./observe";
import Dep from "./Dep";

/**
 * Observer类会通过递归的方式把一个对象的所有属性都转化成可观测对象
 */
export default class Observer {
  constructor(value) {
    // 每一个Observer的实例身上都有一个dep
    this.dep = new Dep();

    // 给实例(构造函数中的this表示 实例)
    // 添加了__ob__属性，值是这次new的实例
    def(value, "__ob__", this, false);

    // !!!
    // 目的是将一个正常的obj转为每个层级
    // 的属性都是响应式（可以被侦测的）obj
    if (Array.isArray(value)) {
      // 如果是数组，将数组的原型指向arrayMethods
      Object.setPrototypeOf(value, arrayMethods);
      // 让数组变得observe
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  // 遍历value的每一个key，把每一个key都设置成defineReactive的
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  }

  // 数组的特殊遍历
  observeArray(arr) {
    for (let i = 0, l = arr.length; i < l; i++) {
      // 逐项进行observe
      observe(arr[i]);
    }
  }
}
