<template>
	<div class="click-button" @click="change">
		<svg-draw :name="checked" />
		{{ label }}
	</div>
</template>

<script>
export default {
	name: 'CheckboxButton',

	props: {
		label: { type: String,   default: null },
		modelValue: { type: Boolean,  default: false },
	},

	computed: {
		checked() {
			return this.modelValue ? 'checked' : 'unchecked'
		},
	},

	methods: {
		change(event){
			this.$emit('update:modelValue', !this.modelValue)
		}
	}

}
</script>
