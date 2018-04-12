function GameObject (name, avatar, xCoordinate, yCoordinate, type, target, direction) {
  this.name = name;
  this.avatar = "kayl-img/" + avatar;
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.enemyType = type;
  this.enemyTarget = target;
  this.enemyDirection;
}

function coinFlip() {
  return Math.floor(Math.random() * 2);
}

function movePattern (enemy, type, target, counter) {
  if (type === "horizontal") {
    moveNpcHorizontal(enemy);
  } else if (type === "vertical") {
    moveNpcVertical(enemy);
  } else if (type === "patrol") {
    moveNpcPatrol(enemy);
  } else if (type === "hunter") {
    if(counter%2 === 0){
      moveNpcHunter(enemy, target);
    }
  }
}

function moveNpcHunter(enemy, target) {
  var xDistance = target.xCoordinate - enemy.xCoordinate;
  var yDistance = target.yCoordinate - enemy.yCoordinate;
  if (Math.abs(xDistance) > Math.abs(yDistance)) {
    if (xDistance > 0) {
      if (notABarrier(enemy, "right") && notAWall(enemy, "right")) {
        enemy.xCoordinate += 1;
      } else if (yDistance >= 0 && notABarrier(enemy, "down") && notAWall(enemy, "down")) {
        enemy.yCoordinate += 1;
      } else if (yDistance >= 0 && notABarrier(enemy, "up") && notAWall(enemy, "up")) {
        enemy.yCoordinate -= 1;
      }
    } else if (xDistance < 0) {
      if (notABarrier(enemy, "left") && notAWall(enemy, "left")) {
        enemy.xCoordinate -= 1;
      } else if (yDistance >= 0 && notABarrier(enemy, "down") && notAWall(enemy, "down")) {
        enemy.yCoordinate += 1;
      } else if (yDistance >= 0 && notABarrier(enemy, "up") && notAWall(enemy, "up")) {
        enemy.yCoordinate -= 1;
      }
    }
  } else if (Math.abs(yDistance) > Math.abs(xDistance)) {
    if (yDistance > 0) {
      if (notABarrier(enemy, "down") && notAWall(enemy, "down")) {
        enemy.yCoordinate += 1;
      } else if (xDistance >= 0 && notABarrier(enemy, "right") && notAWall(enemy, "right")) {
        enemy.xCoordinate += 1;
      } else if (xDistance <= 0 && notABarrier(enemy, "left") && notAWall(enemy, "left")) {
        enemy.xCoordinate -= 1;
      }
    } else if (yDistance < 0) {
      if (notABarrier(enemy, "up") && notAWall(enemy, "up")) {
        enemy.yCoordinate -= 1;
      } else if (xDistance >= 0 && notABarrier(enemy, "right") && notAWall(enemy, "right")) {
        enemy.xCoordinate += 1;
      } else if (xDistance <= 0 && notABarrier(enemy, "left") && notAWall(enemy, "left")) {
        enemy.xCoordinate -= 1;
      }
    }
  } else {
    if (xDistance > 0) {
      if (notABarrier(enemy, "right") && notAWall(enemy, "right")) {
        enemy.xCoordinate += 1;
      } else if (yDistance >= 0 && notABarrier(enemy, "down") && notAWall(enemy, "down")) {
        enemy.yCoordinate += 1;
      } else if (Math.abs(yDistance) >= 0 && notABarrier(enemy, "up") && notAWall(enemy, "up")) {
        enemy.yCoordinate -= 1;
      }
    } else if (xDistance < 0) {
      if (notABarrier(enemy, "left") && notAWall(enemy, "left")) {
        enemy.xCoordinate -= 1;
      } else if (yDistance >= 0 && notABarrier(enemy, "down") && notAWall(enemy, "down")) {
        enemy.yCoordinate += 1;
      } else if (Math.abs(yDistance) >= 0 && notABarrier(enemy, "up") && notAWall(enemy, "up")) {
        enemy.yCoordinate -= 1;
      }
    }
  }
}

function moveNpcPatrol(enemy) {
  if (enemy.enemyDirection === "down") {
    if (enemy.yCoordinate < 5 && notABarrier(enemy, "down") && notAWall(enemy, "down")) {
      enemy.yCoordinate +=1;
    } else {
      enemy.enemyDirection = "left";
    }
  } else if (enemy.enemyDirection === "left") {
    if (enemy.xCoordinate > 0 && notABarrier(enemy, "left") && notAWall(enemy, "left")) {
      enemy.xCoordinate -=1;
    } else {
      enemy.enemyDirection = "up";
    }
  } else if (enemy.enemyDirection === "up") {
    if (enemy.yCoordinate > 0 && notABarrier(enemy, "up") && notAWall(enemy, "up")) {
      enemy.yCoordinate -=1;
    } else {
      enemy.enemyDirection = "right";
    }
  } else if (enemy.enemyDirection === "right") {
    if (enemy.xCoordinate < 5 && notABarrier(enemy, "right") && notAWall(enemy, "right")) {
      enemy.xCoordinate +=1;
    } else {
      enemy.enemyDirection = "down";
    }
  } else {
    enemy.enemyDirection = "left";
  }
}

