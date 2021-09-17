<template>
	<circle :cx="path.cx" :cy="path.cy" :r="path.r" :style="path.s" class="piece-color"/>
</template>
<script>
export default {
	name: 'SvgCircle',

	props: {
		path: { type: Object, default: null },
	},
}
</script>