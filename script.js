const play = document.getElementById("btn-one");
const gameDiv = document.querySelector(".game-div");
const grid = document.querySelector(".grid");
const smallcell = document.querySelectorAll(".smallcell");
const bigcell = document.querySelectorAll(".bigcell");


let currentPlayer = "X";
let isGameOver = false;
let freewill=true;
let Aray = [true, true, true, true, true, true, true, true, true];


 
// create the Tic-Tac-Toe grid
function createTicTacToeGrid() {
    play.style.display="none";
    grid.style.display = "grid"; 
    for (let i = 0; i < 9; i++) {
        const bigcel = document.createElement("div");
        bigcel.classList.add("bigcell");
        // bigcell.id.add(i);
        bigcel.textContent = "";
        grid.appendChild(bigcel);
    }

    let cels=document.getElementsByClassName("bigcell");
    for(let i=0;i<9;i++){
        for (let i = 0; i < 9; i++) {
            const smallcel = document.createElement("div");
            smallcel.classList.add("smallcell");
            // bigcell.id.add(i);
            smallcel.textContent = "";
            cels[i].appendChild(smallcel);
        }
    }   
}


//which bigcell to be selected
function choosebigcell(sbnum){
    const sbd= document.querySelectorAll(".bigcell");
    const smcel=sbd[sbnum].querySelectorAll(".smallcell");
    for(let i=0;i<9;i++){
        if(smcel[i].textContent===""){
        freewill=false;
        break;
        }
        freewill=true;
    }
    if(!freewill){
        for(let i=0;i<9;i++){
            if(i!=sbnum){
                sbd[i].classList.add("disable-click");
            }
        }
    }

}



function checksbgameover(bbnum){
    const sbd= document.querySelectorAll(".bigcell");
    const cels=sbd[bbnum].querySelectorAll(".smallcell");
      
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            
            if ((cels[a].textContent==="X" || cels[a].textContent==="O") &&
    
            cels[a].textContent === cels[b].textContent && cels[a].textContent === cels[c].textContent) {
              
             
             console.log("gameover");


          
             sbd[bbnum].style.display="flex";
            Aray[bbnum]=false;
             sbd[bbnum].textContent=cels[a].textContent;
                
               



               
            }
        }
        
        for(let i=0;i<9;i++){
            if(cels[i].textContent===""){
                // isGameOver=false;
                return ;
            }
        }
      
        // isGameOver=true;
        
       
        return;
        
        
    

}

       grid.addEventListener("click", (event) => {
            if (!isGameOver && event.target.classList.contains("smallcell") && !event.target.textContent) {
            const cels=document.getElementsByClassName("bigcell");
                for(let i=0;i<9;i++){
                    if(cels[i].classList.contains("disable-click")){
                        cels[i].classList.remove("disable-click");}
                    
                }
                const box = document.querySelectorAll(".smallcell");
                let clickedIndex = Array.from(box).indexOf(event.target);
                
                event.target.textContent = currentPlayer;
                let bbnum=Math.floor(clickedIndex/9);
                let sbnum=clickedIndex%9;
                checksbgameover(bbnum);
                if(Aray[bbnum]===true){
                choosebigcell(sbnum);}
               



                if(currentPlayer==="X"){
                currentPlayer = "O";}
                else{
                    currentPlayer="X";
                } 
             
               
            }
        });
        
       


          
      
        play.addEventListener("click", () => {
            createTicTacToeGrid();
        });
        