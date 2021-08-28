/**
 * create date:2021-3-17
 */

import observe from "./observe";
import Watcher from "./Watcher";

let obj = {
  a: {
    m: {
      n: 5,
    },
  },
  b: 10,
  c: {
    d: {
      e: {
        f: 888,
      },
    },
  },
  g: [22, 33, 44, 55],
};

observe(obj);
// obj.a.m.n = 10;
// console.log(obj.c.d.e.f);
obj.g.push(66);
console.log(obj.g);
