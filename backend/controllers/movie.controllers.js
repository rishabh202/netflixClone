import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
        
        
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        
        res.json({success: true, content:randomMovie});

    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export async function getMovieTrailers(req, res) {
    const { id } = req.params;
    try {
      const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
      res.json({success: true, trailers: data.results});
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }

        res.status(500).json({success: false, message: "internal server error"});

    }
}