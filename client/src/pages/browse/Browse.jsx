import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar.jsx';
import MovieList from '../../components/MovieList.jsx';
import useHttp from '../../hooks/use-http.js';


function Browse(props) {
	const user = localStorage.getItem("user")
	const [banner, setBanner] = useState("");

	const headers = props.headers;
	console.log(headers);
	 
	const API_KEY="02bfe641b59c821b8665ed48b076a9d6";
	const url = "https://api.themoviedb.org/3"
	const bannerUrl = "https://image.tmdb.org/t/p/original"
	const requests = {
	fetchTrending: `http://localhost:5000/api/movies/trending`,
	fetchNetflixOriginals: `${url}/discover/tv?api_key=${API_KEY}&with_network=123`,
	fetchTopRated: `http://localhost:5000/api/movies/top-rate`,
	fetchActionMovies: `http://localhost:5000/api/movies/discover/28`,
	fetchComedyMovies: `http://localhost:5000/api/movies/discover/35`,
	fetchHorrorMovies: `http://localhost:5000/api/movies/discover/27`,
	fetchRomanceMovies: `http://localhost:5000/api/movies/discover/10749`,
	fetchDocumentaries: `http://localhost:5000/api/movies/discover/99`,
	fetchSearch: `${url}/search/movie?api_key=${API_KEY}&language=en-US`,
};
	
	const {data, fetchApi} = useHttp({url: requests.fetchNetflixOriginals});

	useEffect(()=> {
		fetchApi()
	}, [fetchApi])
	
	// Pick random movie
	useEffect(() => {
		const pickedMovie = data[Math.floor(Math.random() * data.length - 1)] || {};
		setBanner(`${bannerUrl}${pickedMovie.backdrop_path}`);
	},[data])
	

	return ( <>
		{user && <div className="app" style={{backgroundColor: "black", width: "100%"}}>
			<NavBar banner={banner} />
			<MovieList requests={requests} headers={headers} />
		</div>}
		{!user && <h1>Please login <a href='/login'>here</a> </h1>}
		</>
	);
}

export default Browse;

