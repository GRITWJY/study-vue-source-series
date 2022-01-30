import Observer from "../src/Observer";

export default function observe(value) {
	if (typeof value != 'object') return

	var ob
	if (typeof value.__ob__ != "undefined") {
		ob = value.__ob__
	} else {
		ob = new Observer(value)
	}
	return ob
}
