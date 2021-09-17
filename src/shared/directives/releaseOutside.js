export default {

	beforeMount(el, binding, vnode) {
		el.releaseOutsideEvent = function(event) {
			if (!(el === event.target || el.contains(event.target))) {
				binding.value(event, el);
			}
		};
		document.body.addEventListener('mouseup', el.releaseOutsideEvent);
	},

	unmounted(el) {
		document.body.removeEventListener('mouseup', el.releaseOutsideEvent);
	}

}