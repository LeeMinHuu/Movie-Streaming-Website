import "./MovieDetail.css";
import YouTube from "react-youtube";

export default function MovieDetail(props) {
    const opts = {
	height: '480',
	width: '100%',
	playerVars: {
		autoplay: 0,
	},
    };
    
    const img = `https://image.tmdb.org/t/p/original${props.backdrop}`;


    return (<>
        {/* Check loading */}
        {props.movieLoading && 
        <div className="movie-detail">
            <div className="movie-error">
                <p>Loading!!!!!!!!!</p>
            </div>
        </div>
        }
        
        {/* Render movie detail */}
        {props.status && !props.movieLoading &&
        
        <div className="movie-detail">
            <div className="movie-info">
                <p className="title">{props.title}</p>
                <hr />
                <p className="subtitle">Release Date: {props.releaseDate}</p>
                <p className="subtitle">Vote: {props.rate}/10</p>
                <p className="description">{props.description}</p>
            </div>

            <div className="movie-video">
            {props.movieVideo && <YouTube videoId={props.movieVideo} opts={opts} />}
            {!props.movieVideo && props.backdrop && <div className="img-container"> <img src={img} alt={props.title} /> </div>}
            </div>
        </div>
        }

        {/* Check error */}
        {!props.movieLoading && !props.status && props.error && 
        <div className="movie-detail">
        <div className="movie-error">
            <p>{props.error}</p>
        </div>
        </div>}
    </>)
}