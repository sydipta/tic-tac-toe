let boxes=document.querySelectorAll(".btn")
let resetBtn=document.querySelector(".reset")
let newGame=document.querySelector(".newBtn")
let messContainer=document.querySelector(".mes-container")
let mess=document.querySelector(".message")

let turn="player1";
const winPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//checking if we get a winner
function checkWinner(){
    for(let pattern of winPattern){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;
        if(pos1!=="" && pos2===pos3 && pos3===pos1){
            boxes[pattern[0]].classList.remove("clr1","clr2");
            boxes[pattern[0]].classList.add("win");
            boxes[pattern[1]].classList.remove("clr1","clr2");
            boxes[pattern[1]].classList.add("win");
            boxes[pattern[2]].classList.remove("clr1","clr2");
            boxes[pattern[2]].classList.add("win");
            gameOver();
            showWinner(pos1);
            return;
        }
    }
    if(cnt==9){
        gameOver();
        messContainer.classList.remove("hide");
        mess.innerText="It's a Draw, reset or start a new game"
    }
}

//functions after a winner is decided
function gameOver(){
    boxes.forEach(box=>{
        box.disabled=true;
    })
}
function showWinner(player){
    turn=(turn=="player1")? "Player 2" : "Player 1";
    mess.innerText=`Congratulation, ${turn} is the winner`
    messContainer.classList.remove("hide");
}

//checking Draw
let cnt=0;
// let draw = true;
// if(cnt==9 && draw==true){
//     messContainer.classList.remove("hide");
//     mess.innerText="It's a Draw, reset or start a new game"
// }

//click event of each button
const clk=(event) => {
    const box = event.target;
    if (box.innerText !== "") return;
    box.classList.remove("clr1", "clr2");
    if(turn=="player1"){
        turn="player2";
        box.innerText="X";
        box.classList.add("clr1");
    }else{
        turn="player1";
        box.innerText="O";
        box.classList.add("clr2")
    }
    cnt++;
    checkWinner();

}
boxes.forEach((box) => {
    box.addEventListener("click", clk);
});

//function for new game
function new_Game(){
    cnt=0;
    messContainer.classList.add("hide");
    turn="player1";
    boxes.forEach((box)=>{
        box.disabled=false;
        box.innerText="";
        box.classList.remove("clr1","clr2","win");
    })
    mess.innerText="";
}
newGame.addEventListener("click",new_Game)
resetBtn.addEventListener("click",new_Game)

