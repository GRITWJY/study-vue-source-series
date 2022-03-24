import defineReactive from "./defineReactive";
import observe from "./observe";
import Observer from "./Observer";
import Watcher from "./Watcher";

var obj = {
  a: {
    m: {
      n: 5,
    },
  },
  b: 4,
  g: [12, 34, 56],
};

observe(obj);

new Watcher(obj, "a.m.n", (val) => {
  console.log("watcher", val);
});

obj.a.m.n = 99;
