let dealer = {deck:[], value:0}
let user = {deck:[], value:0}
let action = {}; // storing functions in an object

user.drawCard = function(x){
    if (!x){x = 1}
    for (let i = 0; i < x; i++){
        let newCard = randomCard()
        if (newCard.value == "A"){
            if (user.value + 11 > 21){
                user.value += 1;
            } else {
                user.value += 11;
            }
        } else if (isNaN(parseInt(newCard.value)) === true){
            user.value += 10;
        } else {
            user.value += parseInt(newCard.value);
        }
        user.deck.push(newCard);
    }
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomCard(bool){
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["S", "H", "D", "C"];
    if (!bool){
        bool = false;
    }

    let drawnCard = {value:values[random(0, values.length-1)], type:types[random(0, types.length-1)], hidden:bool};
    return drawnCard;
}

function startGame(){
    dealer.deck.push(randomCard());
    dealer.deck.push(randomCard(true));
    user.drawCard(2);
}

action.hit = function(){
    user.drawCard()
    if (user.value > 21){
        // lose
    } else if (user.value == 21){
        // win
    }
}
action.stand = function(){}
action.dd = function(){}

startGame();
console.log(user)