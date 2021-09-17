<template>
	<div class="players"
		@mousemove = "move()"
		@mouseup   = "release()"
		:class="{ moving : moving }"
	>
		<template v-for="(player, idx) in players" :key="`player-${idx}`">
			<play-piece
				@mouseover   = "hover(player)"
    			@mouseleave  = "leave(player)"
    			@mousedown   = "select(player)"

				:class="style(player)"
				:style="position(player)"
				:piece="player"
				:ref="player.id"
			/>
		</template>
		<root-var name="--nav-top" value="100px" />
	</div>
</template>

<script>

import Field from '@/shared/helpers/field.js'

export default {
	name: 'FieldPlayers',

	data() {
		return {
			moving: false,
			square: null,
			start:  null,
		}
	},

	created() {
		// this.$store.dispatch('main/setPlayersReach')
	},

	computed: {
		players() {
			return this.$store.getters['main/getPlayers']
		},
	},

	methods: {

		style(player) {
			const position= `cell-${player.position}`
			const hover   = player.hover ? ' hover' : ''
			const grab    = player.grab  ? ' grab'  : ''

			return `${position}${hover}${grab}`
		},

		position(player) {
			return player.location ? player.location : ''
		},

		hover(player) {
			player.hover = true
			this.$store.commit('main/setHover', player.position)
		},

		leave(player) {
			player.hover = false
			this.$store.commit('main/setHover', null)
			this.$store.commit('main/setMover', null)
		},

		select(player) {
			player.grab = true
			const refName = player.id
			const piece   = this.$refs[refName].pieces
			const elem    = document.getElementById(refName)
			const bounds  = elem.getBoundingClientRect()
			this.square   = bounds
			player.offset = {
				left: bounds.left - boardPosition.x - boardPosition.left,
				top:  bounds.top  - boardPosition.y - boardPosition.top
			}
			// this.$store.commit('main/setHover', player.position)
		},

		move() {
			this.players.forEach(player => {
				if (player.grab) {
					const px = boardPosition.x + player.offset.left
					const py = boardPosition.y + player.offset.top
					this.moving     = true
					player.location = `left: ${px}px; top: ${py}px`

					let sqx = Math.round(px / this.square.width)
					let sqy = Math.round(py / this.square.height)
					this.$store.commit('main/setMover', {p:player.id, h:sqx, v:sqy})
				}
			})
		},

		release() {

			const mover = this.$store.getters['main/getMover']
			// console.log('mover ', mover)

			if (mover) {
				const location = Field.coordsToBoard(mover)
				const legals   = this.$store.getters['main/getLegals']

				if ( legals.indexOf(location) > -1) {
					this.$store.commit('main/setMove', mover)
				}
			}

			this.players.forEach(player => {
				player.grab     = false
				player.moving   = false
				player.location = null
			})
			this.moving = false
			this.$store.commit('main/setHover', null)

		},

	}
}

</script>
