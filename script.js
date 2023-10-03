const play = document.getElementById("btn-one");
const gameDiv = document.querySelector(".game-div");
const grid = document.querySelector(".grid");
const smallcell = document.querySelectorAll(".smallcell");
const bigcell = document.querySelectorAll(".bigcell");
let matter=document.getElementById("text");


let currentPlayer = "X";
let isGameOver = false;
let freewill=true;
let Aray = [true, true, true, true, true, true, true, true, true];


 
// create the Tic-Tac-Toe grid
function createTicTacToeGrid() {
    Aray = [true, true, true, true, true, true, true, true, true];
    play.style.display="none";
    grid.style.display = "grid"; 
    for (let i = 0; i < 9; i++) {
        const bigcel = document.createElement("div");
        bigcel.classList.add("bigcell");
        bigcel.id="";
        // bigcell.id.add(i);
        bigcel.textContent = "";
        grid.appendChild(bigcel);
    }

    let cels=document.getElementsByClassName("bigcell");
    for(let i=0;i<9;i++){
        for (let j = 0; j < 9; j++) {
            const smallcel = document.createElement("div");
            smallcel.id = 9*i+j;
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
    if(Aray[sbnum]===true){
    for(let i=0;i<9;i++){
        if(smcel[i].textContent===""){
        freewill=false;
        break;
        }
        freewill=true;
    }}
    else{
        freewill=true;
    }
    if(!freewill){
        for(let i=0;i<9;i++){
            if(i!=sbnum && sbd[i].id===""){
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
              
             
             console.log("smallgameover");
             sbd[bbnum].style.display="flex";
            Aray[bbnum]=false;
             sbd[bbnum].textContent=cels[a].textContent;
             sbd[bbnum].id=cels[a].textContent;
            checkbbgameover();
               
            return;    
            }
        }
        for(let i=0;i<9;i++){
            if(cels[i].textContent===""){
                return ;
            }
        }
        sbd[bbnum].style.display="flex";
        Aray[bbnum]=false;
         sbd[bbnum].textContent=" ";
        return;
}
   

function checkbbgameover(){
    const cels= document.querySelectorAll(".bigcell");

         for(let i=0;i<9;i++){
            console.log(cels[i].id);
         }
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            
            if ((cels[a].id==="X" || cels[a].id==="O") &&
    
            cels[a].id=== cels[b].id && cels[a].id === cels[c].id) {
              
             
             console.log("biggameover");
             isGameOver=true;
             console.log("a",cels[a].id);
             console.log("b",cels[b].id);
             console.log("c",cels[c].id);
            animategrid(a,b,c,cels);
               
            return;    
            }
        }
       
        return;
}

function animategrid(a,b,c,cels){
    cels[a].classList.add("winning-cell");
    cels[b].classList.add("winning-cell");
    cels[c].classList.add("winning-cell");
setTimeout(()=>{
    for(let i=0;i<9;i++){
    grid.removeChild(cels[i]);

// const scell=cels[i].getElementsByClassName("smallcell");
// for(let j=0;j<9;j++){
//     scell[j].textContent="";
// }
}
isGameOver=false;
createTicTacToeGrid();


},2000);
}



       grid.addEventListener("click", (event) => {
            if (!isGameOver && event.target.classList.contains("smallcell") && !event.target.textContent) {
            const cels=document.getElementsByClassName("bigcell");
                for(let i=0;i<9;i++){
                    if(cels[i].classList.contains("disable-click")){
                        cels[i].classList.remove("disable-click");}
                    
                }
                const box = document.querySelectorAll(".smallcell");
                let clickedIndex = parseInt(event.target.id, 10);;

                console.log(clickedIndex);
                event.target.textContent = currentPlayer;
                let bbnum=Math.floor(clickedIndex/9);
                let sbnum=clickedIndex%9;
                checksbgameover(bbnum);
                if(Aray[sbnum]===true){
                choosebigcell(sbnum);}
               



                if(currentPlayer==="X"){
                currentPlayer = "O";}
                else{
                    currentPlayer="X";
                } 
                matter.innerHTML=currentPlayer+"'s  Turn";
             
               
            }
        });
        
       


          
      
        play.addEventListener("click", () => {
            createTicTacToeGrid();
            matter.innerHTML=currentPlayer+"'s  Turn";
        });
        
