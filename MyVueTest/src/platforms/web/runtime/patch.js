import {createPatchFunction} from "../../../core/vdom/patch";
import * as nodeOps from './node-ops'

// the directive module should be applied last, after all
// built-in modules have been applied.
//指令模块应在所有内置模块应用后最后应用。
const modules = ''

// 实现跨平台
export const patch = createPatchFunction({nodeOps, modules})
