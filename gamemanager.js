//Store the chosen classtype
let GameManager = {
    setGameStart: function (classType) {
        this.resetPlayer(classType);
        this.setPreFight();
    },

    //Choose a class with the given stats with the stored classType
    resetPlayer: function (classType) {
        switch (classType) {
            case "Warrior":
                player = new Player(classType, 300, 0, 150, 50, 50);
                break;

            case "Rogue":
                player = new Player(classType, 200, 0, 40, 210, 200);
                break;

            case "Mage":
                player = new Player(classType, 100, 300, 0, 10, 5);
                break;

            case "Hunter":
                player = new Player(classType, 250, 0, 100, 150, 130);
                break;
        }

        //Load the players class' img and stats
        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML =
            '<img src="' + classType.toLowerCase() + '.png" class="img-avatar"><div><h3>' + classType +
            '</h3><p class="health-player">Health:'
            + player.health +
            '<p><p>Mana:'
            + player.mana +
            '</p><p>Strength:'
            + player.strength +
            '</p><p>Agility:'
            + player.agility +
            '</p><p>Speed:'
            + player.speed +
            '</p></div>';
    },

    //change the content of the given divs
    setPreFight: function () {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getArena = document.querySelector(".arena");

        getHeader.innerHTML = '<p>Task: Find an enemy!</p>';
        getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="GameManager.setFight()">Search for an enemy!</a>';
        getArena.style.visibility = "visible";
    },

    //change the content of the given divs
    setFight: function () {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getEnemy = document.querySelector(".enemy");

        //create enemies
        let enemy00 = new Enemy("Goblin", 150, 0, 50, 40, 80);
        let enemy01 = new Enemy("Gnome", 100, 20, 10, 120, 140);

        //choose a nmb between 0 and 1 to randomly choose an enemy
        let chooseRandomEnemy = Math.floor(Math.random() * Math.floor(2));
        switch (chooseRandomEnemy) {
            case 0:
                enemy = enemy00;
                break;
            case 1:
                enemy = enemy01;
                break;
        }

        //change the content of the given divs
        getHeader.innerHTML = '<p>Task: Choose your move</p>';
        getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="playerMoves.calcAttack()">Attack!</a></br><a href="#" class="btn-prefight" onclick="playerMoves.concede()">Concede!</a>';

        //Load the enemy's class' img and stats
        getEnemy.innerHTML =
            '<img src="' + enemy.enemyType.toLowerCase() + '.png" class="img-avatar" alt="enemy"><div><h3>' + enemy.enemyType +
            '</h3><p class="health-enemy">Health:'
            + enemy.health +
            '<p><p>Mana:'
            + enemy.mana +
            '</p><p>Strength:'
            + enemy.strength +
            '</p><p>Agility:'
            + enemy.agility +
            '</p><p>Speed:'
            + enemy.speed +
            '</p></div>';

    }
}