// User Story: I am presented with a random series of button presses.
// User Story: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
// User Story: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
// User Story: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
// User Story: I can see how many steps are in the current series of button presses.
// User Story: If I want to restart, I can hit a button to do so, and the game will return to a single step.
// User Story: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
// User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

$(document).ready(function() {

    $('.gameplayButton').click(function() {
        lightGameplayButton($(this));
    });

});

function lightGameplayButton(button) {
    var pressedButton = button.attr('id');
    var pathId = allGameplayButtons[pressedButton].pathId;
    console.log(pathId + ' ' + allGameplayButtons[pressedButton].inPlayColor);
    $(pathId).css({fill : allGameplayButtons[pressedButton].inPlayColor});
}

function GamePlayButton(gameplayButtonId, pathId, normalColor, inPlayColor) {
    this.gameplayButtonId = gameplayButtonId;
    this.pathId = pathId;
    this.normalColor = normalColor;
    this.inPlayColor = inPlayColor;
}

var greenButton = new GamePlayButton('#greenButton', 'path-1', '#00C513', '#05ff1d');
var yellowButton = new GamePlayButton('#yellowButton', 'path-2', '#FFE500', '#ebff00');
var blueButton = new GamePlayButton('#blueButton', 'path-3', '#005CFF', '#699fff');
var redButton = new GamePlayButton('#redButton', 'path-4', '#FF0000', '#ff004c');
var allGameplayButtons = {greenButton: greenButton, yellowButton: yellowButton, blueButton: blueButton, redButton: redButton};
