import { RefObject, useEffect } from 'react';

export function useHandleOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: Handler,
	mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
	useEffect(() => {
		const callback = (event: MouseEvent) => {
			const el = ref?.current;

			if (!el || el.contains(event.target as Node)) {
				return;
			}

			handler(event);
		};
		document.addEventListener(mouseEvent, callback);

		return () => document.removeEventListener(mouseEvent, callback);
	}, []);
}
