/**
 * create date:2021-3-17
 */

export const def = function (obj, key, value, enuertable) {
  Object.defineProperty(obj, key, {
    value,
    // 当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。
    enuertable,
    writable: true,
    // 当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
    configurable: true,
  });
};