function moveNpcHorizontal(enemy) {
  if (enemy.enemyDirection === "right") {
    if (enemy.xCoordinate < 5 && notAWall(enemy, "right") && notABarrier(enemy, "right")) {
      enemy.xCoordinate += 1;
    } else {
      enemy.xCoordinate -= 1;
      enemy.enemyDirection = "left";
    }
  } else {
    if (enemy.xCoordinate > 0 && notAWall(enemy, "left") && notABarrier(enemy, "left")) {
      enemy.xCoordinate -= 1;
    } else {
      enemy.xCoordinate += 1;
      enemy.enemyDirection = "right";
    }
  }
}

function moveNpcVertical(enemy) {
  if (enemy.enemyDirection === "down") {
    if (enemy.yCoordinate < 5 && notAWall(enemy, "down") && notABarrier(enemy, "down")) {
      enemy.yCoordinate += 1;
    } else {
      enemy.yCoordinate -= 1;
      enemy.enemyDirection = "up";
    }
  } else {
    if (enemy.yCoordinate > 0 && notAWall(enemy, "up") && notABarrier(enemy, "up")) {
      enemy.yCoordinate -= 1;
    } else {
      enemy.yCoordinate += 1;
      enemy.enemyDirection = "down";
    }
  }
}

function notABarrier(object, direction) {
  if (direction === "left") {
    if ($(".y" + object.yCoordinate + " .x" + (object.xCoordinate - 1)).attr('class').includes("barrier")) {
      return false;
    }
    return true;
  } else if (direction === "right") {
    if ($(".y" + object.yCoordinate + " .x" + (object.xCoordinate + 1)).attr('class').includes("barrier")) {
      return false;
    }
    return true;
  } else if (direction === "up") {
    if ($(".y" + (object.yCoordinate - 1) + " .x" + object.xCoordinate).attr('class').includes("barrier")) {
      return false;
    }
    return true;
  } else if (direction === "down") {
    if ($(".y" + (object.yCoordinate + 1) + " .x" + object.xCoordinate).attr('class').includes("barrier")) {
      return false;
    }
    return true;
  }
}

function notAWall(object, direction) {
  if (direction === "left") {
    if ($(".y" + object.yCoordinate + " .x" + object.xCoordinate).attr('class').includes("wall-left")) {
      return false;
    } else {
      return true;
    }
  } else if (direction === "right") {
    if ($(".y" + object.yCoordinate + " .x" + object.xCoordinate).attr('class').includes("wall-right")) {
      return false;
    } else {
      return true;
    }
  } else if (direction === "up") {
    if ($(".y" + object.yCoordinate + " .x" + object.xCoordinate).attr('class').includes("wall-up")) {
      return false;
    } else {
      return true;
    }
  } else if (direction === "down") {
    if ($(".y" + object.yCoordinate + " .x" + object.xCoordinate).attr('class').includes("wall-down")) {
      return false;
    } else {
      return true;
    }
  }
}

function powerUpCheck(player, powerUp){
  if(player.xCoordinate === powerUp.xCoordinate && player.yCoordinate === powerUp.yCoordinate){
    return true;
  } else{
    return false;
  }
}

function powerUpIncrease(player, powerUp, turnCounter, turnLimit){
  turnCounter -= 15;
  meter(turnCounter, turnLimit);
  return turnCounter;
}

