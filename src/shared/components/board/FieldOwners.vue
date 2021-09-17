<template>
	<div class="owners" v-if="ownerMode">
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
		ownerMode() {
			return this.$store.getters['main/getOwnerMode']
		},
	},

}

</script>
