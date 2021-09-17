<template>
	<div class="play-background">
		<template v-for="(row,idx) in board">
			<template v-for="(column,jdx) in row">
				<span :class="`field-${column}`"></span>
			</template>
		</template>
	</div>
	<div class="horizontal-letters">
		<template v-for="letter in letters" >
			<div class="horizontal-letter"><span>{{ letter }}</span></div>
		</template>
	</div>
</template>

<script>

export default {
	name: 'FieldBackground',

	data() {
		return {
			letters: 'ABCDEFGHIJ'.split(''),
		}
	},

	computed: {
		board() {
			return this.$store.getters['main/getBoard']
		}
	},
}
</script>
