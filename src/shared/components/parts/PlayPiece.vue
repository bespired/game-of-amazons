<template>
	<svg :data-name="pieceName"
		:ref="piece.id" :id="piece.id" viewBox="0 0 1010 1000">
		<template v-for="path in pieces[pieceName]">
			<component :is="componentType(path)" :path="path" />
		</template>
	</svg>
</template>
<script>

import SvgCircle from "./SvgCircle.vue"
import SvgPath   from "./SvgPath.vue"

export default {
	name: 'PlayPiece',

	components: {
		SvgPath, SvgCircle
	},

	props: {
		piece: { type: Object, default: null },
	},

	computed: {
		pieceName() {
			if (isValid(this.piece.color)) return `${this.piece.color}Amazon`
			return 'wall'
		},
	},

	methods: {
		componentType(path) {
			if (isValid(path.cx)) return 'svg-circle'
			return 'svg-path'
		},
	},

	data() {

		// console.log('piece:', this.piece)

		return {
			pieces: {
				bAmazon: [
					{ d: "M590 309a80 80 0 1173 12l27 159 90-90c-9-11-14-26-14-41a70 70 0 1183 69L743 711c8 2 28 10 47 39 25 38 20 150 20 150H210s-6-114 20-150 40-40 40-40l-87-291a70 70 0 1157-29l80 80 33-150a80 80 0 1176-12l81 152 80-151zm-406 16a25 25 0 110 50 25 25 0 010-50zm651 0a25 25 0 110 50 25 25 0 010-50zM379 213a30 30 0 110 60 30 30 0 010-60zm259 0a30 30 0 110 60 30 30 0 010-60z", s: null },
					{ d: "M280 830c1-9-7-30 30-50s120-40 195-40c72 0 165 17 205 40 35 20 32 43 30 50H280zm381-253l-36-213-117 209-115-209-38 215-103-105-2 3 81 210s80-26 174-27c89-1 183 28 187 29l75-213-2-2-104 103zM184 325a25 25 0 110 50 25 25 0 010-50zm651 0a25 25 0 110 50 25 25 0 010-50zM379 213a30 30 0 110 60 30 30 0 010-60zm259 0a30 30 0 110 60 30 30 0 010-60z", s: "fill-rule:nonzero;stroke:var(--color-light);stroke-width:15px;" },
				],
				wAmazon: [
					{ d: "M590 309a80 80 0 1173 12l27 159 90-90c-9-11-14-26-14-41a70 70 0 1183 69L743 711c8 2 28 10 47 39 25 38 20 150 20 150H210s-6-114 20-150 40-40 40-40l-87-291a70 70 0 1157-29l80 80 33-150a80 80 0 1176-12l81 152 80-151zm-406 16a25 25 0 110 50 25 25 0 010-50zm651 0a25 25 0 110 50 25 25 0 010-50zM379 213a30 30 0 110 60 30 30 0 010-60zm259 0a30 30 0 110 60 30 30 0 010-60z", s: null },
					{ d: "M280 830c1-9-7-30 30-50s120-40 195-40c72 0 165 17 205 40 35 20 32 43 30 50H280zm381-253l-36-213-117 209-115-209-38 215-103-105-2 3 81 210s80-26 174-27c89-1 183 28 187 29l75-213-2-2-104 103zM184 325a25 25 0 110 50 25 25 0 010-50zm651 0a25 25 0 110 50 25 25 0 010-50zM379 213a30 30 0 110 60 30 30 0 010-60zm259 0a30 30 0 110 60 30 30 0 010-60z", s: "fill:var(--color-light);fill-rule:nonzero;" }
				],
				wall: [
					{ cx: 510, cy: 510, r: 430 },
					{ cx: 510, cy: 510, r: 340, s: "fill:var(--color-light);" },
					{ cx: 510, cy: 510, r: 280 },
					{ cx: 510, cy: 510, r: 250, s: "fill:var(--color-light);" },
					{ cx: 510, cy: 510, r: 170 }
				]
			}
		}
	}
}
</script>