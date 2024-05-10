const express = require("express");

const movieController = require("../controllers/movie");
const authenticateJWT = require("../middleware/auth");

const router = express.Router();
router.use(express.json());

// GET Trending Moviess
router.get(
  "/api/movies/trending",
  authenticateJWT,
  movieController.getTrendingMovies
);

// GET Top Rated Moviess
router.get(
  "/api/movies/top-rate",
  authenticateJWT,
  movieController.getTopRatedMovies
);

// GET Movies by genres
router.get(
  "/api/movies/discover/:genreId",
  authenticateJWT,
  movieController.getMoviesByGenre
);

// POST Movies Trailer
router.post(
  "/api/movies/video",
  authenticateJWT,
  movieController.postTrailerMovie
);

// POST Search Movies
router.post(
  "/api/movies/search",
  authenticateJWT,
  movieController.searchMovies
);

module.exports = router;
