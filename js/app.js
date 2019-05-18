/*
 * Create a list that holds all of your cards
 */
var cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',
            'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube',
            'fa-leaf', 'fa-leaf', 'fa-bycicle', 'fa-bycicle', 'fa-bomb', 'fa-bomb'
            ];

function generateCard(card) {
    return `<li class="card" data-card="><i class=fa ${card}"> </i> </li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
        return generateCard();
    });
    moves = 0;
    //moveCounter.innerText = moves;

    deck.innerHTML = cardHTML.join('');
}

var allCards = document.querySelectorAll('.card');
var openCards = [];
var moves = 0;

initGame();

allCards.forEach(function(card) {
    card.addEventListener('click', function() {
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
            card.classList.add('open', 'show');

            if (openCards.length == 2) {
                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards[0].classList.add('match');
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');

                    openCards[1].classList.add('match');
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');

                    openCards = [];
                } else {
                    setTimeout(function() {
                        openCards.forEach(function(card) {
                            card.classList.remove('open', 'show');
                        });
                    openCards = [];
                    }, 1000);
                }
                moves += 1;
                //moveCounter.innerText = moves;
            }
        }
    });
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 /*function greeting(name) {
  alert('Hello ' + name);
}

function greeting2(name2) {
    alert('Hello ' + name2 + 'How are you?');
}

function processUserInput(cbGreeting) {
  var name2 = prompt('Please enter your name.');
  cbGreeting(name2);
}
Higher Order Functions

processUserInput(greeting2);

function t(val1, cb) {
    if (val1 === 'authenticated') {
        cb();
    }
    else{
        console.log('Value is false');
    }
}

function sum(callback, n2) {
    const n1 = callback();
    return n1 + n2;
}

function number() {
    return 1;
}

console.log(sum(number, 3));*/