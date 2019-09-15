import React from 'react';

/**
 * @callback importCallback 
 * @returns {Promise.<any>}
 * @memberof module:react-lazy-no-flicker
 */

/**
 * Wrapper around React.lazy to make sure that if a fallback component is displayed it will be shown for a minimum amount of time to prevent flickering.
 * @param {importCallback} import_cb 
 * @param {Object} [options]
 * @param {Number} [options.time_before_fallback=200] - The time before the fallback component will display (use usePastDelay hook in component), defaults to 200
 * @param {Number} [options.minimum_fallback_time=500] - The minimum amount of time the fallback components will be shown if it does show up, defaults to 500
 * @returns {React.LazyExoticComponent<React.ComponentType.<any>>}
 * @memberof module:react-lazy-no-flicker
 */
function lazy(import_cb, options = {}) {
	const { time_before_fallback = 200, minimum_fallback_time = 500 } = options;
	const minimum_pause = time_before_fallback + minimum_fallback_time;
	return React.lazy(() => {
		const start_time = new Date().getTime();
		return import_cb().then(module_exports => {
			const loading_time = new Date().getTime() - start_time;
			if (loading_time > time_before_fallback && loading_time < minimum_pause) return new Promise(resolve => setTimeout(() => resolve(module_exports), minimum_pause - loading_time));
			return module_exports;
		});
	});
}

export default lazy;
