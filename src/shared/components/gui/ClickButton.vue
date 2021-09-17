<template>
	<div class="click-button" @click="change">
		{{ label }}
	</div>
</template>

<script>
export default {
	name: 'ClickButton',

	props: {
		label: { type: String,   default: null },
	},

	methods: {
		change(event){
			this.$emit('clicked')
		}
	}

}
</script>
