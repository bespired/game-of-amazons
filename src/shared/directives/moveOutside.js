export default {

	beforeMount(el, binding, vnode) {
		el.moveOutsideEvent = function(event) {
			if (!(el === event.target || el.contains(event.target))) {
				binding.value(event, el);
			}
		};
		document.body.addEventListener('mousemove', el.moveOutsideEvent);
	},

	unmounted(el) {
		document.body.removeEventListener('mousemove', el.moveOutsideEvent);
	}

}