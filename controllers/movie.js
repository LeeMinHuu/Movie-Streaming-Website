const Movie = require("../models/Movies");
const paging = require("../utils/paging");

// Trending API
exports.getTrendingMovies = (req, res, next) => {
  try {
    const data = Movie.getTrending();

    // Paging Data
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 20;
    const pagingData = paging.paging(data, page, pageSize);

    return res.status(200).json({
      status: 200,
      results: pagingData.paginatedData,
      page: pagingData.paginationInfo.currentPage,
      total_pages: pagingData.paginationInfo.pageCount,
      //   meta: pagingData.paginationInfo,
    });
  } catch (e) {
    return res.status(500).json({ status: 500, message: "Error" });
  }
};

// Top Rate API
exports.getTopRatedMovies = async (req, res, next) => {
  try {
    const data = Movie.getTopRated();

    // Paging Data
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 20;
    const pagingData = paging.paging(data, page, pageSize);

    return res.status(200).json({
      status: 200,
      results: pagingData.paginatedData,
      page: pagingData.paginationInfo.currentPage,
      total_pages: pagingData.paginationInfo.pageCount,
      //   meta: pagingData.paginationInfo,
    });
  } catch (e) {
    return res.status(500).json({ status: 500, message: "Error" });
  }
};

// Movies By Genre API
exports.getMoviesByGenre = (req, res, next) => {
  if (!req.params.genreId) {
    return res
      .status(400)
      .json({ status: 400, message: "Not found genre param!" });
  }
  try {
    const genreId = req.params.genreId;
    const data = Movie.getByGenre(genreId).filterMovies;
    const genreName = Movie.getByGenre(genreId).genreName;

    // Paging Data
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 20;
    const pagingData = paging.paging(data, page, pageSize);

    return res.status(200).json({
      status: 200,
      results: pagingData.paginatedData,
      page: pagingData.paginationInfo.currentPage,
      total_pages: pagingData.paginationInfo.pageCount,
      genre_name: genreName.name,
      //   meta: pagingData.paginationInfo,
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Trailer Video API
exports.postTrailerMovie = (req, res, next) => {
  if (!req.body.film_id) {
    return res.status(400).json({ status: 400, message: "Not found film_id!" });
  }

  try {
    const filmId = req.body.film_id;
    console.log(filmId);
    const data = Movie.fetchTrailerVideos(filmId);

    return res.status(200).json({
      status: 200,
      results: data,
    });
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};

// Search API
exports.searchMovies = (req, res, next) => {
  try {
    const keyword = req.body.keyword;
    const data = Movie.searchFilm(keyword);

    // Paging Data
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 20;
    const pagingData = paging.paging(data, page, pageSize);

    return res.status(200).json({
      status: 200,
      results: pagingData.paginatedData,
      page: pagingData.paginationInfo.currentPage,
      total_pages: pagingData.paginationInfo.pageCount,
      //   meta: pagingData.paginationInfo,
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Error" });
  }
};
