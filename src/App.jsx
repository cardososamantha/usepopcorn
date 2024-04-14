import { useState, useEffect } from 'react';

import Error from 'src/components/Error';
import Header from 'src/components/Header';
import List from 'src/components/List';
import Loader from './components/Loader';
import Logo from 'src/components/Logo';
import Main from 'src/components/Main';
import Results from 'src/components/Results';
import Search from 'src/components/Search';
import WatchedList from 'src/components/WatchedList';
import MovieDetail from './components/MovieDetail';

const API_KEY = '64c820';

export default function App() {
	const initialQuery = 'Mulan';
	const [query, setQuery] = useState(initialQuery);
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [selectedId, setSelectedId] = useState(null);

	useEffect(() => {
		if (!query.length) {
			setMovies([]);
			return;
		}
		fetchMovieData();
	}, [query]);

	async function fetchMovieData() {
		try {
			setIsLoading(true);
			setError('');
			const response = await fetch(
				`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
			);

			if (!response.ok)
				throw new Error('Something went wrong on fetching movies');

			const data = await response.json();
			setMovies(data.Search);
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	function handleSelectMovie(id) {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAdMovieToWatchedList(movie) {
		setWatched((watched) => [...watched, movie]);
		handleCloseMovie();
	}

	function handleRemoveMovieToWatchedList(movieId) {
		const newWatchedList = watched.filter((movie) => movie.imdbID !== movieId);
		setWatched(newWatchedList);
	}

	return (
		<>
			<Header>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<Results movies={movies} />
			</Header>
			<Main>
				{isLoading && <Loader />}
				{!isLoading && !error && (
					<List movies={movies} onSelectMovie={handleSelectMovie} />
				)}
				{error && <Error message={error} />}
				{selectedId ? (
					<MovieDetail
						id={selectedId}
						onCloseMovie={handleCloseMovie}
						addMovieToWatched={handleAdMovieToWatchedList}
					/>
				) : (
					<WatchedList
						watched={watched}
						removeMovieToWatchList={handleRemoveMovieToWatchedList}
					/>
				)}
			</Main>
		</>
	);
}
