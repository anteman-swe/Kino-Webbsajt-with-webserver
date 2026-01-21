import convertMD2HTML from "./mdconversion.js";

const movieCollection = 'https://plankton-app-xhkom.ondigitalocean.app/api/movies';
// Function to get a list of movies from API
async function getAllMovies() {
    try {
        const response = await fetch(movieCollection);
        if (!response.ok) {
            console.log(`Response status:  ${response.status}`);
        }
        const allMovies = await response.json();
        return allMovies.data.map(simplifyMovieData);
    } catch (err) {
        console.log(`Error message: ${err.message}`);
    }
}
// Function to get one specific movie from API
async function getOneMovie(id) {
    try {
        const response = await fetch(movieCollection + `/${id}`);
        if (!response.ok) {
            console.log(`Response status:  ${response.status}`);
        }
        const oneMovie = await response.json();
        return simplifyMovieData(oneMovie);
    } catch (err) {
        console.log(`Error message: ${err.message}`);
    }
}
// Function to clean and simplify a json-object with data about a movie
function simplifyMovieData(oneMovieData) {
    const convertedIntro = convertMD2HTML(oneMovieData.data.attributes.intro);
    oneMovieData.data.attributes.intro = convertedIntro;
    return {
        id: oneMovieData.data.id,
        ...oneMovieData.data.attributes
    }
}

const api = {
    getAllMovies,
    getOneMovie
};

export default api;

