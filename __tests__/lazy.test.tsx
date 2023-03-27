import * as React from 'react';
import { render, waitFor } from '@testing-library/react';

import lazy from '../src/lazy';
import Suspense from '../src/Suspense';

function Loader({children}) {
	return <Suspense fallback={<div data-testid="loading">Loading ...</div>}>
		{children}
	</Suspense>;
}

test('quick load (no fallback)', async () => {
	const Comp = lazy(() => new Promise(resolve => setTimeout(resolve, 100)).then(() => import('../__fixtures__/Loaded')));
	const { container, getByTestId, queryByTestId } = render(<Loader><Comp /></Loader>);
	expect(container).toBeEmptyDOMElement();
	await waitFor(() => {
		const loading = queryByTestId('loading');
		expect(loading).toBeNull();
		getByTestId('loaded');
	});
});

test('medium load (minimum fallback)', async () => {
	const start_time = Date.now();
	const Comp = lazy(() => new Promise(resolve => setTimeout(resolve, 250)).then(() => import('../__fixtures__/Loaded')));
	const { findByTestId } = render(<Loader><Comp /></Loader>);
	await findByTestId('loading');
	await findByTestId('loaded');
	const loading_time = Date.now() - start_time;
	expect(loading_time).toBeGreaterThanOrEqual(700);
	expect(loading_time).toBeLessThan(800);
});

test('long load (extended fallback)', async () => {
	const start_time = Date.now();
	const Comp = lazy(() => new Promise(resolve => setTimeout(resolve, 1000)).then(() => import('../__fixtures__/Loaded')));
	const { findByTestId } = render(<Loader><Comp /></Loader>);
	await findByTestId('loading');
	await findByTestId('loaded');
	const loading_time = Date.now() - start_time;
	expect(loading_time).toBeLessThan(1100);
});
