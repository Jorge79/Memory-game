var moves = 0;
var allCards;
var movements;
var minutesLabel;
var secondsLabel;
var totalSeconds;
var matchedCards = 0;
var interval;
let isTimerStarted = false;

var cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',
            'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube',
            'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'
            ];

function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"> </i> </li>`;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function initGame() {
    var deck = document.querySelector('.deck');

    var cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });

    deck.innerHTML = cardHTML.join('');
    allCards = document.querySelectorAll('.card');
    restart();
    openCards = [];
    movements = 0;
    moves = document.getElementById("moves");
    moves.innerHTML= movements;

    minutesLabel = document.getElementById("minutes");
    secondsLabel = document.getElementById("seconds");
    secondsLabel.innerHTML = "00";
    minutesLabel.innerHTML = "00";
    totalSeconds = 0;
    document.getElementById("star1").className = "fa fa-star";
    document.getElementById("star2").className = "fa fa-star";
    document.getElementById("star3").className = "fa fa-star";

    matchCards =0;
    first = true;
}

initGame();

function setTime() { //Function got in StackOverflow
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function restart() {
    allCards.forEach(function(card) {
        card.addEventListener('click', function() {
            console.log("matchedCards: ", matchedCards);
            if (isTimerStarted == false) {
                interval = setInterval(setTime, 1000);
                isTimerStarted = true;
            }
            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                openCards.push(card);
                card.classList.add('open', 'show');

                if (openCards.length == 2) { //Two cards open
                    if (openCards[0].dataset.card == openCards[1].dataset.card) { //Cards equal
                        openCards[0].classList.add('match');
                        openCards[0].classList.add('open');
                        openCards[0].classList.add('show');

                        openCards[1].classList.add('match');
                        openCards[1].classList.add('open');
                        openCards[1].classList.add('show');

                        openCards = [];
                        matchedCards++;
                        if (matchedCards == 8) {
                            setTimeout(() => {
                                alert("Congratulations!! You finished the game with: ");
                                clearInterval(interval);
                                isTimerStarted = false;
                                initGame();
                            }, 300);
                        }
                    }
                    else {
                        setTimeout(function() {
                            openCards.forEach(function(card) {
                                card.classList.remove('open', 'show');
                            });
                        openCards = [];
                        }, 1000);
                    }
                    movements++;
                    moves.innerHTML=movements;
                    if(movements > 2) {
                        document.getElementById("star3").classList.remove("fa fa-star");
                    } else if(movements > 10 && movements <= 14){
                        document.getElementById("star1").className ="fa fa-star";
                        document.getElementById("star2").className ="fa fa-star";
                        document.getElementById("star3").className ="far fa-star";
                    } else if(movements > 14 && movements <= 18){
                        document.getElementById("star1").className ="fa fa-star";
                        document.getElementById("star2").className ="far fa-star";
                        document.getElementById("star3").className ="far fa-star";
                    } else {
                        document.getElementById("star1").className ="fa fa-star";
                        document.getElementById("star2").className ="fa fa-star";
                        document.getElementById("star3").className ="far fa-star";
                    }
                }
            }
        });
    });
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 *function greeting(name) {
  alert('Hello ' + name);
}
*/