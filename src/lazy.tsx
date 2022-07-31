import * as React from 'react';

/**
 * Wrapper around React.lazy to make sure that if a fallback component is displayed it will be shown for a minimum amount of time to prevent flickering.
 * @param factory 
 * @param options.time_before_fallback - The time before the fallback component will display (use usePastDelay hook in component), defaults to 200
 * @param options.minimum_fallback_time - The minimum amount of time the fallback components will be shown if it does show up, defaults to 500
 */
function lazy<T extends React.ComponentType<any>>(
	factory: () => Promise<{
		default: T
	}>,
	options: {
		time_before_fallback?: number
		minimum_fallback_time?: number
	} = {}
): React.LazyExoticComponent<T> {
	const { time_before_fallback = 200, minimum_fallback_time = 500 } = options;
	const minimum_pause = time_before_fallback + minimum_fallback_time;
	return React.lazy(() => {
		const start_time = Date.now();
		return factory().then(module_exports => {
			const loading_time = Date.now() - start_time;
			if (loading_time > time_before_fallback && loading_time < minimum_pause) return new Promise(resolve => setTimeout(() => resolve(module_exports), minimum_pause - loading_time));
			return module_exports;
		});
	});
}

export default lazy;
