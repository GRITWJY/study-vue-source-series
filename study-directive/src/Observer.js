/**
 * create date:2021-3-17
 */
import { def } from "./utils";
import defineReactive from "./defineReactive";
import { arrayMethods } from "./array";
import observe from "./observe";
import Dep from "./Dep";

export default class Observer {
  constructor(value) {
    // 每一个Ovserver的实例身上，都有一个dep
    this.dep = new Dep();
    // this代表实例
    def(value, "__ob__", this, false);
    console.log("Observer构造器执行了", value);
    // 检查是数组还是对象
    if (Array.isArray(value)) {
      Object.setPrototypeOf(value, arrayMethods);
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  //   遍历
  walk(value) {
    for (let k in value) {
      defineReactive(value, k);
    }
  }

  // 数组的特殊遍历
  observeArray(arr) {
    for (let i = 0, l = arr.length; i < l; i++) {
      observe(arr[i]);
    }
  }
}