// USER INTERFACE LOGIC
$(document).ready(function() {
  var turnCounter = 0;
  var turnLimit = 20;
  var gameObjects = [];
  var enemies = [];
  var rivalCounter = 0;
  var rivalMaximum = 1;
  var player = new GameObject("Player", "player.png", 0, 0, "none", "");
  var goal = new GameObject("Goal", "toilet.png", 9, 9, "none", "");
  var patrol = new GameObject("Patrol", "poop.png", 1, 4, "patrol", "");
  var hunter = new GameObject("Hunter", "hunter.gif", 5, 0, "hunter", player);
  var guard = new GameObject("Guard (vertical)", "cube.png", 3, 6, "vertical", "");
  var guard2 = new GameObject("Guard (horizontal)", "arrow.png", 5, 8, "horizontal");
  var powerUp = new GameObject("Power Up", "dice.png", 7, 9, "none");
  var rival = new GameObject("Rival", "peace.png", 5, 6, "hunter", goal);
  gameObjects.push(goal, player, patrol, hunter, guard, guard2, powerUp);
  enemies.push(patrol, hunter, guard, guard2);

  function triggerInterrupt(player, goal, enemies, turnCounter, turnLimit) {
    var interrupt = false;
    if (player.xCoordinate === goal.xCoordinate && player.yCoordinate === goal.yCoordinate) {
      $("#game-over h4").html("Whew, you win! Don't forget to flush.");
      $("#navigation").hide();
      $("#game-over").show();
      interrupt = true;
    } else if (turnCounter === turnLimit + 1) {
      $("#game-over h4").html("You ran out of time and had an accident.");
      $("#navigation").hide();
      $("#game-over").show();
      interrupt = true;
    }
    enemies.forEach(function(enemy) {
      if (player.xCoordinate === enemy.xCoordinate && player.yCoordinate === enemy.yCoordinate) {
        $("#game-over h4").html("You lose!");
        $("#navigation").hide();
        $("#game-over").show();
        interrupt = true;
      }
    });
    return interrupt;
  }

  function objectListing(objects) {
    objects.forEach(function(object) {
      $("ul#objectList").append(
        "<li>" +
          object.name +
          "<br>" +
          "<img src='" + object.avatar + "' alt='" + object.name + "'>" +
        "</li>"
      );
    });
  }

  function positionGameObjects(gameObjects) {
    $("td").text("");
    gameObjects.forEach(function(element) {
      console.log(element);
      $(".y" + element.yCoordinate + " .x" + element.xCoordinate).html("<img src='" + element.avatar + "'>");
    });
  }

  function meter(turnCounter, turnLimit) {
    var percentileWidth = turnCounter / turnLimit * 100;
    if (percentileWidth >= 40 && percentileWidth < 70) {
      $("#meter").addClass("warning");
    } else if (percentileWidth >= 70) {
      $("#meter").addClass("danger");
    }
    $("#meter").width(percentileWidth + "%");
  }

  objectListing(gameObjects);
  positionGameObjects(gameObjects);

  function  rivalAppearance(rival, rivalCounter, rivalMaximum) {
    gameObjects.push(rival);
    enemies.push(rival);
    positionGameObjects(gameObjects);
    rivalCounter++;
    rivalMaximum++;
  }

  function progressTurn() {
    positionGameObjects(gameObjects);
    if (triggerInterrupt(player, goal, enemies, turnCounter, turnLimit) === false) {
      enemies.forEach(function(enemy, turnCounter){
        movePattern(enemy, enemy.enemyType, enemy.enemyTarget, turnCounter);
      });
      positionGameObjects(gameObjects);
    }
    if (powerUpCheck(player, powerUp)) {
     turnCounter = powerUpIncrease(player, powerUp, turnCounter, turnLimit);
     gameObjects.splice(powerUp, 0);
     powerUp.xCoordinate = "";
     powerUp.yCoordinate = "";
     positionGameObjects(gameObjects);
    }
    if (rivalCounter < rivalMaximum && turnCounter === 5) {
      rivalAppearance();
    }
    turnCounter ++;
    meter(turnCounter, turnLimit);
    triggerInterrupt(player, goal, enemies, turnCounter, turnLimit);
  }

  function playerMove(direction) {
    if (direction === "left") {
      if (player.xCoordinate > 0 && notAWall(player, "left") && notABarrier(player, "left")) {
        player.xCoordinate = player.xCoordinate - 1;
      }
    } else if (direction === "right") {
      if (player.xCoordinate < 9 && notAWall(player, "right") && notABarrier(player, "right")) {
        player.xCoordinate = player.xCoordinate + 1;
      }
    } else if (direction === "up") {
      if (player.yCoordinate > 0 && notAWall(player, "up") && notABarrier(player, "up")) {
        player.yCoordinate = player.yCoordinate - 1;
      }
    } else if (direction === "down") {
      if (player.yCoordinate < 9 && notAWall(player, "down") && notABarrier(player, "down")) {
        player.yCoordinate = player.yCoordinate + 1;
      }
    }
    progressTurn();
  }

  // Mouse Navigation
  $("#navigation button").click(function() {
    var playerDirection = $(this).attr("id");
    playerMove(playerDirection);
  });

  // Arrow Key Navigation
  $(document).keydown(function(e){
    if (triggerInterrupt(player, goal, enemies, turnCounter, turnLimit)) {
      return;
    } else if (e.keyCode === 65) {
       playerMove("left")
    } else if (e.keyCode === 68) {
       playerMove("right")
    } else if (e.keyCode === 87) {
       playerMove("up")
    } else if (e.keyCode === 83) {
       playerMove("down")
    }
  });

  $("#restart").click(function() {
    location.reload();
  });
});
