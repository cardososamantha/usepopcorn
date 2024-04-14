import PropTypes from 'prop-types';

export default function Results({ movies }) {
	return (
		<p className='num-results'>
			Found <strong>{movies ? movies.length : 0}</strong> results
		</p>
	);
}

Results.propTypes = {
	movies: PropTypes.array,
};
