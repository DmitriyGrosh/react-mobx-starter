import { RefObject, useEffect } from 'react';

export function useHandleInside<T extends HTMLElement = HTMLElement,>(
	insideRef: RefObject<T>,
	handler: Handler,
	mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
) {
useEffect(() => {
	const callback = (event: MouseEvent) => {
		const childEl = insideRef?.current;

		if ((!childEl || childEl.contains(event.target as Node)) && childEl === event.target) {
			handler(event);
		}
	};

	document.addEventListener(mouseEvent, callback);

	return () => document.removeEventListener(mouseEvent, callback);
}, []);
}
