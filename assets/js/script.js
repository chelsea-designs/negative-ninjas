// Language Switcher
$(".cy").hide();

$('#switch-lang').click(function() {
    $(".cy").toggle();
    $(".en").toggle();
});


// Multipliers
const difficulty=[
    {timesTables:[-2,2,-10,10],gameOperator:"multiply"},
    {timesTables:[-2,2,-10,10],gameOperator:"division"},
    {timesTables:[-2,2,-10,10],gameOperator:"mixture"},
    {timesTables:[-2,2,-4,4,-5,5,-10,10],gameOperator:"multiply"},
    {timesTables:[-2,2,-4,4,-5,5,-10,10],gameOperator:"division"},
    {timesTables:[-2,2,-4,4,-5,5,-10,10],gameOperator:"mixture"},
    {timesTables:[-1,1,-2,2,-3,3,-4,4,-5,5,-6,6,-7,7,-8,8,-9,9,-10,10,-11,11,-12,12],gameOperator:"multiply"},
    {timesTables:[-1,1,-2,2,-3,3,-4,4,-5,5,-6,6,-7,7,-8,8,-9,9,-10,10,-11,11,-12,12],gameOperator:"division"},
    {timesTables:[-1,1,-2,2,-3,3,-4,4,-5,5,-6,6,-7,7,-8,8,-9,9,-10,10,-11,11,-12,12],gameOperator:"mixture"}
];

// Run Game

$(".btn-start").click(function(){
    let buttonNumber = parseInt(this.getAttribute("data-value")); // retrieve index of button pressed
    let multipliers = difficulty[buttonNumber].timesTables; // retrieves multipliers for chosen difficulty
    let gameType = difficulty[buttonNumber].gameOperator; // retrieves operator for chosen difficulty level
    let currentBelt = this.innerText;
    document.getElementById('current-belt').innerHTML = currentBelt; // updates the dom with chosen level from button text
    runGame(gameType,multipliers);
});

function runGame(gameType,multipliers){
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

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
};
/*
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

    runGame(calculatedAnswer[1],multiplier);

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
*/
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
