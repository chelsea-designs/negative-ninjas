const difficulty=[
    {timesTables:[-2,2,-10,10],gameOperator:"multiply",colour:"white",lliw:"gwyn"},
    {timesTables:[-2,2,-10,10],gameOperator:"division",colour:"yellow",lliw:"melyn"},
    {timesTables:[-2,2,-10,10],gameOperator:"mixture",colour:"orange",lliw:"oren"},
    {timesTables:[-2,2,-4,4,-5,5,-10,10],gameOperator:"multiply",colour:"green",lliw:"gwyrdd"},
    {timesTables:[-2,2,-4,4,-5,5,-10,10],gameOperator:"division",colour:"purple",lliw:"piws"},
    {timesTables:[-2,2,-4,4,-5,5,-10,10],gameOperator:"mixture",colour:"blue",lliw:"glas"},
    {timesTables:[-1,1,-2,2,-3,3,-4,4,-5,5,-6,6,-7,7,-8,8,-9,9,-10,10,-11,11,-12,12],gameOperator:"multiply",colour:"brown",lliw:"brown"},
    {timesTables:[-1,1,-2,2,-3,3,-4,4,-5,5,-6,6,-7,7,-8,8,-9,9,-10,10,-11,11,-12,12],gameOperator:"division",colour:"red",lliw:"coch"},
    {timesTables:[-1,1,-2,2,-3,3,-4,4,-5,5,-6,6,-7,7,-8,8,-9,9,-10,10,-11,11,-12,12],gameOperator:"mixture",colour:"black",lliw:"du"}
];

let beltNumber=0;
const maxBeltNumber=8;
let currentBelt;
let ninjaNoise = new Audio("assets/audio/ninja-noise.wav");
let dragonNoise = new Audio("assets/audio/fire-noise.wav");

$(".game-area").hide();
$("#ninja-star").hide();
$("#fire-ball").hide();

// Language Switcher
$(".cy").hide();

$('#switch-lang').click(function() {
    $(".cy").toggle();
    $(".en").toggle();
});

// Run Game

$(".btn-start").click(function(){
    beltNumber = parseInt(this.getAttribute("data-value")); // retrieve index of button pressed
    currentBelt = difficulty[beltNumber].colour;
    let multipliers = difficulty[beltNumber].timesTables; // retrieves multipliers for chosen difficulty
    let gameType = difficulty[beltNumber].gameOperator; // retrieves operator for chosen difficulty level
    document.getElementById('current-belt').innerHTML = currentBelt; // updates the dom with chosen level from button text; 
    runGame(gameType,multipliers);
    $('#ninja-progress').removeClass("bg-warning").addClass("bg-success");
    $('#dragon-progress').removeClass("bg-warning").addClass("bg-success");
});

function runGame(gameType,multipliers){
    //reset
    $(".game-area").show();
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    // change image
    $("#ninja-img").attr('src', `assets/images/ninja${beltNumber}.png`);
    $("#dragon-img").attr('src', `assets/images/dragon${beltNumber}.png`);

    //generate questions
    let num1 = Math.ceil(Math.random() * 12) * (Math.round(Math.random()) ? 1 : -1); // random number between -12 and 12 exc zero.
    let num2 = multipliers[Math.floor(Math.random() * multipliers.length)]; // Generate random number from the array associated with game type i.e. if 1st btn is pressed, choose random number from index 0 - change this 0.

    if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else if (gameType === "mixture" ) {
        let chosenOperator=Math.random();
        if (chosenOperator<0.5){
            displayMultiplyQuestion(num1, num2);
        } else {
            displayDivisionQuestion(num1, num2);
        }
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
    $(".game-intro").hide();
    $("h1").hide();
};

// Submit Answer
$('#btn-submit').click(function(){
    checkAnswer();
});

document.getElementById("answer-box").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer;
    
    if (isCorrect) {
        incrementCorrect();
    } else {
        incrementIncorrect();
    }
}

function calculateCorrectAnswer(){
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "x") {
        return operand1 * operand2;
    } else if (operator === "\u00F7") {
        return operand1 / operand2;
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
};

