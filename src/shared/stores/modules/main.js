import Field from '@/shared/helpers/field.js'

export default {

	namespaced: true,

	state: {

		boardmode: 'edit',

		board: Field.board,
		field: Field.field,

		// players: clone(Field.players),
		players: [
			{ id: 'b1', piece: 'amazon', color: 'b', position: 'D10', reach: [] },
			{ id: 'b2', piece: 'amazon', color: 'b', position: 'G10', reach: [] },
			{ id: 'b3', piece: 'amazon', color: 'b', position: 'A7' , reach: [] },
			{ id: 'b4', piece: 'amazon', color: 'b', position: 'J7' , reach: [] },
			{ id: 'w1', piece: 'amazon', color: 'w', position: 'A10', reach: [] },
			{ id: 'w2', piece: 'amazon', color: 'w', position: 'G1' , reach: [] },
			{ id: 'w3', piece: 'amazon', color: 'w', position: 'A4' , reach: [] },
			{ id: 'w4', piece: 'amazon', color: 'w', position: 'J4' , reach: [] },
		],
		owners: [],
		walls: [
			{ id: 'p1',  piece: 'wall', position: 'D9' },
			{ id: 'p2',  piece: 'wall', position: 'G9' },
			{ id: 'p3',  piece: 'wall', position: 'H9' },
			{ id: 'p4',  piece: 'wall', position: 'A9' },
			{ id: 'p5',  piece: 'wall', position: 'B9' },
			{ id: 'p6',  piece: 'wall', position: 'C9' },
			{ id: 'p8',  piece: 'wall', position: 'A5' },
			{ id: 'p9',  piece: 'wall', position: 'B5' },
			{ id: 'p10', piece: 'wall', position: 'C5' },
			{ id: 'p11', piece: 'wall', position: 'D5' },
			{ id: 'p12', piece: 'wall', position: 'D6' },
			{ id: 'p13', piece: 'wall', position: 'D7' },
			{ id: 'p14', piece: 'wall', position: 'D8' },
			{ id: 'p15', piece: 'wall', position: 'D4' },
			{ id: 'p16', piece: 'wall', position: 'D3' },
			{ id: 'p17', piece: 'wall', position: 'D2' },
			{ id: 'p18', piece: 'wall', position: 'D1' },
			{ id: 'p19', piece: 'wall', position: 'E8' },
			{ id: 'p20', piece: 'wall', position: 'F8' },
			{ id: 'p21', piece: 'wall', position: 'F7' },
			{ id: 'p22', piece: 'wall', position: 'F6' },
			{ id: 'p23', piece: 'wall', position: 'F5' },
			{ id: 'p24', piece: 'wall', position: 'E5' },
		],
		hover: null,
		mover: null,

	},

	getters: {

		getBoardMode: (state) => state.boardmode,
		getPlayers:   (state) => state.players,
		getWalls:     (state) => state.walls,
		getOwners:    (state) => state.owners,
		getMover:     (state) => state.mover,

		getBoard: (state) => {
			if (!state.hover) return state.board
			if (state.hover === 'addPiece') {
				return Field.hoverAdd(state)
			}
			return Field.hoverBoard(state)
		},
		getLegals: (state) => {
			if (!state.hover) return []
			if (state.hover === 'addPiece') {
				return Field.legaladd(state)
			}
			return Field.legalfield(state)
		},
	},

	mutations: {
		setBoardMode(state, mode) { state.boardmode = mode },
		setHover(state, hover)    { state.hover = hover },
		setMover(state, mover)    { state.mover = mover },
		setMove (state, mover) {
			state.players.forEach( player => {
				if ( player.id === mover.p ){
					player.position = Field.numsToCoord(mover.h, mover.v)
				}
			})
			state.walls.forEach( wall => {
				if ( wall.id === mover.p ){
					console.log('moved wall... ', mover)
					wall.position = Field.numsToCoord(mover.h, mover.v)
				}
			})
			Field.freefields(state)
		},
		addWall (state, mover) {
			let num = state.walls.length + 1
			state.walls.push({
				id:       `p${num}`,
				piece:    'wall',
				position: Field.numsToCoord(mover.h, mover.v)
			})
			Field.freefields(state)
		},
		resetBoard(state) {
			state.players = clone(Field.players)
			state.walls   = []
			Field.freefields(state)
		},

	},

	actions: {

		initialize(context) {
			Field.initialize()
			Field.freefields(context.state)
		},

		setPlayersReach(context) {
			Field.setPlayersReach(context.state)
		},

		keyDown(context, event) {
			if (event.key === 'e') {
				console.log('expose state')
				window.board = context.state
			}
			if ((event.key === 'Backspace') || (event.key === 'Delete')) {
				if (context.state.hover) {
					let piece= Field.whatsOn(context.state, context.state.hover)
					if (piece) {
						context.commit('setHover', null)
						Field.removePiece(context.state, piece)
					}
				}
			}
		}

	},

}