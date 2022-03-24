import observe from "./observe";
import Dep from "./Dep";

export default function defineReactive(data, key, val) {
  // val闭包中的dep
  const dep = new Dep();
  if (arguments.length === 2) {
    val = data[key];
  }
  // observe
  let childOb = observe(val);

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    // getter
    get() {
      // 如果现在处于依赖收集阶段
      if (window.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      return val;
    },
    //setter
    set(newValue) {
      if (val === newValue) {
        return;
      }
      val = newValue;
      // 当设置了新值，这个新值也要被observe
      childOb = observe(newValue);
      // 发布订阅模式，通知dep
      dep.notify();
    },
  });
}
