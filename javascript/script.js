// script.js
$(document).ready(function () {
    const diceImages = [
        "./images/dice1.png",
        "./images/dice2.png",
        "./images/dice3.png",
        "./images/dice4.png",
        "./images/dice5.png",
        "./images/dice6.png",
    ];

    let playerScore = 0;
    let computerScore = 0;
    let rolls = 0;

    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function calculateScore(die1, die2) {
        if (die1 === 1 || die2 === 1) return 0;
        if (die1 === die2) return (die1 + die2) * 2;
        return die1 + die2;
    }

    function updateDiceImages(player, die1, die2) {
        $(`#${player}-die1`).attr("src", diceImages[die1 - 1]);
        $(`#${player}-die2`).attr("src", diceImages[die2 - 1]);
    }

    $("#roll-dice").on("click", function () {
        if (rolls < 3) {
            rolls++;

            const playerDie1 = rollDice();
            const playerDie2 = rollDice();
            const computerDie1 = rollDice();
            const computerDie2 = rollDice();

            const playerRoundScore = calculateScore(playerDie1, playerDie2);
            const computerRoundScore = calculateScore(computerDie1, computerDie2);

            playerScore += playerRoundScore;
            computerScore += computerRoundScore;

            updateDiceImages("player", playerDie1, playerDie2);
            updateDiceImages("computer", computerDie1, computerDie2);

            $("#player-score").text(`Player Score: ${playerScore}`);
            $("#computer-score").text(`Computer Score: ${computerScore}`);

            if (rolls === 3) {
                const winner =
                    playerScore > computerScore
                        ? "Player wins!"
                        : playerScore < computerScore
                        ? "Computer wins!"
                        : "It's a tie!";
                $("#winner-message").text(winner).css("font-weight", "bold");
            }
        }
    });

    $("#reset-game").on("click", function () {
        playerScore = 0;
        computerScore = 0;
        rolls = 0;

        $("#player-score").text("Player Score: 0");
        $("#computer-score").text("Computer Score: 0");
        $("#winner-message").text("");

        updateDiceImages("player", 1, 1);
        updateDiceImages("computer", 1, 1);
    });
});
