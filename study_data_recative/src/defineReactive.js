/**
 * create date:2021-3-17
 */

import observe from "./observe";
import Dep from "./Dep";

/*
 * @param {对象} data
 * @param {属性} key
 * @param {属性值} val
 */
// 放弃在外部定义变量实现中转，而通过闭包的方式来实现值的读取与修改
export default function defineReactive(data, key, val) {
  const dep = new Dep();
  console.log("我是defineReactive", data, key);
  // 只传了两个参数
  if (arguments.length === 2) {
    val = data[key];
  }

  let childOb = observe(val);

  Object.defineProperty(data, key, {
    get() {
      console.log(`正在访问${key}属性`);
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      return val;
    },
    set(newValue) {
      console.log(`正尝试改变${key}属性`, newValue);
      if (newValue === val) {
        return;
      }
      val = newValue;
      childOb = observe(newValue);
      // 发布订阅模式，通知dep
      dep.notify();
    },
  });
}
