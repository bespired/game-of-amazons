<template>
	<path :d="path.d" :style="path.s" class="piece-color"/>
</template>
<script>
export default {
	name: 'SvgPath',

	props: {
		path: { type: Object, default: null },
	}
}
</script>
