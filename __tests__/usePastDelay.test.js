/* eslint-disable react/prop-types */
import React from 'react';
import { render, wait } from '@testing-library/react';

import usePastDelay from '../src/usePastDelay';

function Loading({delay}) {
	const past_delay = usePastDelay(delay);
	if (! past_delay) return null;
	return <div>Loading ...</div>;
}

test('component is empty and then renders a short while later', async () => {
	const start_time = new Date();
	const { container } = render(<Loading />);
	expect(container).toBeEmptyDOMElement();
	await wait(() => expect(container).not.toBeEmptyDOMElement());
	const stop_time = new Date();
	expect(stop_time - start_time).toBeGreaterThanOrEqual(200);
	expect(stop_time - start_time).toBeLessThan(300);
});

test('custom delay', async () => {
	const start_time = new Date();
	const { container } = render(<Loading delay="300" />);
	expect(container).toBeEmptyDOMElement();
	await wait(() => expect(container).not.toBeEmptyDOMElement());
	const stop_time = new Date();
	expect(stop_time - start_time).toBeGreaterThanOrEqual(300);
	expect(stop_time - start_time).toBeLessThan(400);
});
