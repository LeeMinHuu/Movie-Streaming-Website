import { useEffect } from 'react';
import useHttp from '../hooks/use-http';
import Card from './Card/Card';

export default function MovieList(props) {
    const imgUrl = "https://image.tmdb.org/t/p/w500"
    const movieList = {
        original: props.requests.fetchNetflixOriginals,
        trending: props.requests.fetchTrending,
        topRated: props.requests.fetchTopRated,
        action: props.requests.fetchActionMovies,
        comedy: props.requests.fetchComedyMovies,
        horror: props.requests.fetchHorrorMovies,
        romance: props.requests.fetchRomanceMovies,
        documentaries: props.requests.fetchDocumentaries,
        search: props.requests.fetchSearch,
    }

    // Call useHttp Hook
    const { data: originalData, fetchApi: originalFetchApi } = useHttp({url: movieList.original});
    const { data: trendingData, fetchApi: trendingFetchApi } = useHttp({url: movieList.trending, headers: props.headers});
    const { data: topRatedData, fetchApi: topRatedFetchApi } = useHttp({url: movieList.topRated, headers: props.headers});
    const { data: actionData, fetchApi: actionFetchApi } = useHttp({url: movieList.action, headers: props.headers});
    const { data: comedyData, fetchApi: comedyFetchApi } = useHttp({url: movieList.comedy, headers: props.headers});
    const { data: horrorData, fetchApi: horrorFetchApi } = useHttp({url: movieList.horror, headers: props.headers});
    const { data: romanceData, fetchApi: romanceFetchApi } = useHttp({url: movieList.romance, headers: props.headers});
    const { data: documentariesData, fetchApi: documentariesFetchApi } = useHttp({url: movieList.documentaries, headers: props.headers});

    useEffect(() => {
        originalFetchApi();
        trendingFetchApi();
        topRatedFetchApi();
        actionFetchApi();
        comedyFetchApi();
        horrorFetchApi();
        romanceFetchApi();
        documentariesFetchApi()
    },[originalFetchApi,trendingFetchApi,topRatedFetchApi,actionFetchApi,comedyFetchApi,horrorFetchApi,romanceFetchApi,documentariesFetchApi])

    
    return (
    <section className="movie-list">
        <div className="card">
        <p>Original</p>
            <ul>
                {originalData.map((item) => <Card id={item.id} img={`${item.poster_path ? `${imgUrl}${item.poster_path}` : "nothumb.jpg"}`} />)}
            </ul>
        </div>

        <div className="card">
        <p>Xu hướng</p>
            <ul>
                {trendingData.map((item) => <Card id={item.id} img={`${item.backdrop_path ? `${imgUrl}${item.backdrop_path}` : "nothumb.jpg"}`} />)}
            </ul>
        </div>

        <div className="card">
        <p>Xếp hạng cao</p>
            <ul>
                {topRatedData.map((item) => <Card id={item.id} img={`${item.backdrop_path ? `${imgUrl}${item.backdrop_path}` : "nothumb.jpg"}`} />)}
            </ul>
        </div>

        <div className="card">
        <p>Hành động</p>
            <ul>
                {actionData.map((item) => <Card id={item.id} img={`${item.backdrop_path ? `${imgUrl}${item.backdrop_path}` : "nothumb.jpg"}`} />)}
            </ul>
        </div>

        <div className="card">
        <p>Hài</p>
            <ul>
                {comedyData.map((item) => <Card id={item.id} img={`${item.backdrop_path ? `${imgUrl}${item.backdrop_path}` : "nothumb.jpg"}`} />)}
            </ul>
        </div>
        
        <div className="card">
        <p>Kinh dị</p>
            <ul>
                {horrorData.map((item) => <Card id={item.id} img={`${item.backdrop_path ? `${imgUrl}${item.backdrop_path}` : "nothumb.jpg"}`} />)}
            </ul>
        </div>
        
        <div className="card">
        <p>Lãng mạn</p>
            <ul>
                {romanceData.map((item) => <Card id={item.id} img={`${item.backdrop_path ? `${imgUrl}${item.backdrop_path}` : "nothumb.jpg"}`} />)}
            </ul>
        </div>
        
        <div className="card">
        <p>Tài liệu</p>
            <ul>
                {documentariesData.map((item) => <Card id={item.id} img={`${item.backdrop_path ? `${imgUrl}${item.backdrop_path}` : "nothumb.jpg"}`} />)}
            </ul>
        </div>
    </section>
    )
}