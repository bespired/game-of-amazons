<template>
	<div class="walls"
		@mousemove = "move()"
		@mouseup   = "release()"
		:class="{ moving : moving }"
	>
		<template v-for="(wall, idx) in walls" :key="`wall-${idx}`">
			<play-piece
				@mouseover = "hover(wall)"
				@mouseleave= "leave(wall)"
				@mousedown = "select(wall)"

				:class="style(wall)"
				:style="position(wall)"
				:piece="wall"
				:ref="wall.id"
			/>
		</template>
	</div>
</template>

<script>

import Field from '@/shared/helpers/field.js'

export default {
	name: 'FieldWalls',

	data() {
		return {
			moving: false,
			square: null,
			start:  null,
		}
	},

	computed: {
		walls() {
			return this.$store.getters['main/getWalls']
		},
	},

	methods: {

		style(wall) {
			const position= `cell-${wall.position}`
			const hover   = wall.hover ? ' hover' : ''
			const grab    = wall.grab  ? ' grab'  : ''

			return `${position}${hover}${grab}`
		},

		position(wall) {
			return wall.location ? wall.location : ''
		},

		hover(wall) {
			wall.hover = true
			this.$store.commit('main/setHover', wall.position)
		},

		leave(wall) {
			wall.hover = false
			this.$store.commit('main/setHover', null)
			this.$store.commit('main/setMover', null)
		},

		select(wall) {
			wall.grab = true
			const refName = wall.id
			const piece   = this.$refs[refName].pieces
			const elem    = document.getElementById(refName)
			const bounds  = elem.getBoundingClientRect()
			this.square   = bounds
			wall.offset = {
				left: bounds.left - boardPosition.x - boardPosition.left,
				top:  bounds.top  - boardPosition.y - boardPosition.top
			}
			this.$store.commit('main/setHover', wall.position)
			// console.log( this.$store.getters['main/getLegals'] )
		},

		move() {
			this.walls.forEach(wall => {
				if (wall.grab) {
					const px = boardPosition.x + wall.offset.left
					const py = boardPosition.y + wall.offset.top
					this.moving     = true
					wall.location = `left: ${px}px; top: ${py}px`

					let sqx = Math.round(px / this.square.width)
					let sqy = Math.round(py / this.square.height)
					this.$store.commit('main/setMover', {p:wall.id, h:sqx, v:sqy})
				}
			})
		},

		release() {

			const mover = this.$store.getters['main/getMover']
			if (mover) {
				const location = Field.coordsToBoard(mover)
				const legals   = this.$store.getters['main/getLegals']

				if ( legals.indexOf(location) > -1) {
					this.$store.commit('main/setMove', mover)
				}
			}

			this.walls.forEach(wall => {
				wall.grab     = false
				wall.moving   = false
				wall.location = null
			})
			this.moving = false
			this.$store.commit('main/setHover', null)

		},

	}
}

</script>
