//npm install -g http-server

//http-server -c-1

console.log('Rock Paper Scissors Lizard Spock!!')

window.addEventListener("DOMContentLoaded", () => {
    setup()
});

const options = {
    rock: {
        lizard: "crushes",
        scissors: "smashes"
    },
    paper: {
        rock: "covers",
        spock: "disproves"
    },
    scissors: {
        paper: "cuts",
        lizard: "decapitates"
    },
    lizard:{
        spock: "poisons",
        paper: "eats"
    },
    spock: {
        scissors: "smashes",
        rock: "vaporizes"
    }
};

let AIchoice = null;
let PlayerChoice = null;
let score = [0,0];

function setup(){
    for(const k in options){
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const img = document.createElement('img');
        img.src = `https://source.unsplash.com/featured/400x300/?{a ${k}},{a ${k}}`;
        div1.id = k;
        div1.classname = 'base_unselected'
        div1.appendChild(img);
        div1.onclick = (e) => {
            choose(e);
        };

        div2.id = 'a1' +k;
        div2.className = 'base_unselected';
        div2.appendChild(div1);

        document.getElementById('selection').appendChild(div2);
    }
    updateScore();
};

function updateScore(){
    document.getElementById("score").innerText = score[0] + " : " + score[1];
};

function choose(event){
    for(const k in options){
        const node = document.getElementById(k);
        node.className = 'base_unselected'
    };

    event.currentTarget.className = "base_selected";

    PlayerChoice = event.currentTarget.id;

    AIchoose(50);
}

function AIchoose(delay){
    console.log(delay);
    for (const k in options){
        const node = document.getElementById(k);
        node.parentNode.className = 'base_unselected'
    };

    const possibleChoice = Object.keys(options);
    const roll = Math.floor(Math.random()*possibleChoice.length);
    const pick = possibleChoice[roll];
    const node = document.getElementById(pick);
    node.parentNode.className = 'base_AIselected';
    AIchoice = pick;

    if(delay < 100) {
        setTimeout(() => {
            AIchoose(delay+5);
        }, delay);
    }else {
        game(PlayerChoice, AIchoice);
    }
};

function game(inputA, inputB){
    let result = "";
    if(inputA == inputB){
        result = "It's a tie"
    }else if(inputA in options[inputB]){
        result = `Computer wins: ${inputB} ${options[inputB][inputA]} ${inputA}`
        score[1]+=1
    }else {
        result = `Player wins: ${inputA} ${options[inputA][inputB]} ${inputB}`
        score[0]+=1
    }
    document.getElementById("description").innerText = result;
    updateScore();
}