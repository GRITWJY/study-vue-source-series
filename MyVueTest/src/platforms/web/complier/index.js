import {createCompiler} from "../../../complier/index";
import { baseOptions } from './options'

const {compile, compileToFunctions} = createCompiler(baseOptions)
export {compile, compileToFunctions}
