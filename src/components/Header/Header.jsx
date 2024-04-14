import PropTypes from 'prop-types';

export default function Header({ children }) {
	return <nav className='nav-bar'>{children}</nav>;
}

Header.propTypes = {
	children: PropTypes.node,
};
