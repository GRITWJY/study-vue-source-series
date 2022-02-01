export function createPatchFunction(backend) {
	return function patch(oldVnode, vnode, hydrating, removeOnly) {
		console.log('gsd-patch')
	}
}
