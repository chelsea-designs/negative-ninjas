const difficulty = [{
        timesTables: [-2, 2, -10, 10],
        gameOperator: "multiply",
        colour: "white",
        lliw: "gwyn"
    },
    {
        timesTables: [-2, 2, -10, 10],
        gameOperator: "division",
        colour: "yellow",
        lliw: "melyn"
    },
    {
        timesTables: [-2, 2, -10, 10],
        gameOperator: "mixture",
        colour: "orange",
        lliw: "oren"
    },
    {
        timesTables: [-2, 2, -4, 4, -5, 5, -10, 10],
        gameOperator: "multiply",
        colour: "green",
        lliw: "gwyrdd"
    },
    {
        timesTables: [-2, 2, -4, 4, -5, 5, -10, 10],
        gameOperator: "division",
        colour: "purple",
        lliw: "piws"
    },
    {
        timesTables: [-2, 2, -4, 4, -5, 5, -10, 10],
        gameOperator: "mixture",
        colour: "blue",
        lliw: "glas"
    },
    {
        timesTables: [-1, 1, -2, 2, -3, 3, -4, 4, -5, 5, -6, 6, -7, 7, -8, 8, -9, 9, -10, 10, -11, 11, -12, 12],
        gameOperator: "multiply",
        colour: "brown",
        lliw: "brown"
    },
    {
        timesTables: [-1, 1, -2, 2, -3, 3, -4, 4, -5, 5, -6, 6, -7, 7, -8, 8, -9, 9, -10, 10, -11, 11, -12, 12],
        gameOperator: "division",
        colour: "red",
        lliw: "coch"
    },
    {
        timesTables: [-1, 1, -2, 2, -3, 3, -4, 4, -5, 5, -6, 6, -7, 7, -8, 8, -9, 9, -10, 10, -11, 11, -12, 12],
        gameOperator: "mixture",
        colour: "black",
        lliw: "du"
    }
];
let beltNumber = 0;
const maxBeltNumber = 8;
let currentBelt;
let gwregysPresennol;
let ninjaNoise = new Audio("assets/audio/ninja-noise.wav");
let dragonNoise = new Audio("assets/audio/fire-noise.wav");

$(".battle_img--weapon").hide();
$('#modal_btn--return').hide();

//Run tour
$("#header_btn--help").click(function () {
    introJs().start();
});

// Language Switcher
$(".cy").hide();
$('#modal_btn--lang').click(function () {
    $(".cy").toggle();
    $(".en").toggle();
});

// Dark Mode
$('#modal_btn--dark').change(function () {
    $('body').toggleClass("theme--dark");
});

function resetGame() {
    $(".progress-bar").css('width', '100%');
    $(".progress-bar").attr("aria-valuenow", 100);
    $('.progress-bar').removeClass("bg-warning").removeClass("bg-danger").addClass("bg-success");
    $(".progress-bar").html(100);
    $("#questions_input").val("");
    $("#questions_input").focus();
}

$(".btn-start").click(function () {
    beltNumber = parseInt($("input:radio[name ='level']:checked").val());
    startGame();
});

function startGame() {
    currentBelt = difficulty[beltNumber].colour;
    gwregysPresennol = difficulty[beltNumber].lliw;
    let multipliers = difficulty[beltNumber].timesTables;
    let gameType = difficulty[beltNumber].gameOperator;
    $('#current-belt').html(currentBelt);
    $('#gwregys-presennol').html(gwregysPresennol);
    $('#modal--settings').modal('hide');
    $("#battle_img--ninja").attr('src', `assets/images/ninja${beltNumber}.png`);
    $("#battle_img--dragon").attr('src', `assets/images/dragon${beltNumber}.png`);
    resetGame();
    newQuestion(gameType, multipliers);
}

