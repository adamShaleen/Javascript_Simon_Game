// User Story: I am presented with a random series of button presses.
// User Story: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
// User Story: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
// User Story: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
// User Story: I can see how many steps are in the current series of button presses.
// User Story: If I want to restart, I can hit a button to do so, and the game will return to a single step.
// User Story: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
// User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

$(document).ready(function() {

    $('.gameplayButton').off();
    $('#startButton').click(function() {
        gameOn = !gameOn;
        $(this).toggleClass('buttonOn');
        if (gameOn) {
            startGame();
        } else {
            resetGame();
        }
    });

    $('#strictButton').click(function() {
        strictMode = !strictMode;
        $(this).toggleClass('buttonOn');
    });

    // $('.gameplayButton').click(function() {
    //     let clickedButton = gameplayButtons[$(this).attr('id')];
    //     lightAndSoundGameplayButton(clickedButton);
    // });

    // clicking the start button (without strict)
    // creates a sequence of a 20 button order
    // current index is established (how many moves to play)
    // increments display count
    // computer plays sequence of current index
    // player attempts sequence
        // if correct -> current index increases + increments display count.  Computer plays increased sequence. Repeat
        // if incorrect -> buzzer sounds + computer plays same sequence. Repeat

    // clicking the start button (with strict)
    // creates a sequence of a 20 button order
    // increments display count
    // current index is established (how many moves to play)
    // computer plays sequence of current index
    // player attempts sequence
        // if correct -> current index increases + increments display count.  Computer plays increased sequence. Repeat
        // if incorrect -> buzzer sounds + display count returns to 1 + new sequence of 20 button order is created. current index is reset to first position. Computer plays sequence of current index
});

// Utilities
//=============================================================================

// External Audio files
let greenAudio = document.createElement("audio");
greenAudio.setAttribute("src", "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
let yellowAudio = document.createElement("audio");
yellowAudio.setAttribute("src", "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
let blueAudio = document.createElement("audio");
blueAudio.setAttribute("src", "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
let redAudio = document.createElement("audio");
redAudio.setAttribute("src", "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
let wrongAudio = document.createElement("audio");
wrongAudio.setAttribute("src", "http://www.orangefreesounds.com/wp-content/uploads/2014/08/Wrong-answer-sound-effect.mp3?_=1");

function GamePlayButton(name, pathId, color, clickedColor, audio) {
    this.name = name;
    this.pathId = pathId;
    this.color = color;
    this.clickedColor = clickedColor;
    this.audio = audio;
}

let greenButton = new GamePlayButton('greenButton', '#path-1', '#00C513', '#05ff1d', greenAudio);
let yellowButton = new GamePlayButton('yellowButton', '#path-2', '#FFE500', '#ff9900', yellowAudio);
let blueButton = new GamePlayButton('blueButton', '#path-3', '#0900b1', '#005CFF', blueAudio);
let redButton = new GamePlayButton('redButton', '#path-4', '#FF0000', '#fb52cc', redAudio);
let gameplayButtons = {greenButton: greenButton, yellowButton: yellowButton, blueButton: blueButton, redButton: redButton};
const gameplayButtonsArrary = [greenButton, yellowButton, blueButton, redButton];

let buttonSequence = [];
let index;
let countDisplay = 0;
let gameOn = false;
let strictMode = false;

function startGame() {
    setButtonSequence();
    index = 0;
    computerPlaysSequence();
}

function computerPlaysSequence() {
    incrementCountDisplay();
    for (let i = 0; i <= 0; i++) {
        lightAndSoundGameplayButton(buttonSequence[i]);
        // TODO pause before playing next button
    }
    playerAttemptsSequence();
}

function playerAttemptsSequence() {

    $('.gameplayButton').click(function() {

        // player chooses wrong button
        if (!$(this).attr('name') === buttonSequence[index].name) {
            console.log('wrong button')
            wrongAudio.load();
            wrongAudio.play();
        } else {
            let clickedButton = gameplayButtons[$(this).attr('id')];
            lightAndSoundGameplayButton(clickedButton);
        }

        // player finishes sequence correctly
        if (index === 20) {
            // you win, reset everything and do something that indicates player won
        }

        incrementIndex();
        computerPlaysSequence();
    });
}

function incrementIndex() {
    index++;
}

function incrementCountDisplay() {
    countDisplay++;
    $('#countDisplay').text(countDisplay);
}

function setButtonSequence() {
    for (let i = 0; i < 20; i++) {
        buttonSequence.push(gameplayButtonsArrary[Math.floor(Math.random()*4)]);
    }
}

function lightAndSoundGameplayButton(clickedButton) {

    let button = gameplayButtons[clickedButton.name];

    button.audio.load();
    button.audio.play();

    $(button.pathId).css({fill : button.clickedColor});
    setTimeout(setColor, 400);

    function setColor() {
        $(button.pathId).css({fill : button.color});
    }
};

function resetGame() {
    buttonSequence = [];
    countDisplay = 0;
    gameOn = false;
    strictMode = false;
    $('#countDisplay').text(countDisplay);
    $('#strictButton').removeClass('buttonOn');
}
