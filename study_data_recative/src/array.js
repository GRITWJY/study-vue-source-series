import { def } from "./utils";

// 1、得到Array.prototype
const arrayPrototye = Array.prototype;

// 以Array.prototype为原型创建arrayMethods对象
export const arrayMethods = Object.create(arrayPrototye);

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
  // 备份原来的方法
  const original = arrayPrototye[methodName];

  // 定义新的方法
  def(
    arrayMethods,
    methodName,
    function () {
      // 把数组身上的__ob__取出来，__ob__已经被添加了
      const ob = this.__ob__;
      // 有三种方法，能够插入新项
      let inserted = [];

      switch (methodName) {
        case "push":
        case "unshift":
          inserted = arguments;
          break;
        case "splice":
          // .splice(idx,num,args)
          inserted = arguments.slice(2);
          break;
      }

      if (inserted.length) {
        ob.observeArray(inserted);
      }

      // 执行原来方法，此时的this就是数组
      const result = original.apply(this, arguments);

      return result;
    },
    false
  );
});
