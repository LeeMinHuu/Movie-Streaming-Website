const fs = require("fs");
const path = require("path");
const genreFile = require("./Genre");
const videoListFile = require("./Videos");

const moviePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "movieList.json"
);

const Movies = {
  all: function () {
    return JSON.parse(fs.readFileSync(moviePath, "utf8"));
  },
};

const Genre = genreFile.all();
const getGenreName = (id) => {
  // return Genre.filter((genre) => id == genre.id);
  return Genre.find((genre) => id == genre.id);
};

const Video = videoListFile.all();

module.exports = class Movie {
  constructor(
    adult,
    id,
    title,
    original_language,
    original_title,
    overview,
    poster_path,
    movie,
    genre_ids,
    popularity,
    release_date,
    video,
    vote_average,
    vote_count
  ) {
    this.adult = adult;
    this.backdrop_path = backdrop_path;
    this.id = id;
    this.title = title;
    this.original_language = original_language;
    this.original_title = original_title;
    this.overview = overview;
    this.poster_path = poster_path;
    this.media_type = movie;
    this.genre_ids = genre_ids;
    this.popularity = popularity;
    this.release_date = release_date;
    this.video = video;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
  }

  // Get Trending Function
  static getTrending() {
    // Sort film by descending popularity
    const fetchedMovie = Movies.all().slice(0);
    fetchedMovie.sort(function (a, b) {
      return b.popularity - a.popularity;
    });
    return fetchedMovie;
  }

  // Get Top Rate Function
  static getTopRated() {
    // Sort film by descending rating
    const fetchedMovie = Movies.all().slice(0);
    fetchedMovie.sort(function (a, b) {
      return b.vote_average - a.vote_average;
    });
    return fetchedMovie;
  }

  // Get Film by Genre ID Function
  static getByGenre(genreId) {
    const fetchedMovie = Movies.all();
    const filterMovies = fetchedMovie.filter((movie) => {
      return movie.genre_ids.some((id) => genreId == id);
    });

    // Get Genre Name
    const genreName = getGenreName(genreId);
    if (!genreName) {
      throw new Error("Not found that genre ID!");
    }
    return { filterMovies, genreName };
  }

  // Get Trailer Video Function
  static fetchTrailerVideos(id) {
    const getVideo = Video.filter((item) => id == item.id);

    if (!getVideo[0]) {
      throw new Error("Not found video!");
    } else {
      const videoCriteria = {
        official: [true],
        site: ["YouTube"],
        type: ["Trailer", "Teaser"],
      };

      // Filter videos by criterias
      const filteredByCriteria = getVideo[0].videos.filter((item) =>
        Object.entries(videoCriteria).every(
          ([key, filterArr]) =>
            filterArr.length === 0 || filterArr.includes(item[key])
        )
      );

      if (!filteredByCriteria) {
        throw new Error("Not found video!");
      }

      // Priority Trailer
      const typeSort = ["Trailer", "Teaser"];
      filteredByCriteria.sort(
        (a, b) => typeSort.indexOf(a.type) - typeSort.indexOf(b.type)
      );

      // Sort by published_at
      filteredByCriteria.sort(function (a, b) {
        return new Date(b.published_at) - new Date(a.published_at);
      });

      console.log(filteredByCriteria[0]);
      return filteredByCriteria[0];
    }
  }

  // Search Function
  static searchFilm(keyword) {
    const filmSearch = Movies.all().filter((item) =>
      `${item.title} ${item.overview}`
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );

    return filmSearch;
  }

  // Get All Films
  static fetchAll() {
    return Movies.all();
  }
};
