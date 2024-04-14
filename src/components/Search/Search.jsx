import PropTypes from 'prop-types';

export default function Search({ query, setQuery }) {
	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			onChange={(e) => setQuery(e.target.value)}
		/>
	);
}

Search.propTypes = {
	query: PropTypes.string,
	setQuery: PropTypes.func,
};
