// Language Switcher
$(".cy").hide();

$('#switch-lang').click(function() {
    $(".cy").toggle();
    $(".en").toggle();
});


// Multipliers
const difficulty = {White:[-2,2,-10,10], Yellow:[-2,2,-10,10], Orange:[-2,2,-10,10], Green:[-2,2,-4,4,-5,5,-10,10], Purple:[-2,2,-4,4,-5,5,-10,10],Blue:[-2,2,-4,4,-5,5,-10,10],Brown:[-1,1,-2,2,-3,3,-4,4,-5,5,-6,6,-7,7,-8,8,-9,9,-10,10,-11,11,-12,12],Red:[-1,1,-2,2,-3,3,-4,4,-5,5,-6,6,-7,7,-8,8,-9,9,-10,10,-11,11,-12,12],Black:[-1,1,-2,2,-3,3,-4,4,-5,5,-6,6,-7,7,-8,8,-9,9,-10,10,-11,11,-12,12]};

// Run Game

$(".btn-start").click(function(){
    let gameType = this.value;
    let levelSelector=this.innerText;
    console.log(levelSelector);
    console.log(gameType);
    //runGame(gameType);
});
/*
function runGame(gameType,difficulty){
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    let num1 = Math.ceil(Math.random() * 12) * (Math.round(Math.random()) ? 1 : -1);
    let num2 = difficulty[Math.floor(Math.random() * level.length)]; //if 1st btn is pressed, choose random number from 1st array in difficulty variable.

    if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else if (gameType === "mixture" ) {
        displayMixtureQuestion(num1, num2)
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
};

// Submit Answer
${'#btn-submit').click(function(){
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
    let isCorrect = userAnswer === calculatedAnswer[0];
    
    if (isCorrect) {
        incrementCorrect();
    } else {
        incrementIncorrect();
    }

    runGame(calculatedAnswer[1]);

}

function calculateCorrectAnswer(){
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else if (operator ==="MULTIPLY"){
        return [operand1 * operand2, "mixture"];
    } else if (operator ==="DIVIDE"){
        return [operand1 / operand2, "mixture"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
};

function incrementCorrect(){
    let oldCorrect = parseInt(document.getElementById("correct").innerText);
    document.getElementById("correct").innerText = ++oldCorrect;
    $('#answer-box').css("background-color","green");
};

function incrementIncorrect(){
    let oldIncorrect = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldIncorrect;
    $('#answer-box').css("background-color","red");
};

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
function displayMixtureQuestion(operand1, operand2) {
    let chosenOperator=Math.random();
    if (chosenOperator<0.5){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "MULTIPLY";
    } else {
    document.getElementById("operand1").textContent = operand2 * Math.floor(Math.random() * 25 -12);
    document.getElementById("operand2").textContent = operand2;
	document.getElementById("operator").textContent = "DIVIDE";
    }
}

*/