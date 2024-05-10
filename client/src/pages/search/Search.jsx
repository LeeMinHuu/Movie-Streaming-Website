import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import SearchForm from '../../components/Search/SearchForm';

const Search = () => {
	return (
		<div className='app' style={{backgroundColor: "black", height: "100vh"}}>
			<NavBar />
			<SearchForm />
		</div>
	);
};

export default Search;
