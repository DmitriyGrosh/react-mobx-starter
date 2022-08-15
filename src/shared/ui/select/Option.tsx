import React, { FC, useContext, PropsWithChildren, Children, useEffect } from 'react';
import { ISelectContext, SelectContext } from './Select.context';

interface IOption {
	value: string | number;
}

const Option: FC<PropsWithChildren<IOption>> = ({ children, value }) => {
	const { ref, activeElement, setActiveElement, ...rest } = useContext<ISelectContext>(SelectContext);
	const isActive = activeElement?.value === value.toString();
	const label = Children.toArray(children)[0];

	const handleChangeActiveElement = () => {
		setActiveElement({
			label: label as string,
			value: value.toString(),
		});
	};

	useEffect(() => {
		if (isActive && !activeElement?.label) {
			setActiveElement((prev) => ({
				...prev,
				label: label as string,
			}));
		}
	}, []);

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
		<div role="button" onClick={handleChangeActiveElement}>
			<label>{children}</label>
			<input {...rest} ref={ref} type="radio" value={value} checked={isActive} />
		</div>
	);
};

Option.displayName = 'Option';

export default Option;
