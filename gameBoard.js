
export class GameBoard {
    constructor() {
        this.gameBoard = ["", "", "", "", "", "", "", "", ""];
    }

    setField(index, sign) {
        this.gameBoard[index] = sign;
    }

    getField(index) {
        return this.gameBoard[index];
    }

    clearBoard() {
        for (let i = 0; i < this.gameBoard.length; i++) {
            this.gameBoard[i] = "";
        }
    }

    updateBoard(fieldContainers){
        for (let i = 0; i < this.gameBoard.length; i++){
             fieldContainers[i].textContent = this.getField(i);
        }
    }


}



