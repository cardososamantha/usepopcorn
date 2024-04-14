import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Rate from './../Rate';
import Loader from '../Loader';

const API_KEY = '64c820';

export default function MovieDetail({ id, onCloseMovie, addMovieToWatched }) {
	const [movieDetail, setMovieDetail] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState(0);

	const {
		Title: title,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: releasedDate,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movieDetail;

	useEffect(() => {
		getMovieDetails(id);
	}, [id]);

	useEffect(() => {
		if (!title) return;
		document.title = title;

		return function () {
			document.title = 'usePopcorn';
		};
	}, [title]);

	async function getMovieDetails() {
		setIsLoading(true);
		const response = await fetch(
			`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
		);
		const data = await response.json();
		setMovieDetail(data);
		setIsLoading(false);
	}

	function handleAddMovieToWatchedList() {
		const normalizedMovie = {
			imdbID: id,
			imdbRating: Number(imdbRating),
			title,
			poster,
			runtime: Number(runtime.split(' ').at(0)),
			userRating,
		};
		addMovieToWatched(normalizedMovie);
	}

	return (
		<div className='box'>
			<nav className='details'>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<button className='btn-back' onClick={onCloseMovie}>
							&larr;
						</button>
						<header>
							<img src={poster} alt={`Poster of ${title} movie`} />
							<div className='details-overview'>
								<h2>{title}</h2>
								<p>
									{releasedDate} &bull; {runtime}
								</p>
								<p>{genre}</p>
								<p>
									<span>⭐</span>
									{imdbRating} IMDb Rating
								</p>
							</div>
						</header>

						<section>
							<Rate maxRating={10} />
							<button
								className='btn-add'
								onClick={() => handleAddMovieToWatchedList(movieDetail)}
							>
								+ Add to list
							</button>
							<p>
								<em>{plot}</em>
							</p>
							<p>Starring {actors}</p>
							<p>Directed by {director}</p>
						</section>
					</>
				)}
			</nav>
		</div>
	);
}

MovieDetail.propTypes = {
	id: PropTypes.string,
	onCloseMovie: PropTypes.func,
	addMovieToWatched: PropTypes.func,
};
