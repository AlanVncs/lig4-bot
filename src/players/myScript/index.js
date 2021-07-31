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
const MAX_DEPTH = 10






// Retorna o código do player inimigo
const getEnemy = (player) => -player

// Retorna uma função de comparação de acordo com o player
const getComparator = (player) => {
    return (a, b) => (b.winner - a.winner) * player
}

// Verifica, na posição especificada, se houve vencedor vertical (Retorna o vencerdor ou false caso não haja)
function getColWinner(matrix, i, j) {
    if (j > 2) {
        const sum = matrix[i][j] + matrix[i][j - 1] + matrix[i][j - 2] + matrix[i][j - 3]
        return (Math.abs(sum) == 4) && matrix[i][j]
    } else {
        return false
    }
}

// Verifica, na posição especificada, se houve vencedor horizontal (Retorna o vencerdor ou false caso não haja)
function getRowWinner(matrix, i, j) {
    if (i < COLUMN_NUMBER - 3) {
        const sum = matrix[i][j] + matrix[i + 1][j] + matrix[i + 2][j] + matrix[i + 3][j]
        return (Math.abs(sum) == 4) && matrix[i][j]
    } else {
        return false
    }
}

// Verifica, na posição especificada, se houve vencedor diagonal \ (Retorna o vencerdor ou false caso não haja)
function getDiagAWinner(matrix, i, j) {
    // TODO
    return false
}

// Verifica, na posição especificada, se houve vencedor diagonal / (Retorna o vencerdor ou false caso não haja)
function getDiagBWinner(matrix, i, j) {
    // TODO
    return false
}

// Retorna o resultado do jogo (-1, 0 ou 1) ou retorna false se o jogo ainda não estiver acabado
function getWinner(matrix) {
    for (let i = 0; i < COLUMN_NUMBER; i++) {
        for (let j = LINE_NUMBER - 1; matrix[i][j]; j--) {
            console.log(i, j);
            if (getRowWinner(matrix, i, j) || getColWinner(matrix, i, j) || getDiagAWinner(matrix, i, j) || getDiagBWinner(matrix, i, j)) {
                return matrix[i][j]
            }
        }
    }

    return DRAW_GAME
}

function convertScenery(scenery) {
    return scenery.map(column => {
        return column.map(cell => {
            if (cell === 0) {
                return -1
            } else if (cell === undefined) {
                return 0
            } else {
                return cell
            }
        })
    })
}

const AlanScript = (scenery, myMove) => {
    myMove = (myMove == 0) ? -1 : 1
    scenery = convertScenery(scenery)

    return 0
}

export default AlanScript

// function transpose(matrix) {
//     return matrix[0].map((_, colIndex) => {
//         return matrix.map(row => {
//             return row[colIndex]
//         })
//     })
// }

// let c = [
//     [0, 0, 0, 0, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0, 0, 1],
//     [0, 0, -1, 0, 0, 0, 0, 0],
//     [0, 0, 1, 0, 0, 0, 0, 1],
//     [1, 1, 1, -1, 0, 0, 0, -1],
//     [1, 1, 1, -1, 0, -1, -1, -1]
// ]
// console.table(c)
// c = transpose(c)
// console.table(c)

// console.time()
// console.log(getWinner(c));
// console.timeEnd()