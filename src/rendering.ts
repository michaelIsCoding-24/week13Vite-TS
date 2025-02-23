type Game = {
    id: number
    title: string
    genreName: string
  }
  
  
  /* frontend storage of games */
  let listOfGames: any[] = [];

/* FETCHING CODE */
const gameContainer = document.getElementById('gameContainer') as HTMLDivElement

// fetches games from API
export async function fetchGames(){
    const gameResponse = await fetch('http://localhost:3000/games');
    const gameList = await gameResponse.json();
    // pushes all games to the array for FE storage
    listOfGames.push(gameList);

    // maps out all games in backend storage
    gameContainer.innerHTML = gameList.map(
        (game: Game) => `
        <div class="row bg-light text-center py-3 border border-black border-3">
            <h2 class="fst-italic">${game.title}</h2>
            <p>Genre: ${game.genreName}</p>
            <button id="${game.id}" class="btn btn-danger col-2 mx-auto delete-button">Delete Entry</button>
        </div>
        `
    ).join("");

    // delete function within the fetch games function
    const deleteEntry = async (gameId: number) => {
      // decided to be cheeky and add user confirmation
      if (confirm("Are you sure you wish to delete this entry? This cannot be undone.") == true){
          await fetch("http://localhost:3000/games/" + gameId, {
              method: "DELETE", //delete
          });
          const toDelete = listOfGames.indexOf(gameId)
          listOfGames.splice(toDelete, 1)
          fetchGames();
      } else {
          alert("Delete Cancelled.")
      };
    }
    // selects all delete buttons, adds an event listener that calls the deleteEntry function
    document.querySelectorAll(".delete-button").forEach(button =>
      button.addEventListener("click", () => deleteEntry(parseInt((button as HTMLElement).id)))
    )
};