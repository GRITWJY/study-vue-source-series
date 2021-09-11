import Dep from "./Dep";

var uid = 0;
export default class Watcher {
  constructor(target, expression, callback) {
    console.log("我是Watcher类的构造器");
    this.id = uid++;
    this.target = target;
    this.getter = parsePath(expression);
    this.callback = callback;
    this.value = this.get();
  }
  update() {
    this.run();
  }
  get() {
    Dep.target = this;
    const obj = this.target;
    var value;
    try {
      value = this.getter(obj);
    } finally {
      Dep.target = null;
    }
    return value;
  }
  run() {
    this.getAndInvoke(this.callback);
  }
  getAndInvoke(cb) {
    const value = this.get();
    if (value !== this.value || typeof value == "object") {
      const odlValue = this.value;
      this.value = value;
      cb.call(this.target, value, odlValue);
    }
  }
}

function parsePath(str) {
  var segments = str.split(".");

  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
