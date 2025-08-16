function startGame(){

    

    generateGreed()
    
    
    

}

function check(board){

    let flag= false

    for(i=0;i<3; i++){
        if(board[i]==board[i+3] && board[i]==board[i+6] && board[i]!==0){
            console.log("comprobado columnas")
            flag=true
            endGame(flag)
        }
        
            
        if(board[i*3]==board[i*3+1] && board[i*3]==board[i*3+2] && board[i*3]!==0){
            console.log("comprobado filas ")
            flag=true
            endGame(flag)
        }
        
    }

    if((board[0]==board[4] && board[0]==board[8] || board[2]==board[4] && board[2]==board[6]) && board[0]!=0 && board[2]!=0){
            
        console.log("comprobado diagonales")
        flag=true 
        endGame(flag)
    }

    
    if(!board.includes(0) && flag==false){
        
        endGame(flag)
    }

    console.log(board) 

}


const player=function (name, char){
    this.name=name
    this.char=char
    let points=0

    function play(pos){
        

       return gameBoard().marc(pos, char)
       
    }

    const addPoints=function (){
        points+=1
    }
    const getPoints= function(){
        return points
    }

    return {name, getPoints, play, addPoints, char}
}

let board= [0,0,0,0,0,0,0,0,0]



const gameBoard=function (){
    
    

    function marc(pos, char){
        if (pos!=undefined){
        board[pos]=char
        }
        check(board) 
    }

    return {board, marc}

}


const player1=new player(prompt("Player 1 name: "), "X")
const player2=new player(prompt("Player 2 name: "), "O")
let turn=1
startGame()


function generateGreed(){
    
    const greed= document.querySelector('#greed')
    while(greed.firstChild){
        greed.removeChild(greed.firstChild)
    }
    const body=document.querySelector('body')
    
    const currentTurn=document.createElement('h3')
    currentTurn.textContent=`${player1.name} turn!!`
    currentTurn.style.color="white"
    currentTurn.style.alignSelf="center"
    body.appendChild(currentTurn)

    for(i=0;i<9;i++){
        const square =document.createElement('div')
        square.className='square'
        square.id=i
        let cheked=false
        
        

        square.addEventListener('click', function (){
            
            if(!cheked){
                switch(turn){
                    case 1:
                        player1.play(square.id);
                        square.textContent=player1.char
                        turn=2
                        currentTurn.textContent=`${player2.name} turn!!`
                        cheked=true
                        break
                    case 2:
                        player2.play(square.id);
                        square.textContent=player2.char
                        turn=1
                        currentTurn.textContent=`${player1.name} turn!!`
                        cheked=true
                        break
                }
            }
            
        })

        greed.appendChild(square)
    }
}

function endGame(flag){
    const end=document.querySelector('#end')
    if(flag){
        if(turn==1){
            end.textContent=`!!!${player1.name} win!!!`
        }else if (turn==2){
            end.textContent=`!!!${player2.name} win!!!`
        }

        end.style.visibility="visible"
        end.style.zIndex="10"
    }else{
        end.textContent=`!!!DROW!!!`
        end.style.visibility="visible"
        end.style.zIndex="10"
    }
    
    end.addEventListener('click', function (){
        board=[0,0,0,0,0,0,0,0,0]
        generateGreed()
        end.style.visibility="hidden"
        end.style.zIndex="-10"
        end.textContent=``
        turn=1
    })
    
}

