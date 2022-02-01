export function createPatchFunction(backend) {
	console.log(backend)
	return function () {
		console.log('wjy-createPatchFunction')
	}
}
