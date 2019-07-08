var movesModal;
var moves = 0;
var allCards;
var movements;
var minutesLabel;
var secondsLabel;
var totalSeconds;
var minutesModal;
var secondsModal;
var matchedCards = 0;
var interval;
let isTimerStarted = false;
var starCount = 3;
var starModal;
var buttonModal;

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
    newGame();
    openCards = [];

    starModal = document.getElementById("star-modal")
    movesModal = document.getElementById("moves-modal");
    movements = 0;
    moves = document.getElementById("moves");
    moves.innerHTML= movements;

    minutesModal = document.getElementById("minutes-modal");
    secondsModal = document.getElementById("seconds-modal");
    minutesLabel = document.getElementById("minutes");
    secondsLabel = document.getElementById("seconds");
    secondsLabel.innerHTML = "00";
    minutesLabel.innerHTML = "00";
    totalSeconds = 0;

    document.getElementById("star1").className = "fa fa-star";
    document.getElementById("star2").className = "fa fa-star";
    document.getElementById("star3").className = "fa fa-star";

    matchCards = 0;
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

function stopTime() {
    clearInterval(interval);
}

document.querySelector("#button-modal").addEventListener("click", initGame);  //Restart modal button
document.querySelector(".restart").addEventListener("click", initGame); //Restart button

function newGame() {
    allCards.forEach(function(card) {
        card.addEventListener('click', function() {
            if (isTimerStarted == false) {
                interval = setInterval(setTime, 1000);
                isTimerStarted = true;
            }
            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                if(openCards.length < 2) {
                    openCards.push(card);
                } else {
                    return;
                }
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
                                var modal = document.getElementById("myModal");
                                movesModal.innerHTML = movements;

                                // Get the <span> element that closes the modal
                                var span = document.getElementsByClassName("close")[0];
                                
                                // When the user clicks the button, open the modal 
                                modal.style.display = "block";
                                
                                // When the user clicks on <span> (x), close the modal
                                span.onclick = function() {
                                  modal.style.display = "none";
                                }
                                
                                // When the user clicks anywhere outside of the modal, close it
                                window.onclick = function(event) {
                                  if (event.target == modal) {
                                    modal.style.display = "none";
                                  }//parar o tempo, mostrar os movementos e as estrelas,
                                }
                            }, 300);
                            stopTime();
                            secondsModal.innerHTML = secondsLabel.innerHTML;
                            minutesModal.innerHTML = minutesLabel.innerHTML;

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
                    moves.innerHTML = movements;

                    if(movements > 10 && movements <= 15) {
                        document.getElementById("star3").classList.remove("fa-star");
                        starCount = 2;
                    } else if(movements > 15 && movements <= 20){
                        document.getElementById("star2").classList.remove("fa-star");
                        starCount = 1;
                    }
                    starModal.innerHTML = starCount;
                }
            }
        });
    });
}