// Dimensões do tabuleiro
const LINE_NUMBER = 6
const COLUMN_NUMBER = 8

// Códigos de jogadores
const P1 = -1
const P2 = 1
const PN = 0

// Código de resultado
const P1_WON = P1
const P2_WON = P2
const DRAW_GAME = PN

// Inteligência do algoritmo (Quando maior, mais inteligente)
const MAX_DEPTH = 8






// Retorna o código do player inimigo
const getEnemy = (player) => -player

// Retorna uma função de comparação de acordo com o player
const getComparator = (player) => {
    return (a, b) => (b.winner - a.winner) * player
}

// Verifica, na posição especificada, se houve vencedor vertical (Retorna o vencerdor ou false caso não haja)
function getColWinner(scenery, i, j) {
    if (j < LINE_NUMBER - 3) {
        const sum = scenery[i][j] + scenery[i][j + 1] + scenery[i][j + 2] + scenery[i][j + 3]
        return (Math.abs(sum) == 4) && scenery[i][j]
    } else {
        return false
    }
}

// Verifica, na posição especificada, se houve vencedor horizontal (Retorna o vencerdor ou false caso não haja)
function getRowWinner(scenery, i, j) {
    if (i < COLUMN_NUMBER - 3) {
        const sum = scenery[i][j] + scenery[i + 1][j] + scenery[i + 2][j] + scenery[i + 3][j]
        return (Math.abs(sum) == 4) && scenery[i][j]
    } else {
        return false
    }
}

// Verifica, na posição especificada, se houve vencedor diagonal / (Retorna o vencerdor ou false caso não haja)
function getDiagAWinner(scenery, i, j) {
    if (i < COLUMN_NUMBER - 3 && j < LINE_NUMBER - 3) {
        const sum = scenery[i][j] + scenery[i + 1][j + 1] + scenery[i + 2][j + 2] + scenery[i + 3][j + 3]
        return (Math.abs(sum) == 4) && scenery[i][j]
    } else {
        return false
    }
}

// Verifica, na posição especificada, se houve vencedor diagonal \ (Retorna o vencerdor ou false caso não haja)
function getDiagBWinner(scenery, i, j) {
    if (i > 2 && j < LINE_NUMBER - 3) {
        const sum = scenery[i][j] + scenery[i - 1][j + 1] + scenery[i - 2][j + 2] + scenery[i - 3][j + 3]
        return (Math.abs(sum) == 4) && scenery[i][j]
    } else {
        return false
    }
}

// Retorna o resultado do jogo (-1, 0 ou 1) ou retorna false se o jogo ainda não estiver acabado
function getWinner(scenery) {
    for (let i = 0; i < COLUMN_NUMBER; i++) {
        for (let j = 0; scenery[i][j]; j++) {
            if (getRowWinner(scenery, i, j) || getColWinner(scenery, i, j) || getDiagAWinner(scenery, i, j) || getDiagBWinner(scenery, i, j)) {
                return scenery[i][j]
            }
        }
    }

    return DRAW_GAME
}

function play(scenery, myMove, column) {
    scenery[column].push(myMove)
}

function undoPlay(scenery, column) {
    scenery[column].pop()
}

function convertScenery(scenery) {
    return scenery.map(column => {
        return column.filter(cell => {
                return cell != undefined
            })
            .reverse()
            .map(cell => {
                if (cell === 0) {
                    return -1
                } else {
                    return cell
                }
            })
    })
}

function availableColumn(scenery, column) {
    return !scenery[column][LINE_NUMBER - 1]
}

function minmax(scenery, player, depth = MAX_DEPTH) {
    if (depth == 0) {
        return { column: null, winner: DRAW_GAME }
    }
    const winner = getWinner(scenery)
    if (winner) return { column: null, winner }

    const newDepth = depth - 1
    const moves = []
    scenery.forEach((_, column) => {
        if (availableColumn(scenery, column)) {
            play(scenery, player, column)
            const move = minmax(scenery, getEnemy(player), newDepth)
            undoPlay(scenery, column)
            move.column = column
            moves.push(move)
        }
    })

    if(depth == MAX_DEPTH){
        console.log(moves);
    }

    // Ordena as possibilidades de acordo com o 'myMove'
    const comparator = getComparator(player)
    moves.sort(comparator)

    const bestMove = moves[0]

    return bestMove
}

const AlanScript = (scenery, player) => {
    player = (player == 0) ? P1 : P2
    scenery = convertScenery(scenery)

    // console.table(getWinner(scenery))
    // return 0

    const move = minmax(scenery, player)
    console.log(move);
    console.log('++');

    return move.column
}

export default AlanScript

// function transpose(matrix) {
//     return matrix[0].map((_, colIndex) => {
//         return matrix.map(row => {
//             return row[colIndex]
//         })
//     })
// }

// function testToReal(matrix) {
//     const transposed = transpose(matrix)
//     const reversed = transposed.map(column => column.reverse())
//     const filtered = reversed.map(column => {
//         return column.filter(cell => cell)
//     })

//     return filtered
// }

// let c = [
//     [0,  0,  0,  0,  0,  0,  0, -1],
//     [0,  0,  0,  0,  0,  0, -1,  1],
//     [0,  0,  0,  0,  0, -1,  1,  1],
//     [0,  0,  0, -1, -1,  1, -1,  1],
//     [0,  0, -1,  1, -1,  1,  1, -1],
//     [0, -1, -1,  1, -1, -1, -1,  1]
// ]

// console.table(c)

// const real = testToReal(c)
// console.table(real);
// // play(real, P2, 4)
// // console.table(real);
// console.log(getWinner(real));


// console.table(c)
// c = transpose(c)
// console.table(c)

// console.time()
// console.log(getWinner(c));
// console.timeEnd()