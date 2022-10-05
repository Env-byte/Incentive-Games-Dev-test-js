// We import the object from the data file. Inside that object there is a function to get players data
const data = require("./data");

/**
 * Test 1
 * Write a function to log in the console the players data with this format:
 * PLAYER 1
 * NAME: Zinedine
 * LASTNAME: Zidane
 * POSITION: Midfielder
 * PLAYER 2...
 */

// Your code
function LogPlayers() {
    data.getPlayers().forEach((player, index) => {
        console.log(`Player ${(index + 1)}`);
        console.log(`NAME: ${player.name}`);
        console.log(`LASTNAME: ${player.lastname}`);
        console.log(`POSITION: ${player.position}`);
    });
}
LogPlayers();


/**
 * Test 2
 * Write a function to log in the console an array with only the names of the players, ordered by name length descending
 */

// Your code
function LogPlayerNamesDescending() {
    const names = data.getPlayers()
        //create array of just names
        .map((player) => {
            return player.name;
        })
        //sort the new array by string length descending
        .sort((a, b) => {
            if (a.length < b.length) {
                return 1;
            }
            if (a.length > b.length) {
                return -1;
            }
            return 0;
        });
    console.log('names', names);
}
LogPlayerNamesDescending();

/**
 * Test 3
 * Write a function to log in the console the average number of goals there will be in a match if all the players in the data play on it
 * scoringChance means how many goals per 100 matches the player will score
 * Example: 10 players play in a match, each of them has a 0.11 scoringChance, the total number of goals will be 1.1 average
 * Output example -> Goals per match: 2.19
 */

// Your code
function AverageGoalsInMatch() {
    const goalsPerMatch = data.getPlayers()
        //create array of scoring chance
        .map((player) => {
            //parse int as I noticed Diego llorente had a score chance of string
            if(typeof player.scoringChance === "string") {
                return parseInt(player.scoringChance);
            }
            return player.scoringChance;
        })
        //add up all the scoring chances and then divide by 100 for 1 match
        .reduce((total, value) => total + value) / 100
        //round to two decimal places
        .toFixed(2);
    console.log(`Goals per match: ${goalsPerMatch}`);
}
AverageGoalsInMatch();

/**
 * Test 4
 * Write a function that accepts a name, and logs the position of the player with that name (by position it means striker, goalkeeper...)
 */

// Your code
/**
 * @param {string} name
 */
function GetPositionByName(name) {
    const position = data.getPlayers()
        .find((player) => player.name === name)?.position;
    console.log(position);
}
GetPositionByName('Lucas');

/**
 * Test 5
 * Write a function that splits all the players randomly into 2 teams, Team A and Team B. Both teams should have same number of players.
 * The function should log the match score, using the average number of goals like the Test 3 and rounding to the closest integer
 * Example:
 *      Team A has 4 players, 2 with 50 scoringChance and 2 with 70 scoringChance.
 *      The average score for the team would be 2.4 (50+50+70+70 / 100), and the closest integer is 2, so the Team A score is 2
 */

// Your code
function GetTeamScore(team) {
    return Math.round(team
        //create array of scoring chance per 1 match
        .map((player) => {
            //parse int as I noticed Diego llorente had a score chance of string
            if(typeof player.scoringChance === "string") {
                return parseInt(player.scoringChance);
            }
            return player.scoringChance;
        })
        //add up all the scoring chances for 1 match
        .reduce((total, value) => total + value) / 100);
}

function SplitIntoTeams() {
    let teams = {a: [], b: []};
    data.getPlayers()
        .forEach((player) => {
            //if team a full automatically add to team b
            if (teams.a.length === 5) teams.b.push(player);
            //if team b full automatically add to team a
            else if (teams.b.length === 5) teams.a.push(player);
            //if neither team full randomly add to a team
            else Math.random() > 0.5 ? teams.a.push(player) : teams.b.push(player);
        })
    console.log(`A ${GetTeamScore(teams.a)} - ${GetTeamScore(teams.b)} B`);
}
SplitIntoTeams();