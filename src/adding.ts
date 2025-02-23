import { fetchGames } from "./rendering";

/* frontend storage of games */
let listOfGames: any[] = [];

// Adds entry based on user input
export async function addEntry() {
    // converts user input to variables, adds them to an Entry
    let title = document.getElementById('gameTitleInput') as HTMLInputElement
    let genre = document.getElementById('gameGenreInput') as HTMLInputElement
    const entry = { title: title.value, genreName: genre.value}

    // Adds said entry to backend memory, stringifies it
    const response = await fetch("http://localhost:3000/games", {
        method: "POST", //create
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(entry)
    });

    // pushes new item to FE storage
    const newItem = await response.json()
    listOfGames.push(newItem);
    // clears text boxes
    title.value = ""
    genre.value = ""
    fetchGames();
}