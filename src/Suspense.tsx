import { ComponentProps, PropsWithChildren, Suspense } from "react";
import usePastDelay from './usePastDelay';

function DelayedFallback(props: PropsWithChildren & { delay?: number }) {
	const past_delay = usePastDelay(props.delay);

	if (! past_delay) return null;

	return <>{ props.children }</>;
}

interface CustomSuspenseProps extends ComponentProps<typeof Suspense> {
	/* The delay time in ms, defaults to 200 */
	delay?: number
}

function CustomSuspense(props: CustomSuspenseProps) {
	const { fallback, delay, ...rest } = props;
	return <Suspense { ...rest } fallback={<DelayedFallback delay={delay}>{ fallback }</DelayedFallback>} />;
}

export default CustomSuspense;
