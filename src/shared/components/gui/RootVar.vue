<template>
</template>
<script>
import RootVar from "@/shared/helpers/rootVar.js"
export default {
	name: 'RootVar',
	props: {
		name:  { type: String,  default: null },
		value: { type: String,  default: null },
	},

	mounted() {
		RootVar.set(this.name, this.value)
	}
}
</script>