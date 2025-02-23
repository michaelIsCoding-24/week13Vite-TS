import "bootstrap/dist/css/bootstrap.css"
import { fetchGames } from "./rendering"
import { addEntry } from "./adding";

// quick event listener to the add entry button
document.getElementById('add-entry')!.addEventListener("click", addEntry)

fetchGames();