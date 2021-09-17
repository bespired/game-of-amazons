export default {

	beforeMount(el, binding, vnode) {
		el.keyDownEvent = function(event) {
			binding.value(event, el);
		};
		window.addEventListener('keydown', el.keyDownEvent);
	},

	unmounted(el) {
		window.removeEventListener('keydown', el.keyDownEvent);
	}

}