<template>
	<div class="button-row group-toggle">
		<template v-for="button in buttons" :key="button.id" >
			<click-button
				:label="button.label"
				:class="{ selected : modelValue === button.value }"
				@click="change(button)"
			/>
		</template>
	</div>
</template>
<script>
export default {
	name: 'RadioButton',
	props: {
		buttons:    { type: Array,   default: null },
		modelValue: { type: String,  default: 'default' },
	},

	methods: {
		change(event){
			this.$emit('update:modelValue', event.value)
		}
	}
}
</script>