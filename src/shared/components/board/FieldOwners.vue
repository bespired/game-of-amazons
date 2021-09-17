<template>
	<div class="owners">
		<template v-for="(rows, idx) in owners" :key="`owner-${idx}`">
			<template v-for="(owner, xdx) in rows"
				:key="`owner-${idx}-${xdx}`">
				<span :class="owner"/>
			</template>
		</template>
	</div>
</template>

<script>

export default {
	name: 'FieldOwners',

	computed: {
		owners() {
			return this.$store.getters['main/getOwners']
		},
	},

}

</script>
