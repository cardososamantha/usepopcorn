import PropTypes from 'prop-types';

import { useState } from 'react';
import Star from 'src/components/Star';

export default function Rate({ maxRating = 5 }) {
	const [rating, setRating] = useState(0);
	const [tempRating, setTempRating] = useState(0);

	function handleRating(rating) {
		setRating(rating);
	}

	function handleTempRating(tmpRating) {
		setTempRating(tmpRating);
	}

	return (
		<div className='rating'>
			<div className='stars-container'>
				{Array.from({ length: maxRating }, (_, i) => (
					<Star
						key={i}
						onRate={() => handleRating(i + 1)}
						filledStar={tempRating ? tempRating >= i + 1 : rating >= i + 1}
						onHoverIn={() => handleTempRating(i + 1)}
						onHoverOut={() => handleTempRating(0)}
					/>
				))}
			</div>
			<p>{tempRating || rating || 0}</p>
		</div>
	);
}

Rate.propTypes = {
	maxRating: PropTypes.number,
};
