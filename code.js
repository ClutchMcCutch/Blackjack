let dealer = {deck:[], value:0, hiddenValue:0}
let user = {deck:[], value:0}
let balance = 500;
let action = {}; // storing functions in an object

user.drawCard = function(x){
    if (!x){x = 1}
    for (let i = 0; i < x; i++){
        let newCard = randomCard();
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

dealer.drawCard = function(cards, hiddenCards){
    if (!cards){cards = 1}
    if (!hiddenCards){hiddenCards = 0}
    for (let i = 0; i < cards; i++){
        let newCard = randomCard();
        if (newCard.value == "A"){
            if (dealer.value + 11 > 21){
                dealer.value += 1;
            } else {
                dealer.value += 11;
            }
        } else if (isNaN(parseInt(newCard.value)) === true){
            dealer.value += 10;
        } else {
            dealer.value += parseInt(newCard.value);
        }
        dealer.deck.push(newCard);
    }
    for (let i = 0; i < hiddenCards; i++){
        let newCard = randomCard(true);
        if (newCard.value == "A"){
            if (dealer.value + 11 > 21){
                dealer.hiddenValue += 1;
            } else {
                dealer.hiddenValue += 11;
            }
        } else if (isNaN(parseInt(newCard.value)) === true){
            dealer.hiddenValue += 10;
        } else {
            dealer.hiddenValue += parseInt(newCard.value);
        }
        dealer.deck.push(newCard);
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

function startGame(bet){
    if (balance < bet){
        console.log("Not enough money!");
        return;
    }
    dealer.drawCard(1,1);
    user.drawCard(2);
}

action.hit = function(){
<<<<<<< Updated upstream
    user.drawCard()
    if (user.value > 21){
=======
    user.drawCard();
    user.checkWin();
}
action.stand = function(){
    dealer.value += dealer.hiddenValue;
    dealer.hiddenValue = 0;
    dealer.deck[1].hidden = false;
    dealer.checkWin();
    while (dealer.value < 17){
        dealer.drawCard();
        dealer.checkWin();
    }
    if (dealer.value > user.value){
>>>>>>> Stashed changes
        // lose
    } else if (user.value == 21){
        // win
    }
}
<<<<<<< Updated upstream
action.stand = function(){}
action.dd = function(){}
=======
action.dd = function(betvalue){
    betvalue *= 2;
    action.hit();
    action.stand();
}

action.split = function(){}
>>>>>>> Stashed changes

startGame();
console.log(dealer, user, action)