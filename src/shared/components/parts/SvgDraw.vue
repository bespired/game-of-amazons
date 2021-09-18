<template>
	<svg class="checkbox" :data-name="name" viewBox="0 0 385 385">
		<path :d="pieces[name].d" :style="pieces[name].s" />
	</svg>
</template>

<script>

export default {
	name: 'SvgDraw',

	props: {
		name: { type: String, default: null },
	},

	methods: {
		componentType(path) {
			if (isValid(path.cx)) return 'svg-circle'
			return 'svg-path'
		},
	},

	data() {
		return {
			pieces: {
				checked: {
					d: "M384.5,47.033C384.5,21.351 363.649,0.5 337.967,0.5L47.033,0.5C21.351,0.5 0.5,21.351 0.5,47.033L0.5,337.967C0.5,363.649 21.351,384.5 47.033,384.5L337.967,384.5C363.649,384.5 384.5,363.649 384.5,337.967L384.5,47.033ZM342.859,42.141L42.141,42.141L42.141,342.859L342.859,342.859L342.859,42.141ZM65,217L150.824,299.49L320.284,130.09L289,100L150.824,241L96,184.47L65,217Z",
					s: ""
				},
				unchecked: {
					d: "M384.5,47.033C384.5,21.351 363.649,0.5 337.967,0.5L47.033,0.5C21.351,0.5 0.5,21.351 0.5,47.033L0.5,337.967C0.5,363.649 21.351,384.5 47.033,384.5L337.967,384.5C363.649,384.5 384.5,363.649 384.5,337.967L384.5,47.033ZM342.859,42.141L42.141,42.141L42.141,342.859L342.859,342.859L342.859,42.141Z",
					s: ""
				},

			}
		}
	}
}
</script>

<style>
.checkbox{
	width: 1em;
	height: 1em;
	margin-left: -4px;
    margin-right: 6px;
    fill: currentcolor;
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 1.5;
}
</style>
