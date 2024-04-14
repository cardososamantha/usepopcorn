import PropTypes from 'prop-types';

export default function Error({ errorMessage }) {
	return <p className='error'> {errorMessage} </p>;
}

Error.propTypes = {
	errorMessage: PropTypes.string,
};
