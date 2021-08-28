/**
 * create date:2021-3.18
 */
import { def } from "./utils";
const arrayPrototype = Array.prototype;

// 以Array.prototype为原型创建arrayMethods对象
export const arrayMethods = Object.create(arrayPrototype);

// 要被改写的7个数组方法
const methodsNeedChange = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

methodsNeedChange.forEach((methodName) => {
  // 备份原生方法
  const original = arrayPrototype[methodName];

  // 定义新的方法
  def(
    arrayMethods,
    methodName,
    function () {
      const result = original.apply(this, arguments);
      // 将类数组对象变为数组
      const args = [...arguments];
      const ob = this.__ob__;

      let inserted = [];

      switch (methodName) {
        case "push":
        case "unshift":
          inserted = args;
          break;
        case "splice":
          inserted = args.slice(2);
          break;
      }

      // 判断有没有要插入的新项，让新项也变为响应的
      if (inserted) {
        ob.observeArray(inserted);
      }

      console.log(666);

      ob.dep.notify();

      return result;
    },
    false
  );
});
