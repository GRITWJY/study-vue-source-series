var uid = 0;
export default class Dep {
  constructor() {
    console.log("Dep类的构造器");
    this.id = uid++;
    // 用数组存储自己的订阅者
    // 这里面放的是Watcher的实例
    this.subs = [];
  }

  // 添加订阅
  addSub(sub) {
    this.subs.push(sub);
  }

  // 添加依赖
  depend() {
    // window.target我们自己指定的全局的位置
    // 先把Watcher设置到全局唯一的target
    // 然后把正在读取Watcher通过target收集
    if (window.target) {
      this.addSub(window.target);
    }
  }

  // 通知更新
  notify() {
    console.log("我是notify");
    // 浅克隆一份
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}
