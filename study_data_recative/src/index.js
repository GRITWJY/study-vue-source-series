import defineReactive from "./defineReactive";
import observe from "./observe";

import Observer from "./Observer";

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
obj.g.push(99);
console.log(obj.g);
