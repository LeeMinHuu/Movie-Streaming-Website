import { useRef, useState } from "react";
import "./SearchForm.css";
import ResultList from "./ResultList";

export default function SearchForm() {
    const user = localStorage.getItem("user")
    const search = useRef();
    const [keywords,setKeywords] = useState("");
    const [clicked,setClicked] = useState(false);

    // Process after press Search button
    function clickHandler(e) {
        e.preventDefault();
        setClicked(true);
        setKeywords(search.current.value);
};

    return (<>
    {user &&  <div className="search-form">
    <form onSubmit={clickHandler}>
        <input type="text" id="search" name="search" placeholder="Enter Keywords" ref={search} required />
        <button type="submit" className="submit-button">Search</button>
        <button type="reset" className="reset-button">Reset</button>
    </form>
     <ResultList keywords={keywords} clicked={clicked} />
    </div>}

    {!user && <h1>Please login <a href='/login'>here</a> </h1>}
   
    </>)
}