import AStarPathFinder from '@/shared/helpers/astar.js'

const Field = {

    dirs: [
        [0, -1],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1],
        [-1, 0],
        [-1, -1]
    ],

    board: [
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    ],

    field: [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
    ],


    allCoords: [
        "A10", "B10", "C10", "D10", "E10", "F10", "G10", "H10", "I10", "J10",
        "A9",  "B9",  "C9",  "D9",  "E9",  "F9",  "G9",  "H9",  "I9",  "J9",
        "A8",  "B8",  "C8",  "D8",  "E8",  "F8",  "G8",  "H8",  "I8",  "J8",
        "A7",  "B7",  "C7",  "D7",  "E7",  "F7",  "G7",  "H7",  "I7",  "J7",
        "A6",  "B6",  "C6",  "D6",  "E6",  "F6",  "G6",  "H6",  "I6",  "J6",
        "A5",  "B5",  "C5",  "D5",  "E5",  "F5",  "G5",  "H5",  "I5",  "J5",
        "A4",  "B4",  "C4",  "D4",  "E4",  "F4",  "G4",  "H4",  "I4",  "J4",
        "A3",  "B3",  "C3",  "D3",  "E3",  "F3",  "G3",  "H3",  "I3",  "J3",
        "A2",  "B2",  "C2",  "D2",  "E2",  "F2",  "G2",  "H2",  "I2",  "J2",
        "A1",  "B1",  "C1",  "D1",  "E1",  "F1",  "G1",  "H1",  "I1",  "J1"
    ],

    aStar: new AStarPathFinder(10,10),

    // 0 -> A, 9 -> J
    numberToLetter(number) {
        return String.fromCharCode(65 + number)
    },

    // A -> 0, J -> 9
    letterToNumber(letter) {
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(letter)
    },

    // 10 -> 0, 1 -> 9
    verticalToNumber(vertical) {
        let v = (typeof vertical !== 'number') ? parseInt(vertical, 10) : vertical
        return (10 - v)
    },

    // 0 -> 10, 9 -> 1
    numberToVertical(number) {
        return (10 - number)
    },

    // A1 -> 0,0; J10 -> 9,9
    boardToCoords(str) {
        return [this.letterToNumber(str.substr(0, 1)), this.verticalToNumber(str.substr(1))]
    },

    // 0,0 -> A1; 9,9 -> J10
    coordsToBoard(arrobj) {
        const arr = isValid(arrobj.h) ? [arrobj.h, arrobj.v] : arrobj
        const h = this.numberToLetter(arr[0])
        const v = this.numberToVertical(arr[1])
        return `${h}${v}`
    },

    coordToNumbers(str) {
        const h = str.substr(0, 1)
        const v = str.substr(1)
        return [this.letterToNumber(h), this.verticalToNumber(v)]
    },

    numsToCoord(h0, v0) {
        const h = this.numberToLetter(h0)
        const v = this.numberToVertical(v0)
        return `${h}${v}`
    },

    collides(players, walls) {
        let collides = []
        if (isValid(players)) {
            players.forEach(player => {
                collides.push(player.position)
            })
        }
        if (isValid(walls)) {
            walls.forEach(wall => {
                collides.push(wall.position)
            })
        }
        return collides
    },

    located(players, walls) {
        let located = {}
        players.forEach(player => {
            located[player.position] = player
        })
        walls.forEach(wall => {
            located[wall.position] = wall
        })
        return located
    },

    whatsOn(state, position) {
        let hover = null
        state.players.forEach(player => {
            if (player.position === position) hover = player
        })
        state.walls.forEach(wall => {
            if (wall.position === position) hover = wall
        })
        return hover
    },

    removePiece(state, piece) {
        if (piece.piece === 'amazon') this.removeAmazon(state, piece)
        if (piece.piece === 'wall')   this.removeWall(state, piece)
    },

    removeWall(state, piece) {
        let removeIndex = state.walls.map(item => item.id).indexOf(piece.id);
        if (isValid(removeIndex)) state.walls.splice(removeIndex, 1);
    },

    removeAmazon(state, piece) {
        let removeIndex = state.players.map(item => item.id).indexOf(piece.id);
        if (isValid(removeIndex)) state.players.splice(removeIndex, 1);
    },

    // --

    initialize() {
        // for(let iy=0; iy < 10; iy++){
        //     for(let ix=0; ix < 10; ix++){
        //         this.allCoords.push(this.numsToCoord(ix, iy))
        //     }
        // }
        // console.log(this.allCoords)
    },



    // for all amazons calculate what fields are still in reach
    setPlayersReach(state) {
        state.players.forEach(player => {
            // console.log(player)
        })
    },

    hoverAdd(state) {
        let collides = this.collides(state.players, state.walls)
        let board = clone(state.board)

        for(let iy=0; iy < 10; iy++){
            for(let ix=0; ix < 10; ix++){
                let coord = this.numsToCoord(ix, iy)
                if (collides.indexOf(coord) === -1) {
                    board[iy][ix] = board[iy][ix] + 10

                    if (state.mover) {
                        if ((state.mover.v === iy) && (state.mover.h === ix)) {
                            board[iy][ix] += 10
                        }
                    }

                }
            }
        }
        return board
    },

    hoverBoard(state) {

        if (state.boardmode === 'edit') return this.hoverAdd(state)


        let collides = this.collides(state.players, state.walls)
        let board    = clone(state.board)

        const [h,v]  = this.coordToNumbers(state.hover)

        board[v][h] = board[v][h] + 10

        this.dirs.forEach(dir => {
            let collision = false
            for (let steps = 1; steps < 10; steps++) {
                let ph = steps * dir[0] + h
                let pv = steps * dir[1] + v
                if ((!collision) && (pv >= 0) && (pv <= 9) && (ph >= 0) && (ph <= 9)) {

                    let position = this.numsToCoord(ph, pv)

                    if (collides.indexOf(position) > -1) {

                        collision = true

                    } else {

                        board[pv][ph] = board[pv][ph] + 10

                    }

                    if (state.mover) {
                        if ((state.mover.v === pv) && (state.mover.h === ph)) {
                            board[pv][ph] = board[pv][ph] + 10
                        }
                    }
                }
            }
        })

        // add Can-I-Go-Theres...

        return board

    },

    reachSquare(playfield, startCoord, endCoord) {

        // const aStar    = new AStarPathFinder(10,10)

        const [sx, sy] = this.coordToNumbers(startCoord)
        const [ex, ey] = this.coordToNumbers(endCoord)

        this.aStar.reset()
        this.aStar.loadMap(playfield)
        this.aStar.setStart(sx, sy)
        this.aStar.setDestination(ex, ey)

        return this.aStar.findPath()

    },

    // can you go there ...
    freefields(state) {

        const owners = [
            ['', '', '', '', '', '', '', '', '', ''].fill('owner-0'),
            ['', '', '', '', '', '', '', '', '', ''].fill('owner-0'),
            ['', '', '', '', '', '', '', '', '', ''].fill('owner-0'),
            ['', '', '', '', '', '', '', '', '', ''].fill('owner-0'),
            ['', '', '', '', '', '', '', '', '', ''].fill('owner-0'),
            ['', '', '', '', '', '', '', '', '', ''].fill('owner-0'),
            ['', '', '', '', '', '', '', '', '', ''].fill('owner-0'),
            ['', '', '', '', '', '', '', '', '', ''].fill('owner-0'),
            ['', '', '', '', '', '', '', '', '', ''].fill('owner-0'),
            ['', '', '', '', '', '', '', '', '', ''].fill('owner-0'),
        ]

        const playfields = {w:[], b:[]}
        const squares    = []

        const amazons    = this.collides(state.players)
        const collides   = this.collides(null, state.walls)
        const located    = this.located(state.players, state.walls)

        for(let iy=0; iy < 10; iy++){
            playfields.b[iy] = []
            playfields.w[iy] = []
            for(let ix=0; ix < 10; ix++){
                let coord = this.numsToCoord(ix, iy)
                let collide = collides.indexOf(coord) > -1

                playfields.w[iy][ix] = !collide
                playfields.b[iy][ix] = !collide

                if (!collide) squares.push(coord)

                let amazon = amazons.indexOf(coord) > -1
                if (amazon) playfields[located[coord].color][iy][ix] = false

            }
        }

        // reverse
        const amazonwall = {
            w: state.players.filter(p => p.color === 'b'),
            b: state.players.filter(p => p.color === 'w')
        }
        const dones = { w:[], b:[] }


        squares.forEach(square => {
            // if amazon is on this square ignore this square
            let collide = amazons.indexOf(square) > -1
            if (!collide) {

                let reached = { b: false, w: false }

                Object.keys(amazonwall).forEach( (side) => {

                    // can we reach a amazon

                    if (dones[side].indexOf(square) > -1) {

                        reached[side] = true  // is this a know square... then dont do the a*.

                    } else {

                        amazonwall[side].forEach(a => {

                            if (!reached[side]) {
                                let path = this.reachSquare(playfields[side], square, a.position)
                                if (path.length > 0) {
                                    reached[side] = true
                                    path.forEach(p => {
                                        let coord = this.numsToCoord(p.x, p.y)
                                        if (dones[side].indexOf(coord) === -1) dones[side].push(coord)
                                    })
                                }
                            }
                        })

                    }
                })

                let [x, y] = this.coordToNumbers(square)
                owners[y][x] = this.ownedBy(reached)

            }

        })

        state.owners = owners

    },

    ownedBy(reached) {
        // reverse
        let owners = `${reached.w ? 'b' : ''}${reached.b ? 'w' : ''}`
        return owners !== '' ? `owner-${owners}` : 'owner-f'
    },

    legaladd(state) {
        // all non collides...
        const collides = this.collides(state.players, state.walls)
        return arrayDiff(this.allCoords, collides)
    },

    legalfield(state) {

        const collides = this.collides(state.players, state.walls)

        if ( state.boardmode === 'edit' ) return arrayDiff(this.allCoords, collides)

        const [h,v] = this.coordToNumbers(state.hover)

        let legals = []
        this.dirs.forEach(dir => {
            let collision = false
            for (let steps = 1; steps < 10; steps++) {
                let ph = steps * dir[0] + h
                let pv = steps * dir[1] + v
                if ((!collision) && (pv >= 0) && (pv <= 9) && (ph >= 0) && (ph <= 9)) {

                    let position = this.numsToCoord(ph, pv)

                    if (collides.indexOf(position) > -1) {

                        collision = true

                    } else {

                        legals.push(this.coordsToBoard([ph, pv]))

                    }
                }
            }
        })
        return legals
    },

}


export default Field;