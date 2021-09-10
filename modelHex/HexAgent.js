const Agent = require('ai-agents').Agent;

class HexAgent extends Agent {
    constructor(value) {
        super(value);
        
    }

    /**
     * return a new move. The move is an array of two integers, representing the
     * row and column number of the hex to play. If the given movement is not valid,
     * the Hex controller will perform a random valid movement for the player
     * Example: [1, 1]
     */
    send() {
        let board = this.perception;
        let size = board.length;
        let available = getEmptyHex(board);
        console.log("-----")
        console.log(board)
        console.log("-----")
        let nTurn = size * size - available.length;
        // let PlayerTurn = getPlayerTurn(nTurn);
        // salsearchSalvedPoints = searchSalvedPoints(board,PlayerTurn)
        // bestMove = getBestMOve(board,salsearchSalvedPoints)
        // getMovimientosPosible(board,{'x':0,'y':0});
        if (nTurn == 0) { // First move
            console.log([Math.floor(size / 2), Math.floor(size / 2) - 1]);
            return [Math.floor(size / 2), Math.floor(size / 2) - 1];
        } else if (nTurn == 1) {
            console.log([Math.floor(size / 2), Math.floor(size / 2)])
            return [Math.floor(size / 2), Math.floor(size / 2)];
        }
        //
        let move = available[Math.round(Math.random() * (available.length - 1))];
        
        return [Math.floor(move / board.length), move % board.length];

        //Encontrar posiciones de ataque (entcontrando el mejor camino)
        //Encontrar posiciones de defensa (entcontrando el mejor camino del oponente)
        //Contar las posiciones posibles cercanas
        //Contar qué tantos puntos se pueden unir
    }

}

module.exports = HexAgent;

function getBestMOve(board,salsearchSalvedPoints){
    let result = [];
}

function searchSalvedPoints(board, PlayerTurn){
    let salved = [];
    let losed = [];
    let size = board.length;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === PlayerTurn) {
                salved.push([i,j]);
            }else if(board[i][j] > 0){
                losed.push([i,j]);
            }
        }
    }
    return {'salved':salved,'losed':losed};
}

/**
 * Devuelve a qupe jugador le toca jugar
 */
function getPlayerTurn(nTurn){
    if(nTurn % 2 == 0){
        return 2;
    }else{
        return 1;
    }
}

function isValid(board,position){
    if(position.x > -1 && position.x<board.length && position.y > -1 && position.y<board.length){
        return true;
    }else{
        return false;
    }
}

function isEmpty(board,position){
    if(board[position.y][position.x] == 0){
        return true;
    }else{
        console.log("____>" + board[position.y, position.x])
        return false;
    }
}

function getMovimientosPosible(board,position){
    // position = [i , j]
    let result = [];
    for(var i = -1; i <=1;i++){
        for(var j = -1; j <=1;j++){
            let cursor = {'x': position.x + j, 'y': position.y + i}
            if(i!=0 || j!=0){
                if(isValid(board,cursor)){
                    if(isEmpty(board,cursor)){
                        result.push({'x': cursor.x , 'y': cursor.y})
                    }else{
                        console.log("está lleno "+ cursor.y + "," + cursor.x)
                    }
                }else{
                    console.log("NO es valida "+ cursor.y + "," + cursor.x)
                }
                
            }else{
                console.log("misma posicion"+ cursor.y + "," + cursor.x)
            }
            
        }
    }
    console.log("posiciones posibles")
    console.log(result)
}

/**
 * Return an array containing the id of the empty hex in the board
 * id = row * size + col;
 * @param {Matrix} board 
 */
function getEmptyHex(board) { 
    let result = [];
    let size = board.length;
    for (let k = 0; k < size; k++) {
        for (let j = 0; j < size; j++) {
            if (board[k][j] === 0) {
                result.push(k * size + j);
            }
        }
    }
    return result;
}
