let dealer = {deck:[], value:0, hiddenValue:0}
let user = {deck:[], value:0}
let balance = 500;
let action = {}; // storing functions in an object
const suits = ["\u2660", "\u2663", "\u2665", "\u2666"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

user.drawCard = function(x){
    if (!x){x = 1}
    for (let i = 0; i < x; i++){
        let newCard = randomCard();
        if (newCard[0].value == "A"){
            if (user.value + 11 > 21){
                user.value += 1;
            } else {
                user.value += 11;
            }
        } else if (isNaN(parseInt(newCard[0].value)) === true){
            user.value += 10;
        } else {
            user.value += parseInt(newCard[0].value);
        }
        user.deck.push(newCard[0]);
        document.getElementById("userdeck").appendChild(newCard[1].children[0])
    }
}
dealer.drawCard = function(cards, hiddenCards){
    if (!cards){cards = 1}
    if (!hiddenCards){hiddenCards = 0}
    for (let i = 0; i < cards; i++){
        let newCard = randomCard();
        if (newCard[0].value == "A"){
            if (dealer.value + 11 > 21){
                dealer.value += 1;
            } else {
                dealer.value += 11;
            }
        } else if (isNaN(parseInt(newCard[0].value)) === true){
            dealer.value += 10;
        } else {
            dealer.value += parseInt(newCard[0].value);
        }
        dealer.deck.push(newCard[0]);
        document.getElementById("dealerdeck").appendChild(newCard[1].children[0])
    }
    for (let i = 0; i < hiddenCards; i++){
        let newCard = randomCard(true);
        if (newCard[0].value == "A"){
            if (dealer.value + 11 > 21){
                dealer.hiddenValue += 1;
            } else {
                dealer.hiddenValue += 11;
            }
        } else if (isNaN(parseInt(newCard[0].value)) === true){
            dealer.hiddenValue += 10;
        } else {
            dealer.hiddenValue += parseInt(newCard[0].value);
        }
        dealer.deck.push(newCard[0]);
        document.getElementById("dealerdeck").appendChild(newCard[1].children[0])
    }
}

user.checkWin = function(){
    if (user.value > 21){
        let buttons = document.getElementsByClassName("action")
        let loseText = document.querySelector("#playerResult2")
        for (let i = 0; i < buttons.length; i++){
            buttons[i].style.visibility = "hidden";
        }
        loseText.style.display = "block";
    } else if (user.value == 21){
        let buttons = document.getElementsByClassName("action")
        let winText = document.querySelector("#playerResult1")
        for (let i = 0; i < buttons.length; i++){
            buttons[i].style.visibility = "hidden";
        }
        winText.style.display = "block";
    }
}
dealer.checkWin = function(){
    if (dealer.value > 21){
        let buttons = document.getElementsByClassName("action")
        let winText = document.querySelector("#playerResult1")
        for (let i = 0; i < buttons.length; i++){
            buttons[i].style.visibility = "hidden";
        }
        winText.style.display = "block";
    } else if (dealer.value < 21 && dealer.value > 17){
        let buttons = document.getElementsByClassName("action")
        let loseText = document.querySelector("#playerResult2")
        for (let i = 0; i < buttons.length; i++){
            buttons[i].style.visibility = "hidden";
        }
        loseText.style.display = "block";
    }
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomCard(bool){
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["\u2660", "\u2663", "\u2665", "\u2666"];
    let template = document.querySelector('#template');
    let clone = template.content.cloneNode(true);
    if (!bool){
        bool = false;
    }

    let drawnCard = {value:values[random(0, values.length-1)], type:types[random(0, types.length-1)], hidden:bool};
    let node = document.createTextNode(drawnCard.type);
    clone.children[0].children[1].appendChild(node);
    node = document.createTextNode(drawnCard.value)
    clone.children[0].children[0].appendChild(node);
    if (drawnCard.hidden === true){
        clone.children[0].children[2].style.display = 'inline-block';
    }
    return [drawnCard, clone];
}

function startGame(bet){
    if (balance < bet){
        console.log("Not enough money!");
        return;
    }
    let buttons = document.getElementsByClassName("action");
    let button = document.getElementById('betbutton');
    let input = document.getElementById('betvalue')
    for (let i = 0; i < buttons.length; i++){
        buttons[i].style.visibility = "visible";
    }
    button.style.visibility = "hidden";
    input.style.visibility = "hidden";
    dealer.drawCard(1,1);
    user.drawCard(2);
    console.log(user, dealer)
}

action.hit = function(){
    user.drawCard();
    user.checkWin();
}
action.stand = function(){
    dealer.value += dealer.hiddenValue;
    dealer.hiddenValue = 0;
    dealer.deck[1].hidden = false;
    let backCards = document.getElementsByClassName("back");
    for (let i = 0; i < backCards.length; i++){
        if (backCards[i].style.display == 'inline-block'){
            backCards[i].style.display = 'none';
        }
    }
    dealer.checkWin();
    while (dealer.value < 17){
        dealer.drawCard();
        dealer.checkWin();
    }
}
action.dd = function(betvalue){
    betvalue *= 2;
    action.hit();
    action.stand();
}