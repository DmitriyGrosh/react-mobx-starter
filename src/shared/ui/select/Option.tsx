import React, { FC, useContext, PropsWithChildren } from 'react';
import { ISelectContext, SelectContext } from './Select.context';

interface IOption {
	value: string | number;
}

const Option: FC<PropsWithChildren<IOption>> = ({ children, value }) => {
	const { ref, activeElement, setActiveElement, ...rest } = useContext<ISelectContext>(SelectContext);

	const isActive = activeElement === value.toString();

	const handleChangeActiveElement = () => {
		setActiveElement(value.toString());
	};

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
