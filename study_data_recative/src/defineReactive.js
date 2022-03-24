import observe from "./observe";

export default function defineReactive(data, key, val) {
  console.log("我是defineReactive", data, key);
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
      console.log(`你试图访问obj的${key}属性`);
      return val;
    },
    //setter
    set(newValue) {
      console.log(`你试图改变obj的${key}属性`, newValue);
      if (val === newValue) {
        return;
      }
      val = newValue;
      // 当设置了新值，这个新值也要被observe
      childOb = observe(newValue);
    },
  });
}
