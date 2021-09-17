<template>
	<div class="drag-holder" id="dragholder" :class="{moving : grab}"
		@mousemove = "piecemove()"
		@mouseup   = "piecerelease()"
		>
		<play-piece
			class="drag-piece"
			@mouseover   = "piecehover()"
			@mouseleave  = "pieceleave()"
			@mousedown   = "pieceselect()"

			:class="style()"
			:style="position()"
			:piece="addPiece"
		/>
	</div>
</template>

<script>
import Field   from '@/shared/helpers/field.js'
import RootVar from "@/shared/helpers/rootVar.js"

export default {
	name: 'DragPiece',

	data() {
		return {
			moving:   false,
			square:   null,
			start:    null,
			hover:    false,
			grab:     false,
			location: null,
			addPiece: {
				id:       "p0",
				piece:    "wall",
				position: "add",
			}
		}
	},

	computed: {
		players() {
			return this.$store.getters['main/getPlayers']
		},
	},

	methods: {

		style() {
			const position= `cell-add`
			const hover   = this.hover ? ' hover' : ''
			const grab    = this.grab  ? ' grab'  : ''

			return `${hover}${grab}`
		},

		position() {
			return this.location ? this.location : ''
		},

		piecehover() {
			this.hover = true
			this.$store.commit('main/setHover', 'addPiece')
		},

		pieceleave() {
			// this.hover = false
			// this.grab  = false
			// this.$store.commit('main/setHover', null)
			// this.$store.commit('main/setMover', null)
		},

		pieceselect() {
			this.grab = true
			const ids    = ['p0', 'b1', 'dragholder', 'board']
			const bounds = []

			ids.forEach( id => {
				let piece  = document.getElementById(id)
				bounds[id] = piece.getBoundingClientRect()
			})

			const overlay   = bounds['board'].height + bounds['dragholder'].height + 10
			const piecesize = bounds['b1'].height

			RootVar.set('--overlay-height', `${overlay}px`)
			RootVar.set('--piece-size', `${piecesize}px`)

			this.square = bounds['board'].width / 10

			this.offset = {
				left: -piecesize / 2,
				top:  piecesize * 0.25,
				grid: bounds['dragholder'].height,
			}

			const px = boardPosition.x + this.offset.left
			const py = boardPosition.y + this.offset.top
			this.location = `left: ${px}px; top: ${py}px`

		},

		piecemove() {
			if (this.grab) {
				const px = boardPosition.x + this.offset.left
				const py = boardPosition.y + this.offset.top
				const gy = boardPosition.y + this.offset.top - this.offset.grid

				this.moving  = true
				this.location = `left: ${px}px; top: ${py}px`

				let sqx = Math.round(px / this.square)
				let sqy = Math.round(gy / this.square)
				this.$store.commit('main/setMover', {p:'p0', h:sqx, v:sqy})

			}

		},

		piecerelease() {

			const mover = this.$store.getters['main/getMover']
			if (mover) {
				const location = Field.coordsToBoard(mover)
				const legals   = this.$store.getters['main/getLegals']

				if ( legals.indexOf(location) > -1) {
					// console.log( 'mover:', mover, legals)
					this.$store.commit('main/addWall', mover)
				}
			}

			// const px = boardPosition.x + this.offset.left
			// const gy = boardPosition.y + this.offset.top - this.offset.grid

			// let sqx = Math.round(px / this.square)
			// let sqy = Math.round(gy / this.square)

			// if ((sqx >= -0) && (sqx <= 9) && (sqy >=-0) && (sqy <= 9)) {
			// 	console.log(sqx, sqy)
			// }

			// this.$store.commit('main/addWall', {p:'p0', h:sqx, v:sqy})

			this.hover = false
			this.grab  = false
			this.$store.commit('main/setHover', null)
			this.$store.commit('main/setMover', null)

			this.moving   = false
			this.location = null
			// this.$store.commit('main/setHover', null)

		},

	}
}

</script>