function incrementCorrect(){
    let oldCorrect = parseInt(document.getElementById("correct").innerText);
    document.getElementById("correct").innerText = ++oldCorrect;
    $('#answer-box').css("background-color","green");
    setTimeout(function() {
        $('#answer-box').css("background-color","white");
  }, 250);
    ninjaShoots();
    let dragonHealth = parseInt(document.getElementById("dragon-progress").style.width);
    if(dragonHealth!=0){
        $('#dragon-progress').removeClass("bg-success").addClass("bg-warning");
        dragonHealth -= 10;
        document.getElementById("dragon-progress").style.width=dragonHealth+"%";
        runGame(difficulty[beltNumber].gameOperator,difficulty[beltNumber].timesTables); 
    } else {
        beltNumber==maxBeltNumber ? win() : nextLevel();
    }
};

function incrementIncorrect(){
    let oldIncorrect = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldIncorrect;
    $('#answer-box').css("background-color","red");
    setTimeout(function() {
        $('#answer-box').css("background-color","white");
  }, 500);
    let ninjaHealth = parseInt(document.getElementById("ninja-progress").style.width);
    dragonShoots();
    if(ninjaHealth!=0){
        $('#ninja-progress').removeClass("bg-success").addClass("bg-warning");
        ninjaHealth -= 10;
        document.getElementById("ninja-progress").style.width=ninjaHealth+"%";
        runGame(difficulty[beltNumber].gameOperator,difficulty[beltNumber].timesTables); 
    } else {
        replayLevel();
    }
};

// Replay
function replayLevel(){
    //reset
    $(".game-intro").show();
    document.getElementById("dragon-progress").style.width=100+"%";
    document.getElementById("ninja-progress").style.width=100+"%";
    $('#ninja-progress').removeClass("bg-warning").addClass("bg-success");
    $('#dragon-progress').removeClass("bg-warning").addClass("bg-success");
    document.getElementById("correct").innerHTML = 0;
    document.getElementById("incorrect").innerHTML = 0;
    // modal
    $('#replayModal').modal('toggle');
    // run game
    runGame(difficulty[beltNumber].gameOperator,difficulty[beltNumber].timesTables); 
};

// Next Level
function nextLevel(){
    //reset
    document.getElementById("dragon-progress").style.width=100+"%";
    document.getElementById("ninja-progress").style.width=100+"%"; 
    $('#ninja-progress').removeClass("bg-warning").addClass("bg-success");
    $('#dragon-progress').removeClass("bg-warning").addClass("bg-success");
    document.getElementById("correct").innerHTML = 0;
    document.getElementById("incorrect").innerHTML = 0;
    beltNumber++;
    currentBelt = difficulty[beltNumber].colour;
    document.getElementById('current-belt').innerHTML = currentBelt;
    // modal
    $('#nextModal').modal('toggle');
    $(".ninja-img-modal").attr('src', `assets/images/ninja${beltNumber}.png`);
    // next
    runGame(difficulty[beltNumber].gameOperator,difficulty[beltNumber].timesTables);
}

// Display Questions
function displayMultiplyQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand2 * Math.floor(Math.random() * 25 -12);
    document.getElementById("operand2").textContent = operand2;
	document.getElementById("operator").textContent = "\u00F7";

}

// Animation
function dragonShoots() {
    $('#fire-ball').show().css({ 'right': '0px', 'left': '' }).animate({
        'right' : '110%'    
    });
    dragonNoise.play();                      
};

function ninjaShoots() {
    $('#ninja-star').show().css({ 'right': '', 'left': '0px' }).animate({
        'left' : '110%'
    });        
    ninjaNoise.play();          
};

// Win
function win(){
    // modal
    $('#winModal').modal('toggle');
    let themeSong = new Audio("assets/audio/theme-song.wav");
    themeSong.play();
};


// back arrow to return to select level
// health last hit isn't right
// currentbelt variable not welsh
// change background image on mobile
// translate modals
// and belt colour to modal
// win modal button to go back to level select or maybe a certificate?
// one hit left health bar to turn red