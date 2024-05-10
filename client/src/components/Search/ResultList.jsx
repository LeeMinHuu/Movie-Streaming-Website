import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http"
import Card from "../Card/Card";

export default function ResultList(props) {


    const API_KEY = "02bfe641b59c821b8665ed48b076a9d6";
    const imgUrl = "https://image.tmdb.org/t/p/w500";
    const searchUrl = "http://localhost:5000/api/movies/search"
    const [fetched, setFetched] = useState(false);

    // const [header, setHeader] = useState("");
    // const user = JSON.parse(localStorage.getItem("user"));
    // const token = user.token;
    // setHeader({Authorization: `Bearer ${token}`})

    const configRequest = {
        method: "POST",
        headers: { 
            "Content-Type": "application/JSON",
            Authorization: `Bearer ${(JSON.parse(localStorage.getItem("user"))).token}`},
        body: {"keyword": `${props.keywords}`}
    }

    // Call search API by useHttp Hook
    const {data, fetchApi} = useHttp({url: searchUrl, method: configRequest.method, headers: configRequest.headers, body: configRequest.body});
    

    useEffect(() => {
    if(!fetched) {
        if(props.clicked) {
         fetchApi();
         setFetched(true)
        }
    }
    }, [fetchApi]);


    return (<>
        {props.clicked && 
        <section className="result-list" id="reset">
        <div className="card">
            <p>Search Results:</p>
            <ul>
                {data.map((item) => <Card id={item.id} img={`${item.backdrop_path ? `${imgUrl}${item.backdrop_path}` : "nothumb.jpg"}`} />)}
            </ul>
        </div>
    </section>
    }
    </>
    )
}