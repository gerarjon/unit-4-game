$(document).ready(function(){
  // Function that hides the arena and opponent selection area
  $(".stage-container").hide();
  $(".opponent-selection-container").hide();
    // Characters //
    //-----------------------------------------------
    var characters = {
      "Puffy Pomeranian": {
        name: "Puffy Pomeranian",
        health: 200,
        attack: 5,
        imageUrl: "assets/images/pom-1.png",
        enemyAttack: 15,
      },

      "Lazy Labrador": {
        name: "Lazy Labrador",
        health: 100,
        attack: 21,
        imageUrl: "assets/images/lab-1.png",
        enemyAttack: 9,
      },

      "Busy Boxer": {
        name: "Busy Boxer",
        health: 150,
        attack: 10,
        imageUrl: "assets/images/boxer-1.png",
        enemyAttack: 8,
      },

      "Sneaky Shiba": {
        name: "Sneaky Shiba",
        health:  69,
        attack: 69,
        imageUrl: "assets/images/shiba-1.png",
        enemyAttack: 7,
      },
    };

    // Selected character
    var fighter;
    // Opponents to select
    var opponent = [];
    // The Selected opponent
    var chosenOpponent;
    // Tracks numbner of turns
    var turnCounter = 1;
    // Tracks number of opponents defeated
    var opponentsDefeated = 0;

    // Game object
    //--------------------------------------------------
    var game = {
      //Functions
      //------------------------------------------------
      // This function displays characters to the page 
      displayChar: function(character, displayArea) {
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charName = $("<div class='character-name'>").text(character.name);
        var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
        var charHealth = $("<div class='character-health'>").text("Health: " + character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(displayArea).append(charDiv);
      },

      // function that loops through chacters in characters object
      startGame: function() {
        for ( var key in characters ) {
          this.displayChar(characters[key], "#character-selection");
        }
      },

      // Function that updates selected fighter/defender.
      // Also chooses where the selected characters go to.
      updateCharacter: function(charObj, displayArea) {
        $(displayArea).empty();
        this.displayChar(charObj, displayArea);
      },

      // Function that displays opponents to select
      displayOpp: function(opponentArr) {
        for (var i = 0; i < opponentArr.length; i++) {
          this.displayChar(opponentArr[i], "#available-opponent-section");
        }
      },

      // Function that displays messages to the screen
      displayMessage: function(message) {
        var getMessage = $("#game-message");
        var writeMessage = $("<div>").text(message);
        getMessage.append(writeMessage);
      },

      // Function that restarts the game
      restart: function(message) {
        var restartGame = $("<button>Restart</button>").click(function() {
          location.reload();
        });
        var endMessage = $("<div>").text(message);

        // Adds the created functions above to the end of the page
        $("#game-message").append(endMessage);
        $("#game-message").append(restartGame);
      },

      // Function that clears in game messages
      clearMessage: function() {
        $("#game-message").text("");
      }
    };

    // Running startGame()
    game.startGame();

    // Click events for chosen fighter 
    var characterSelection = $("#character-selection");
    characterSelection.on("click", ".character", function() {
      var name = $(this).attr("data-name");
      //If player has not chosen the fighter
      if (!fighter) {
        fighter = characters[name];
        for (var key in characters) {
          // Push that fighter to the opponents array 
          if (key !== name) {
            opponent.push(characters[key]);
          }
        };
        // Hides the character select area
        $(".character-selection-container").hide();
        // Shows Opponent select area and the stage area
        $(".opponent-selection-container").show();
        game.updateCharacter(fighter, "#selected-character");
        // Applies original brightness to character
        $(".character-image").css({"filter": "brightness(100%)", "height": "50%", "width": "50%"});
        game.displayOpp(opponent);
      }
    });

    // Click event for opponent
    var enemySelection = $("#available-opponent-section");
    enemySelection.on("click", ".character", function() {
      var name = $(this).attr("data-name");
      // If there is no opponent, then the clicked enemy will become the opponent
      if ( $("#opponent").children().length === 0 ) {
        opponent = characters[name];
        game.updateCharacter(opponent, "#opponent");
        $(this).remove();
        game.clearMessage();
        $(".character-image").css({"filter": "brightness(100%)", "height": "50%", "width": "50%"})
        $(".opponent-selection-container").hide();
        $(".stage-container").show();
      }
    });

    // Function for when "attack" button is clicked
    $("#attack-button").on("click", function() {
      if ( $("#opponent").children().length !== 0 ) {
        var attackMessage = `${fighter.name} attacked ${opponent.name} for ${fighter.attack * turnCounter} damage!`;
        var counterAttackMessage = `${opponent.name} attacked back for ${opponent.enemyAttack} damage...`
        game.clearMessage();
        // Reduce opponent's health by fighter's attack value
        opponent.health -= fighter.attack * turnCounter;
        if (opponent.health > 0) {
          game.updateCharacter(opponent, "#opponent");
          $(".character-image").css({"filter": "brightness(100%)", "height": "50%", "width": "50%"});
          game.displayMessage(attackMessage);
          game.displayMessage(counterAttackMessage);
          // Reduce health by opponent's counter attack value
          fighter.health -= opponent.enemyAttack;
          game.updateCharacter(fighter, "#selected-character");
          $(".character-image").css({"filter": "brightness(100%)", "height": "50%", "width": "50%"});
          // If the player loses
          // call restart() 
          if (fighter.health <= 0) {
            game.clearMessage();
            game.restart("You lose. Game Over....");
            $("#attack-button").off("click");
          }
        } else {
          // If the enemy loses
          // remove the enemy from the arena
          $("#opponent").empty();
          var gameMessage = `You have slain ${opponent.name}. Choose a new opponent!`;
          game.displayMessage(gameMessage);
          opponentsDefeated++;
          $(".opponent-selection-container").show();
          // If all the opponents are defeated
          // call restart() to start the game again
          if (opponentsDefeated >= 3) {
            $(".opponent-selection-container").hide();
            game.clearMessage();
            $("#attack-button").css("visibility", "hidden");
            game.restart("You win!");
          }
        } 
        // Increase turnCounter by 1
        turnCounter++;
      } else {
        // If there is no enemy, display a message 
        game.clearMessage();
        game.displayMessage("Please pick an opponent");
      }
    });
  });
