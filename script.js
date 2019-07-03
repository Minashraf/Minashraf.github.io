const cards = document.querySelectorAll('.memory-card');
var match=0;
let hasFlippedCard = false,lockboard=true;
let firstCard, secondCard;

function flipCard() {
  if(lockboard)
    return;
  if(this===firstCard)
    return;
  this.classList.add('flip');
  if (!hasFlippedCard)
  {
    hasFlippedCard = true;
    firstCard = this;
    return;
  } 
  hasFlippedCard = false;
  secondCard = this;
  checkForMatch();
}
function disableCards()
{
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  match=match+1;
  if(match===18)
  {stopwatch.stop();}
}
function unflipCards()
{
        lockboard=true;
        setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockboard=false;
        resetBoard();
      }, 500);
}
function checkForMatch()
{
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}
function resetBoard()
{
  [hasFlippedCard,lockboard]=[false,false];
  [firstCard,secondCard]=[null,null];
}
  (function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 36);
    card.style.order = randomPos;
  });
})();
cards.forEach(card => card.addEventListener('click', flipCard));
class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.laps = [];
        this.reset();
        this.print(this.times);
    }
    
    reset() {
        this.times = [ 0, 0, 0 ];
    }
    
    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }
    
    stop() {
        this.running = false;
        this.time = null;
    }

    restart() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.reset();
    }
    
    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    
    calculate(timestamp) {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[2] += diff / 10;
        // Seconds are 100 hundredths of a second
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        // Minutes are 60 seconds
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }
    
    print() {
        this.display.innerText = this.format(this.times);
    }
    
    format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.results'));
var clicked=0;
function change()
{
  document.getElementById("start").innerHTML="Restart";
  document.getElementById("solve").disabled = false; 
  lockboard=false;
 if(clicked>0)
	 {
     match=0;
     cards.forEach(card => {
     card.classList.remove('flip');})
     cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 36);
    card.style.order = randomPos;
  });
     cards.forEach(card => card.addEventListener('click', flipCard));
     resetBoard();
		 stopwatch.reset();stopwatch.start();
   }

  else
    {
      stopwatch.start();
      clicked=clicked+1;
    }
}
function solve()
{ cards.forEach(card => {
    card.classList.add('flip');})
 cards.forEach(card => {
    card.removeEventListener('click', flipCard);})
  stopwatch.stop();

}