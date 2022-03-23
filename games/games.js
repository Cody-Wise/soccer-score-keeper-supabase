import { 
    logout, 
    checkAuth,
    getGames,
    createGame,
} from '../fetch-utils.js';
import { renderGame, renderTeam } from '../render-utils.js';

const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');
const logoutButton = document.getElementById('logout');

const nameForm = document.getElementById('name-form');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

checkAuth();

// let pastGames = [];

let currentGame = {
    name1: '',
    name2: '',
    score1: 0,
    score2: 0,
};

nameForm.addEventListener('submit', (e) => {
    // don't forget to prevent the default form behavior!

    e.preventDefault();

    const data = new FormData(nameForm);

    currentGame.name1 = data.get('team-one');
    currentGame.name2 = data.get('team-two');




    // get the name data from the form

    // set the state to this data from the form

    // reset the form values
    nameForm.reset();

    displayCurrentGameEl();
});


teamOneAddButton.addEventListener('click', () => {
    // increment the current state for team one's score
    currentGame.score1++;
    displayCurrentGameEl();
});

teamTwoAddButton.addEventListener('click', () => {
    // increment the current state for team two's score
    currentGame.score2++;
    displayCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    // decrement the current state for team one's score
    currentGame.score1--;
    displayCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    // decrement the current state for team two's score
    currentGame.score2--;
    displayCurrentGameEl();
});

finishGameButton.addEventListener('click', async() => {
    // create a new game using the current game state
    await createGame(currentGame);

    const games = await getGames();

    // pastGames = games;

    displayAllGames();

    pastGamesEl.append(games);
    


    // after creating this new game, re-fetch the games to get the updated state and display them (hint: call displayAllGames())
            
    currentGame.name1 = '';
    currentGame.name2 = '';
    currentGame.score1 = 0;
    currentGame.score2 = 0;

    displayCurrentGameEl();
});

logoutButton.addEventListener('click', () => {
    logout();
});

 // on load . . .
window.addEventListener('', async() => {
    // display all past games (hint: call displayAllGames())


    await displayAllGames();
});


function displayCurrentGameEl() {
    // clear out the current game div
    currentGameEl.textContent = '';

    // change the label to show team one's name;

    teamOneLabel.textContent = currentGame.name1;
    teamTwoLabel.textContent = currentGame.name2;

    currentGameEl.classList.add('current');

    // change the label to show team two's name;

    // call the render game function to create a game element

    const game = renderGame(currentGame);

    currentGameEl.append(game);

    
    // append the element to the cleared out current game div
}


async function displayAllGames() {
    // clear out the past games list in the DOM
    pastGamesEl.textContent = '';
    

    const games = await getGames();

    for (let game of games){

        const gameEl = renderGame(game);
        pastGamesEl.append(gameEl);
    }
    
    // FETCH ALL GAMES from supabase

    // loop through the past games 
    // render and append a past game for each past game in state
}


displayCurrentGameEl();
