$(document).ready(function(){
    
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
    var opponent;
    // Chosen opponent 
    var chosenOpponent;
    // Tracks numbner of turns
    var turnCounter
    // Tracks number of opponents defeated
    var opponentsDefeated;

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
      }
    };

    // Running startGame()
    game.startGame();

    


  });
