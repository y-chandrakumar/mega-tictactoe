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
 matter.innerHTML=currentPlayer+"'s  Turn";
    Aray = [true, true, true, true, true, true, true, true, true];
    play.style.display="none";
    grid.style.display = "grid"; 
    for (let i = 0; i < 9; i++) {
        const bigcel = document.createElement("div");
        bigcel.classList.add("bigcell");
        bigcel.id="";
        bigcel.textContent = "";
        grid.appendChild(bigcel);
    }

    let cels=document.getElementsByClassName("bigcell");
    for(let i=0;i<9;i++){
        for (let j = 0; j < 9; j++) {
            const smallcel = document.createElement("div");
            smallcel.id = 9*i+j;
            smallcel.classList.add("smallcell");
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
              matter.innerHTML=cels[a].id+" Won";
             
            animategrid(a,b,c,cels);
               
            return;    
            }
        }
let xcount=0;
 let ocount=0;
 for(let i=0;i<9;i++){
       if(cels[i].id===""){
        return;
        
      }
        if(cels[i].id==="X"){
        xcount++;
           }
        if(cels[i].id==="O"){
        ocount++;
        }
  }
 if(xcount>ocount){
 isGameOver=true;
 matter.innerHTML="X Won";
  
 }
  if(xcount<ocount){
 isGameOver=true;
 matter.innerHTML="O Won";
 }
 else if(xcount===ocount){
   isGameOver=true;
 matter.innerHTML=" DRAW  ";}
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
            
        });


        let darkmode=localStorage.getItem("darkmode");
const darkmodetoggle=document.getElementById("toggle");


const enabledarkmode = ()=>{
    let imgElement=document.getElementById("toggle");
    imgElement.setAttribute("src", "files/toggle-on-solid.svg");
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkmode","enabled");

};
const disabledarkmode =()=>{
    let imgElement=document.getElementById("toggle");
    imgElement.setAttribute("src", "files/toggle-off-solid.svg");
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkmode",null);

};

if(darkmode==="enabled"){
    enabledarkmode();
    
}
darkmodetoggle.addEventListener("click", ()=>{
    darkmode=localStorage.getItem("darkmode");
    console.log(darkmode)
   
    if(darkmode!=="enabled"){
        enabledarkmode();
    }
    else{
        disabledarkmode();
    }
    
});
        
