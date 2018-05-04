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
        startGame();
    });

    $('.gameplayButton').click(function() {
        playerClicksButton(this);
    });

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

// Gameplay Button Schema
function GamePlayButton(name, pathId, normalColor, inPlayColor, audio) {
    this.name = name;
    this.pathId = pathId;
    this.normalColor = normalColor;
    this.inPlayColor = inPlayColor;
    this.audio = audio;
}

// Gameplay Button Attributes
let greenButton = new GamePlayButton('greenButton', '#path-1', '#00C513', '#05ff1d', greenAudio);
let yellowButton = new GamePlayButton('yellowButton', '#path-2', '#FFE500', '#ff9900', yellowAudio);
let blueButton = new GamePlayButton('blueButton', '#path-3', '#0900b1', '#005CFF', blueAudio);
let redButton = new GamePlayButton('redButton', '#path-4', '#FF0000', '#fb52cc', redAudio);
let allGameplayButtons = {greenButton: greenButton, yellowButton: yellowButton, blueButton: blueButton, redButton: redButton};

// Globals
const buttonsArr = [greenButton, yellowButton, blueButton, redButton];
let buttonOrder = [];
let currentSequence = [];
let playerSequence = [];
let roundCount = 0;
let sequenceInterval = 0;

function startGame() {
    createButtonOrder();
    computerPlaysCurrentSequence();
}

function computerPlaysCurrentSequence() {
    getCurrentSequence();
    increaseCountDisplay();

    // computer makes series of moves between 1-20 depending on which roundCount the game is on
    for (let i = 0; i < currentSequence.length; i++) {
        lightAndSoundGameplayButton(currentSequence[i]);
        // TODO some kind of pause in between each button play
    }
}

function playerClicksButton(button) {
    playerSequence.push($(button).attr('id'));

    if (!isButtonCorrect()) {

        // TODO Pause
        computerPlaysCurrentSequence();
    }

    // TODO Pause in between checking for the correct button and end of sequence

    if (isEndOfSequence()) {
        increaseCountDisplay();
    }
}

function isButtonCorrect() {
    // check if button played was correct in currentSequence
    if (playerSequence[sequenceInterval] === currentSequence[sequenceInterval].name) {
        lightAndSoundGameplayButton(currentSequence[sequenceInterval]);
        sequenceInterval++;
        return true;
    } else {
        // play bad sounds, etc
        wrongAudio.load();
        wrongAudio.play();
        return false;
    }
}

function isEndOfSequence() {
    if (playerSequence.length === currentSequence.length) {
        return true;
    }

    return false;
}

// Create a random order of 20 moves
function createButtonOrder() {
    for (let i = 0; i < 20; i++) {
        buttonOrder.push(buttonsArr[Math.floor(Math.random()*4)]);
    }
};

// Get currentSequence for computer to use and for player to match
function getCurrentSequence() {
    for (let i = 0; i <= roundCount; i++) {
        currentSequence.push(buttonOrder[i]);
    }
}

function increaseCountDisplay() {
    roundCount++;
    $('#countDisplay').text(roundCount);
}

function resetCountDisplay() {
    roundCount = 0;
    $('#countDisplay').text(roundCount);
}

function lightAndSoundGameplayButton(button) {

    let buttonAttributes = allGameplayButtons[button.name];
    let pathId = buttonAttributes.pathId;
    let buttonAudio = buttonAttributes.audio;

    buttonAudio.load();
    buttonAudio.play();

    $(pathId).css({fill : buttonAttributes.inPlayColor});
    setTimeout(setNormalColor, 400);

    function setNormalColor() {
        $(pathId).css({fill : buttonAttributes.normalColor});
    }
};
