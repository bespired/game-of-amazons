<template>
	<button-row id="navbar">
		<radio-button :buttons="buttons" v-model="boardmode"/>
		<drag-piece v-if="boardmode === 'edit'"/>
	</button-row>
</template>

<script>
export default {
	name: 'NavBar',

	data() {
		return {
			buttons: [
				{ id: 1, label: 'Edit', value: 'edit' },
				{ id: 2, label: 'Game', value: 'game' },
			],
			// modes: 'edit'
		}
	},


	computed: {
		boardmode: {
			get() { return this.$store.getters['main/getBoardMode'] },
			set(newValue) { this.$store.commit('main/setBoardMode', newValue) },
		},
	}

}
</script>
