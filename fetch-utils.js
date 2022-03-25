const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/*
assumptions you can make:

The table name in supabase is `games`

The games are stored in the database using this data model:
{
   name1: ,
   name2: ,
   score1: ,
   score2: ,
}
*/

export async function createGame(game){

    const response = await client

        .from('games')
        .insert(game);

    // create a single new game in the games table using the above object
    
    return checkError(response);
}

export async function getGames() {
    // select all games from the games table

    const response = await client

        .from('games')
        .select('*');

    return checkError(response);    
}

export async function getIds() {

    const response = await client
        .from('games')
        .select('id');
    return response.body;

}

// export async function deleteGame(id){

//     const response = await client
//         .from('games')
//         .delete()
//         .match({ id: id });

//     return response.body;

// }

export async function updateGame(name1, gameId){

    const response = await client
        .from('games')
        .update({ name1: name1 })
        .match({ id: gameId });




    return response.body;

}

export async function fetchDeleteGame(gameId){
    // create a single new game in the games table using the above object
    const response = await client
        .from('games')
        .delete()
        .match({ id: gameId });
    
    return response;
}

export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) { alert('You must be logged in');
        location.replace('../');}
    
}

export async function redirectToGames() {
    if (await getUser()) {
        location.replace('./games');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
