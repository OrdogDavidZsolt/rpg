//declare player
let player;
let level=1;

function Player(classType, health, mana, strength, agility, speed) {
    this.classType = classType;
    this.health = health;
    this.mana = mana;
    this.strength = strength;
    this.agility = agility;
    this.speed = speed;
}


let playerMoves = {
    calcAttack: function () {
        //who attacks first? Depends on the amount of speed
        let getPlayerSpeed = player.speed;
        let getEnemySpeed = enemy.speed;

        //if player attacks
        let playerAttack = function () {

            //calculate damage if the class has mana
            let calcBaseDamage;
            if (player.mana > 0) {
                calcBaseDamage = player.strength * player.mana / 1000;
            }

            //calculate damage if the class doesn't have mana
            else {
                calcBaseDamage = player.strength * player.agility / 1000;
            }

            //create some plus random damage
            let offsetDamage = Math.floor(Math.random() * Math.floor(10));

            //get the output damage
            let calcOutputDamage = calcBaseDamage + offsetDamage;

            //generate the number of hits
            let numberOfHits = Math.floor(Math.random() * Math.floor(player.agility / 10) / 2) + 1;

            //array with the damage and number of hits
            let attackValues = [calcOutputDamage, numberOfHits];
            return attackValues;
        }

        //if enemy attacks
        let enemyAttack = function () {
            //calculate damage if the enemy has mana
            let calcBaseDamage;
            if (enemy.mana > 0) {
                calcBaseDamage = enemy.strength * enemy.mana / 1000;
            }

            //calculate damage if the enemy doesn't have mana
            else {
                calcBaseDamage = enemy.strength * enemy.agility / 1000;
            }

            //create some plus random damage
            let offsetDamage = Math.floor(Math.random() * Math.floor(10));

            //get the output damage
            let calcOutputDamage = calcBaseDamage + offsetDamage;

            //generate the number of hits
            let numberOfHits = Math.floor(Math.random() * Math.floor(enemy.agility / 10) / 2) + 1;

            //array with the damage and number of hits
            let attackValues = [calcOutputDamage, numberOfHits];
            return attackValues;
        }

        //get player's or enemy's health to change later
        let getPlayerHealth = document.querySelector(".health-player");
        let getEnemyHealth = document.querySelector(".health-enemy");

        //initiate attacks: player starts
        if (getPlayerSpeed >= getEnemySpeed) {
            let playerAttackValues = playerAttack();
            //count total damage
            let totalDamage = playerAttackValues[0] * playerAttackValues[1];
            //deal damage
            enemy.health = enemy.health - totalDamage;
            alert("Your turn: You hit " + playerAttackValues[0] + " damage " + playerAttackValues[1] + " times.");
            //check if the enemy died
            if (enemy.health <= 0) {
                alert("You won! Refresh the browser");
                getPlayerHealth.innerHTML = 'Health:' + player.health;
                getEnemyHealth.innerHTML = 'Health:0';
                let getActions = document.querySelector(".actions");
                getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="GameManager.setFight()">Search for an enemy!</a>';
                let getHeader = document.querySelector(".header");
                level++;
                getHeader.innerHTML = '<p>Task: Choose your move</p></br><p>Szint: '+level+'. szint</p>';                         
            }
            //if the enemy didn't die, it will attack now
            else {
                getEnemyHealth.innerHTML = 'Health: ' + enemy.health;
                //enemy Attacks
                let enemyAttackValues = enemyAttack();
                //count total damage
                let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];
                //deal damage
                player.health = player.health - totalDamage;
                alert("Enemy's turn: Enemy hit " + enemyAttackValues[0] + " damage " + enemyAttackValues[1] + " times.");
                //check if the player died
                if (player.health <= 0) {
                    alert("You lost! Refresh the browser");
                    getPlayerHealth.innerHTML = 'Health:0';
                    getEnemyHealth.innerHTML = 'Health:' + enemy.health;
                }
                else {
                    getPlayerHealth.innerHTML = 'Health:' + player.health;
                }
            }
        }
        
        //initiate attacks: enemy starts
        else if (getEnemySpeed >= getPlayerSpeed) {
            let enemyAttackValues = enemyAttack();
            //count total damage
            let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];
            //deal damage
            player.health = player.health - totalDamage;
            alert("Enemy hit " + enemyAttackValues[0] + " damage " + enemyAttackValues[1] + " times.");
            //check if the player died
            if (player.health <= 0) {
                alert("You lost! Refresh the browser");
                getEnemyHealth.innerHTML = 'Health:' + enemy.health;
                getPlayerHealth.innerHTML = 'Health:0';
            }
            //if the player didn't die it will attack now
            else {
                getPlayerHealth.innerHTML = 'Health:' + player.health;
                //Player Attacks
                let playerAttackValues = playerAttack();
                //count total damage
                let totalDamage = playerAttackValues[0] * playerAttackValues[1];
                //deal damage
                enemy.health = enemy.health - totalDamage;
                alert("You hit " + playerAttackValues[0] + " damage " + playerAttackValues[1] + " times.");
                //check if the enemy died
                if (enemy.health <= 0) {
                    alert("You won! Refresh the browser");
                    getEnemyHealth.innerHTML = 'Health:0';
                    getPlayerHealth.innerHTML = 'Health:' + player.health;
                    let getActions = document.querySelector(".actions");
                    getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="GameManager.setFight()">Search for an enemy!</a>';
                    let getHeader = document.querySelector(".header");
                    level++;
                    getHeader.innerHTML = '<p>Task: Choose your move</p></br><p>Szint: '+level+'. szint</p>';                  
                }
                else {
                    getEnemyHealth.innerHTML = 'Health:' + enemy.health;
                }
            }
        }
    },

    //choose a new character to play with
    concede: function(){
        alert("Fool!");
        location.href = "index.html";
    }
}