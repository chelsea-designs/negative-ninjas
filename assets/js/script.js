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
let gwregysPresennol;
let ninjaNoise = new Audio("assets/audio/ninja-noise.wav");
let dragonNoise = new Audio("assets/audio/fire-noise.wav");

$(".game-area").hide();
$("#ninja-star").hide();
$("#fire-ball").hide();
$("#btn-help").hide();
$("#btn-home").hide();

//Initialise tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

//Run tour
$("#btn-help").click(function(){
    introJs().start();
});

// Language Switcher
$(".cy").hide();
$('#btn-lang').click(function() {
    $(".cy").toggle();
    $(".en").toggle();
});

// Dark Mode
$('#btn-dark').change(function() {
    $('body').toggleClass("dark-theme");
});

function resetGame(){
    document.getElementById("dragon-progress").style.width=100+"%";
    document.getElementById("ninja-progress").style.width=100+"%";
    $('#ninja-progress').removeClass("bg-warning").removeClass("bg-danger").addClass("bg-success");
    $('#dragon-progress').removeClass("bg-warning").removeClass("bg-danger").addClass("bg-success");
    document.getElementById("correct").innerHTML = 0;
    document.getElementById("incorrect").innerHTML = 0;
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();
};

// Run Game
$(".btn-start").click(function(){
    beltNumber=parseInt($("input:radio[name ='level']:checked").val());
    startGame();
});
    
function startGame(){
    currentBelt = difficulty[beltNumber].colour;
    gwregysPresennol = difficulty[beltNumber].lliw;
    let multipliers = difficulty[beltNumber].timesTables; // retrieves multipliers for chosen difficulty
    let gameType = difficulty[beltNumber].gameOperator; // retrieves operator for chosen difficulty level
    document.getElementById('current-belt').innerHTML = currentBelt; // updates the dom with chosen level from button text; 
    document.getElementById('gwregys-presennol').innerHTML = gwregysPresennol;
    $(".game-area").show();
    $("#btn-help").show();
    $("#btn-home").show();
    $(".game-intro").hide();
    $('#settingsModal').modal('hide');
    // change image
    $("#ninja-img").attr('src', `assets/images/ninja${beltNumber}.png`);
    $("#dragon-img").attr('src', `assets/images/dragon${beltNumber}.png`);
    resetGame();
    newQuestion(gameType,multipliers);
};

function newQuestion(gameType,multipliers){
    //reset
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    //generate questions
    let num1 = Math.ceil(Math.random() * 12) * (Math.round(Math.random()) ? 1 : -1); // random number between -12 and 12 exc zero.
    let num2 = multipliers[Math.floor(Math.random() * multipliers.length)]; // Generate random number from the array associated with game type i.e. if 1st btn is pressed, choose random number from index 0 - change this 0.

    switch (gameType){
        case "multiply":
            displayMultiplyQuestion(num1,num2);
            break;
        case "division":
            displayDivisionQuestion(num1,num2);
            break;
        case "mixture":
            let chosenOperator=Math.random();
            if (chosenOperator<0.5){
                displayMultiplyQuestion(num1, num2);
            } else {
                displayDivisionQuestion(num1, num2);
            }
            break;
        default:
            alert(`Unknown game type: ${gameType}`);
            throw `Unknown game type: ${gameType}. Aborting!`;
    }
};

