<template>
	<button-row id="navbar">
		<radio-button    :buttons="buttons" v-model="boardmode"/>
		<checkbox-button label="Owners" v-model="ownermode"/>
		<click-button label="Reset board"
			v-if="boardmode === 'edit'" @clicked="resetBoard()" />
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
		}
	},


	computed: {
		boardmode: {
			get() { return this.$store.getters['main/getBoardMode'] },
			set(newValue) { this.$store.commit('main/setBoardMode', newValue) },
		},
		ownermode: {
			get() { return this.$store.getters['main/getOwnerMode'] },
			set(newValue) { this.$store.commit('main/setOwnerMode', newValue) },
		},
	},

	methods: {
		resetBoard() {
			this.$store.commit('main/resetBoard')
		}
	}

}
</script>