function newQuestion(gameType, multipliers) {
    $("#questions_input").val("");
    $("#questions_input").focus();

    let num1 = Math.ceil(Math.random() * 12) * (Math.round(Math.random()) ? 1 : -1); // random number between -12 and 12 exc zero.
    let num2 = multipliers[Math.floor(Math.random() * multipliers.length)]; // Generate random number from the array associated with game type i.e. if 1st btn is pressed, choose random number from index 0

    switch (gameType) {
        case "multiply":
            displayQuestion(num1, num2, "x");
            break;
        case "division":
            displayQuestion(num1 * num2, num2, "\u00F7");
            break;
        case "mixture":
            let chosenOperator = Math.random();
            if (chosenOperator < 0.5) {
                displayQuestion(num1, num2, "x");
            } else {
                displayQuestion(num1 * num2, num2, "\u00F7");
            }
            break;
        default:
            alert(`Unknown game type: ${gameType}`);
            throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

$('.questions_submit').click(checkAnswer);
$("#questions_input").keydown(function (event) {
    if (event.key === "Enter" && $(this).val().length != 0) {
        $('.questions_submit').attr('disabled', false);
        checkAnswer();
    } else {
        $('.questions_submit').attr('disabled', false);
    }
});


function checkAnswer() {
    let userAnswer = parseInt($("#questions_input").val());
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer;

    if (isCorrect) {
        ninjaShoots();
    } else {
        dragonShoots();
    }
}

function calculateCorrectAnswer() {
    let operand1 = parseInt($('#questions_operand--one').text());
    let operand2 = parseInt($('#questions_operand--two').text());
    let operator = $('#questions_operator').text();

    switch (operator) {
        case "x":
            return operand1 * operand2;
        case "\u00F7":
            return operand1 / operand2;
        default:
            alert(`Unimplemented operator ${operator}`);
            throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

function formatBox(highlightColour) {
    $('#questions_input').css("background-color", highlightColour);
    setTimeout(function () {
        $('#questions_input').css("background-color", "white");
    }, 250);
}

function replayLevel() {
    resetGame();
    $('#modal--replay').modal('toggle');
    startGame();
}

function nextLevel() {
    resetGame();
    $('#modal--next').modal('toggle');
    $('#belt-modal').html(currentBelt);
    $('#gwregys-modal').html(gwregysPresennol);
    beltNumber++;
    $("#ninja-win").attr('src', `assets/images/ninja${beltNumber}.png`);
    currentBelt = difficulty[beltNumber].colour;
    gwregysPresennol = difficulty[beltNumber].lliw;
    $('#current-belt').html(currentBelt);
    $('#gwregys-presennol').html(gwregysPresennol);
    startGame();
}

function displayQuestion(operand1, operand2, operation) {
    $('#questions_operand--one').text(operand1);
    $('#questions_operand--two').text(operand2);
    $('#questions_operator').text(operation);
}

function dragonShoots() {
    let oldIncorrect = parseInt($("#battle_progress--ninja").text());
    oldIncorrect -= 10;
    $("#battle_progress--ninja").text(oldIncorrect);

    formatBox("red");

    $('#battle_weapon--fire').show().css({
        'right': '0px',
        'left': ''
    }).animate({
        'right': '110%'
    });
    if ($('#modal_btn--sound').is(':checked')) {
        dragonNoise.play();
    } else {}
    let ninjaHealth = parseInt(document.getElementById("battle_progress--ninja").style.width);
    if (ninjaHealth > 10) {
        $('#battle_progress--ninja').removeClass("bg-success").addClass("bg-warning");
        ninjaHealth -= 10;
        document.getElementById("battle_progress--ninja").style.width = ninjaHealth + "%";
        $("#battle_progress--ninja").attr("aria-valuenow", ninjaHealth);
        newQuestion(difficulty[beltNumber].gameOperator, difficulty[beltNumber].timesTables);
    } else {
        ninjaHealth -= 10;
        document.getElementById("battle_progress--ninja").style.width = ninjaHealth + "%";
        $("#battle_progress--ninja").attr("aria-valuenow", ninjaHealth);
        $('#battle_progress--ninja').removeClass("bg-warning").addClass("bg-danger");
        setTimeout(replayLevel, 1000);
    }
}

function ninjaShoots() {
    let oldCorrect = parseInt($("#battle_progress--dragon").text());
    oldCorrect -= 10;
    $("#battle_progress--dragon").text(oldCorrect);

    formatBox("green");

    $('#battle_weapon--star').show().css({
        'right': '',
        'left': '0px'
    }).animate({
        'left': '110%'
    });
    if ($('#modal_btn--sound').is(':checked')) {
        ninjaNoise.play();
    } else {}
    let dragonHealth = parseInt(document.getElementById("battle_progress--dragon").style.width);
    if (dragonHealth > 10) {
        $('#battle_progress--dragon').removeClass("bg-success").addClass("bg-warning");
        dragonHealth -= 10;
        document.getElementById("battle_progress--dragon").style.width = dragonHealth + "%";
        $("#battle_progress--dragon").attr("aria-valuenow", dragonHealth);
        newQuestion(difficulty[beltNumber].gameOperator, difficulty[beltNumber].timesTables);
    } else {
        dragonHealth -= 10;
        document.getElementById("battle_progress--dragon").style.width = dragonHealth + "%";
        $("#battle_progress--dragon").attr("aria-valuenow", dragonHealth);
        $('#battle_progress--dragon').removeClass("bg-warning").addClass("bg-danger");
        beltNumber == maxBeltNumber ? setTimeout(win, 1000) : setTimeout(nextLevel, 1000);
    }
}

function win() {
    if ($('#modal_btn--sound').is(':checked')) {
        $('#modal--win').modal('toggle');
        let themeSong = new Audio("assets/audio/theme-song.wav");
        themeSong.play();
    } else {
        $('#modal--win').modal('toggle');
    }
}

$(".header_btn--home").click(function () {
    $('#modal--settings').modal('show');
    $('#modal_btn--return').show();
});

$("#modal_btn--return").click(function () {
    $('#modal--settings').modal('hide');
    $('#modal_btn--return').hide();
});

$("#modal_btn--end").click(function () {
    $('#modal--win').modal('toggle');
    $('#modal--settings').modal('show');
    $(".progress-bar").width(100 + "%");
    $(".progress-bar").attr("aria-valuenow", 100);
    $(".progress-bar").removeClass("bg-warning").removeClass("bg-danger").addClass("bg-success");
    $(".progress-bar").html(100);
});

/* Empty Input */
$(document).ready(function () {
    $('#modal--settings').modal('show');
    $('.questions_submit').attr('disabled', true);
    $('#questions_input').keyup(function () {
        if ($(this).val().length != 0)
            $('.questions_submit').attr('disabled', false);
        else
            $('.questions_submit').attr('disabled', true);
    });
});