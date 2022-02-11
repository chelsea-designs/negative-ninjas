$(".game-area").hide();
$("#ninja-star").hide();

// Language Switcher
$(".cy").hide();

$('#switch-lang').click(function() {
    $(".cy").toggle();
    $(".en").toggle();
});


// Multipliers
const difficulty=[
    {timesTables:[-2,2,-10,10],gameOperator:"multiply",colour:"white"},
    {timesTables:[-2,2,-10,10],gameOperator:"division",colour:"yellow"},
    {timesTables:[-2,2,-10,10],gameOperator:"mixture",colour:"orange"},
    {timesTables:[-2,2,-4,4,-5,5,-10,10],gameOperator:"multiply",colour:"green"},
    {timesTables:[-2,2,-4,4,-5,5,-10,10],gameOperator:"division",colour:"purple"},
    {timesTables:[-2,2,-4,4,-5,5,-10,10],gameOperator:"mixture",colour:"blue"},
    {timesTables:[-1,1,-2,2,-3,3,-4,4,-5,5,-6,6,-7,7,-8,8,-9,9,-10,10,-11,11,-12,12],gameOperator:"multiply",colour:"brown"},
    {timesTables:[-1,1,-2,2,-3,3,-4,4,-5,5,-6,6,-7,7,-8,8,-9,9,-10,10,-11,11,-12,12],gameOperator:"division",colour:"red"},
    {timesTables:[-1,1,-2,2,-3,3,-4,4,-5,5,-6,6,-7,7,-8,8,-9,9,-10,10,-11,11,-12,12],gameOperator:"mixture",colour:"black"}
];

// Run Game

$(".btn-start").click(function(){
    let buttonIndex = parseInt(this.getAttribute("data-value")); // retrieve index of button pressed
    let multipliers = difficulty[buttonIndex].timesTables; // retrieves multipliers for chosen difficulty
    let gameType = difficulty[buttonIndex].gameOperator; // retrieves operator for chosen difficulty level
    let currentBelt = this.innerText;
    document.getElementById('current-belt').innerHTML = currentBelt; // updates the dom with chosen level from button text
    document.getElementById('belt-number').innerHTML = buttonIndex; 
    runGame(gameType,multipliers);
    $('#ninja-progress').removeClass("bg-warning").addClass("bg-success");
    $('#baddy-progress').removeClass("bg-warning").addClass("bg-success");
});

function runGame(gameType,multipliers){
    //reset
    $(".game-area").show();
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    // change image
    $("#ninja-img").attr('src', `assets/images/ninja${document.getElementById('belt-number').innerHTML}.png`);

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
    } else if (operator === "/") {
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
    ninjaShoots();
    let baddyHealth = parseInt(document.getElementById("baddy-progress").style.width);
    if(baddyHealth!=0){
        $('#baddy-progress').removeClass("bg-success").addClass("bg-warning");
        baddyHealth -= 10;
        document.getElementById("baddy-progress").style.width=baddyHealth+"%";
        runGame(difficulty[parseInt(document.getElementById('belt-number').innerHTML)].gameOperator,difficulty[parseInt(document.getElementById('belt-number').innerHTML)].timesTables); 
    } else {
        nextLevel();
    }
};

function incrementIncorrect(){
    let oldIncorrect = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldIncorrect;
    $('#answer-box').css("background-color","red");
    let ninjaHealth = parseInt(document.getElementById("ninja-progress").style.width);
    baddyShoots();
    if(ninjaHealth!=0){
        $('#ninja-progress').removeClass("bg-success").addClass("bg-warning");
        ninjaHealth -= 10;
        document.getElementById("ninja-progress").style.width=ninjaHealth+"%";
        runGame(difficulty[parseInt(document.getElementById('belt-number').innerHTML)].gameOperator,difficulty[parseInt(document.getElementById('belt-number').innerHTML)].timesTables); 
    } else {
        replayGame();
    }
};

// Replay
function replayGame(){
    alert("Game Over you lost!");
    $(".game-intro").show();
    document.getElementById("baddy-progress").style.width=100+"%";
    document.getElementById("ninja-progress").style.width=100+"%";
    document.getElementById("correct").innerHTML = 0;
    document.getElementById("incorrect").innerHTML = 0;
    runGame(difficulty[(parseInt(document.getElementById('belt-number').innerHTML))].gameOperator,difficulty[(parseInt(document.getElementById('belt-number').innerHTML))].timesTables); 
};

// Next Level
function nextLevel(){
    alert(`Level Complete! You earned your ${document.getElementById('current-belt').innerHTML} belt`);
    // click next button How??
    //reset
    document.getElementById("baddy-progress").style.width=100+"%";
    document.getElementById("ninja-progress").style.width=100+"%"; 
    document.getElementById("correct").innerHTML = 0;
    document.getElementById("incorrect").innerHTML = 0;
    runGame(difficulty[(parseInt(document.getElementById('belt-number').innerHTML))+1].gameOperator,difficulty[(parseInt(document.getElementById('belt-number').innerHTML))+1].timesTables);
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
	document.getElementById("operator").textContent = "/";

}

// Animation
function baddyShoots() {
    $('#ninja-star').show().css({ 'right': '0px', 'left': '' }).animate({
        'right' : '110%'    
    });                    
};

function ninjaShoots() {
    $('#ninja-star').show().css({ 'right': '', 'left': '0px' }).animate({
        'left' : '110%'
    });                    
};

//hide ninja star before throw
//answer box bg flash not stay
//issues: When level complete, questions from next type play wrong game Type and dom is not updated (because button isn't pressed?)