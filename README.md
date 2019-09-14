# react-lazy-no-flicker

This light-weight library contains a hook to prevent the display of your loading component until a certain amount of time has passed, and wrapper around `React.lazy` to ensure that if the component is displayed it stays on screen for a minimum amount of time (defaults to half a second).

While purposely making a load take longer is a bit counter-intuitive, I think it gives a nicer user experience.

## Usage

```javascript
import React, { useState } from 'react';
import { usePastDelay, lazy } from 'react-lazy-no-flicker';

function Loading() {
	const past_delay = usePastDelay();
	if (! past_delay) return null;
	return <div>Loading ...</div>;
}

const MyComponent = lazy(() => import('./MyComponent'));

function App() {
	const [ show, setShow ] = useState(false);

	return <div>
		<button onClick={() => setShow(current => ! current)}>Toggle Component</button>
		<React.Suspense fallback={<Loading />}>
			{ show && <MyComponent /> }
		</React.Suspense>
	</div>;
}
```

## usePastDelay

This hook takes one optional parameter for the amount of time to delay before it returns true.  This defaults to 200ms.  If you change this value be sure to modify `time_before_fallback` option in lazy to match.

## lazy

Takes a function that performs the `import` call as the first argument.  Second argument is an optional options object with the following defaults ...

```javascript
{
	time_before_fallback: 200, // The amount of time in ms before the loading fallback is displayed, should match parameter given to usePastDelay
	minimum_fallback_time: 500 // The minimum amount of time in ms the loading fallback will be displayed for
}
```

- Any imports taking less than `time_before_fallback` to load will be displayed immediately after loading.
- Any imports taking more than `time_before_fallback` to load will display the fallback for at least `minimum_fallback_time` before returning.
