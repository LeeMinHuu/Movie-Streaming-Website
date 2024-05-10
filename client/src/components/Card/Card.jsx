import React, { useEffect, useState } from "react";

import useHttp from "../../hooks/use-http";
import MovieDetail from "../MovieDetail/MovieDetail"

import "./Card.css"

export default function Card(props) {
    const API_KEY = "02bfe641b59c821b8665ed48b076a9d6";
    const [movieUrl, setMovieUrl] = useState("");
    const [movieVideoUrl, setMovieVideoUrl] = useState("");
    const [clicked, setClicked] = useState(false);
    const [error, setError] = useState(null);
    const [movieVideo, setMovieVideo] = useState(null);

    //Get id & url for fetching
    function movieClick() {
        setClicked(!clicked);
        setMovieUrl(`https://api.themoviedb.org/3/movie/${props.id}?api_key=${API_KEY}`);
        setMovieVideoUrl(`https://api.themoviedb.org/3/movie/${props.id}/videos?api_key=${API_KEY}`);

    };

    // Call useHttp hook for fetching movie data
    const { data: movieData, isLoading: movieLoading, error: movieError, fetchApi: movieFetchApi } = useHttp({url: movieUrl});
    const {data: movieVideoData, isLoading: movieVideoLoading, error: movieVideoError, fetchApi: movieVideoFetchApi} = useHttp({url: movieVideoUrl});

    useEffect(() => {
        movieFetchApi();
        movieVideoFetchApi()
    },[movieFetchApi,movieVideoFetchApi])

    useEffect(() => {
        if(!movieData.success) {
            setError(`${movieData.status_message}`);
        }

       if(movieVideoData.success !== false) {
        for (const item of movieVideoData) {
            if(item.type === "Trailer") {
                setMovieVideo(item.key);
            } else if (item.type === "Teaser") {
                setMovieVideo(item.key);
            } else setMovieVideo(null);
        }
    }
    },[movieData, movieVideoData]);

    
    return (<>
            <li> 
            <a href="javascript:;" onClick={movieClick} > <img src={props.img} alt={props.img} /> </a></li>
        
            {clicked && <div style={{display: "grid"}}>
            <MovieDetail 
                status={movieData.status} 
                backdrop={movieData.backdrop_path}
                movieVideo={movieVideo}
                movieLoading={movieLoading}
                id={movieData.id} 
                title={movieData.title} 
                releaseDate={movieData.release_date} 
                rate={movieData.vote_average} 
                description={movieData.overview} 
                error={error} /></div> }
             
            </>
       )
}