// Submit Answer
$('#btn-submit').click(checkAnswer);
$("#answer-box").keydown(function(event) {
    if (event.key === "Enter" && $(this).val().length !=0) {
        $('#btn-submit').attr('disabled', false);  
        checkAnswer();
    }else{
        $('#btn-submit').attr('disabled', false);  
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

    switch (operator){
        case "x":
            return operand1 * operand2;
            break;
        case "\u00F7":
            return operand1 / operand2;
            break;
        default:
            alert(`Unimplemented operator ${operator}`);
            throw `Unimplemented operator ${operator}. Aborting!`;
    }
};

function incrementCorrect(){
    let oldCorrect = parseInt(document.getElementById("correct").innerText);
    document.getElementById("correct").innerText = ++oldCorrect;
    formatCorrectAnswer();
    ninjaShoots();
};
function formatCorrectAnswer(){
    $('#answer-box').css("background-color","green");
    setTimeout(function() {
        $('#answer-box').css("background-color","white");
    }, 250);
};

function incrementIncorrect(){
    let oldIncorrect = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldIncorrect;
    formatIncorrectAnswer()
    dragonShoots();
};

function formatIncorrectAnswer(){
    $('#answer-box').css("background-color","red");
    setTimeout(function() {
        $('#answer-box').css("background-color","white");
    }, 500);
};

// Replay
function replayLevel(){
    //reset
    resetGame();
    // modal
    $('#replayModal').modal('toggle');
    // run game
    startGame();
};

// Next Level
function nextLevel(){
    resetGame();
    // modal
    $('#nextModal').modal('toggle');
    document.getElementById('belt-modal').innerHTML = currentBelt;
    document.getElementById('gwregys-modal').innerHTML = gwregysPresennol;
    beltNumber++;
    $(".ninja-img-modal").attr('src', `assets/images/ninja${beltNumber}.png`);
    currentBelt = difficulty[beltNumber].colour;
    gwregysPresennol = difficulty[beltNumber].lliw;
    document.getElementById('current-belt').innerHTML = currentBelt;
    document.getElementById('gwregys-presennol').innerHTML = gwregysPresennol;
    startGame();
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
    if ($('#btn-sound').is(':checked')){
        dragonNoise.play();
    }else{
    }     
    let ninjaHealth = parseInt(document.getElementById("ninja-progress").style.width);
    if(ninjaHealth>10){
        $('#ninja-progress').removeClass("bg-success").addClass("bg-warning");
        ninjaHealth -= 10;
        document.getElementById("ninja-progress").style.width=ninjaHealth+"%";
        newQuestion(difficulty[beltNumber].gameOperator,difficulty[beltNumber].timesTables); 
    } else {
        ninjaHealth -= 10;
        document.getElementById("ninja-progress").style.width=ninjaHealth+"%";
        $('#ninja-progress').removeClass("bg-warning").addClass("bg-danger");
        setTimeout(replayLevel, 1000);
    }                
};

function ninjaShoots() {
    $('#ninja-star').show().css({ 'right': '', 'left': '0px' }).animate({
        'left' : '110%'
    });        
    if ($('#btn-sound').is(':checked')){
        ninjaNoise.play();
    }else{
    }   
    let dragonHealth = parseInt(document.getElementById("dragon-progress").style.width);
    if(dragonHealth>10){
        $('#dragon-progress').removeClass("bg-success").addClass("bg-warning");
        dragonHealth -= 10;
        document.getElementById("dragon-progress").style.width=dragonHealth+"%";
        newQuestion(difficulty[beltNumber].gameOperator,difficulty[beltNumber].timesTables); 
    } else {
        dragonHealth -= 10;
        document.getElementById("dragon-progress").style.width=dragonHealth+"%";
        $('#dragon-progress').removeClass("bg-warning").addClass("bg-danger");
        beltNumber==maxBeltNumber ? setTimeout(win(), 1000) : setTimeout(nextLevel, 1000);
    }      
};

// Win
function win(){
    if ($('#btn-sound').is(':checked')){
        $('#winModal').modal('toggle');
        let themeSong = new Audio("assets/audio/theme-song.wav");
        themeSong.play();
    }else{
        $('#winModal').modal('toggle');
    }
};

$("#btn-home").click(function(){
    $(".game-area").hide();
    $(".game-intro").show();
    $('#settingsModal').modal('show');
    $("#btn-help").hide();
    $("#btn-home").hide();
    document.getElementById("dragon-progress").style.width=100+"%";
    document.getElementById("ninja-progress").style.width=100+"%";
    $('#ninja-progress').removeClass("bg-warning").removeClass("bg-danger").addClass("bg-success");
    $('#dragon-progress').removeClass("bg-warning").removeClass("bg-danger").addClass("bg-success");
    document.getElementById("correct").innerHTML = 0;
    document.getElementById("incorrect").innerHTML = 0;
});

$("#btn-end").click(function(){
    $('#winModal').modal('toggle');
    $(".game-area").hide();
    $(".game-intro").show();
    $('#settingsModal').modal('show');
    $("#btn-help").hide();
    $("#btn-home").hide();
    document.getElementById("dragon-progress").style.width=100+"%";
    document.getElementById("ninja-progress").style.width=100+"%";
    $('#ninja-progress').removeClass("bg-warning").removeClass("bg-danger").addClass("bg-success");
    $('#dragon-progress').removeClass("bg-warning").removeClass("bg-danger").addClass("bg-success");
    document.getElementById("correct").innerHTML = 0;
    document.getElementById("incorrect").innerHTML = 0;
});

/* Empty Input */
$(document).ready(function(){
    $('#settingsModal').modal('show');
    $('#btn-submit').attr('disabled',true);
    $('#answer-box').keyup(function(){
        if($(this).val().length !=0)
            $('#btn-submit').attr('disabled', false);            
        else
            $('#btn-submit').attr('disabled',true);
    });
});

// Issues
//If answering very quickly audio doesn't play twice
//rescale and reposition on devices