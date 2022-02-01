import {isPrimitive} from "../../../shared/util";
import {createTextVNode} from "../VNode";

export function normalizeChildren(children) {
	return isPrimitive(children)
		? [createTextVNode(children)]
		: undefined
	// todo
}
