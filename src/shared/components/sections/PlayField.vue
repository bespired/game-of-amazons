<template>
	<div class="play-field" id="board">
		<field-background />
		<field-owners     />
		<field-walls      />
		<field-players    />
	</div>
</template>

<script>
export default {
	name: 'PlayField',

	beforeMount() {
		this.$store.dispatch('main/initialize')
	},

}
</script>
