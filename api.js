const movieCollection = 'https://plankton-app-xhkom.ondigitalocean.app/api/movies';

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

function simplifyMovieData(oneMovieData) {
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

