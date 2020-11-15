const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const huskys = document.querySelectorAll('.husky');
let lastHole;
let timeUp = false;
let result = 0;

//create a function to make a random time for husky to pop from the hole
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes){
    const index  = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    //prevent same hole from getting the same number
    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 1000); //get a random time to determine how long husky should peep
    const hole = randomHole(holes); //get the random hole from the randomHole function
    hole.classList.add('up'); //add the CSS class so selected husky can "pop up"
    setTimeout(() => {
        hole.classList.remove('up'); //make the selected husky "pop down" after a random time
        if(!timeUp) {
            peep();
        }
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000) //show random huskys for 20 seconds
}

function pat(e){
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up'); //this refers to item clicked
    scoreBoard.textContent = score;
	
  
  
} 

huskys.forEach(husky => husky.addEventListener('click', pat))
