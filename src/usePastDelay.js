import { useState, useEffect } from 'react';

/**
 * Hook that indicates if a certain amount of time has passed since the component was mounted.
 * @param {Number} [delay=200] - The delay time in ms, defaults to 200
 * 
 * @example
 * function Loading() {
 *		const past_delay = usePastDelay();
 *		if (! past_delay) return null
 *		return <div>Loading ...</div>;
 * }
 */
function usePastDelay(delay = 200) {
	const [ past_delay, setPastDelay ] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setPastDelay(true), delay);
		return () => {
			clearTimeout(timeout);
		};
	}, [delay]);

	return past_delay;
}

export default usePastDelay;
