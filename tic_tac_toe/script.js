const gameCell = document.querySelectorAll('.cell')
const player1 = document.querySelector('.player1')
const player2 = document.querySelector('.player2')
const button = document.querySelector('button')
const alertBox = document.querySelector('.alertBox')

let currentPlayer = 'X'
let nextPlayer = 'O'
let playerTurn = currentPlayer

player1.textContent= `player 1 : ${currentPlayer}`
player2.textContent= `player 2 : ${nextPlayer}`

const startGame = () => {

    gameCell.forEach(cell => {
        cell.addEventListener('click', handleClick)
    })
}
const handleClick = (e)=>{
if (e.target.textContent === '') {
                e.target.textContent = playerTurn
                if(checkWin()){
                    console.log(`${playerTurn} is win`);
                    showAlert(`${playerTurn} is win`)
                    disableCells()
                }
                else if(checkTie()){
                    console.log('it is Tie');
                    showAlert('it is Tie');
                    disableCells()
                }
                else{
                    changePlayerTurn()
                    showAlert(`Turn for Player ${playerTurn}`)
                }
                
            }
}
const changePlayerTurn = () => {
    // if (playerTurn===currentPlayer){
    //     playerTurn= nextPlayer
    // }    
    // else{
    //     playerTurn = currentPlayer
    // }

    playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer

}

const checkWin = () => {
    const winningCondition =
        [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

    for (i = 0; i < winningCondition.length; i++) {
        const [pos1, pos2, pos3] = winningCondition[i]

        if (gameCell[pos1].textContent !== '' &&
             gameCell[pos1].textContent === gameCell[pos2].textContent && 
             gameCell[pos2].textContent === gameCell[pos3].textContent) {
            return true
        }
    }
    return false
}
const checkTie = ()=>{
    let emptyCellCount=0
    gameCell.forEach(cell =>{
        if(cell.textContent === '' ){
            emptyCellCount++
        }
    })
    return emptyCellCount===0 && !checkWin()
}

const disableCells = () =>{
    gameCell.forEach(cell =>{
        cell.removeEventListener('click',handleClick)
        cell.classList.add('disable')
    })
}

const restart = ()=>{
    gameCell.forEach(cell =>{
        cell.textContent=''
        cell.classList.remove('disable')
    })
    startGame()
}

const showAlert = (msg)=>{
    alertBox.style.display ='block'
    alertBox.textContent=msg
    setTimeout(() => {
        alertBox.style.display= 'none'
    }, 4000);
}


button.addEventListener('click', restart)
startGame()