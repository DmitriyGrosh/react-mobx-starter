import React, {
	Children,
	PropsWithChildren,
	ReactElement,
	InputHTMLAttributes,
	ChangeEvent,
	cloneElement,
	forwardRef,
	useState,
	useEffect, useRef,
} from 'react';
import { assign, map } from 'lodash';

import { joinClassNames } from '../../lib/cx';
import { useHandleOutside } from '../../lib/hooks';

import { IActiveElement, SelectContext } from './Select.context';
import Option from './Option';

import './Select.scss';

interface ISelect extends InputHTMLAttributes<HTMLInputElement> {
	value?: string | number;
	color?: BaseColors;
}

const Select = forwardRef<HTMLInputElement, PropsWithChildren<ISelect>>((props, ref) => {
	const { children, value, color, ...rest } = props;
	const [activeElement, setActiveElement] = useState<IActiveElement>({
		label: '',
		value: value?.toString(),
	});
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const selectRef = useRef<HTMLDivElement>(null);

	const options = Children.toArray(children);

	const toggleOpen = () => {
		setIsOpen((prev) => !prev);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const render = (): JSX.Element[] => {
		return map(options, (option, index) => {
			const context = {
				activeElement,
				setActiveElement,
				ref,
				...rest,
			};

			const selectContext = (
				<SelectContext.Provider key={index} value={context}>
					{option}
				</SelectContext.Provider>
			);

			return cloneElement(selectContext as ReactElement);
		});
	};

	useEffect(() => {
		if (rest.onChange && value) {
			const defaultValue = {
				target: {
					name: rest.name,
					value: value.toString(),
				},
			};

			rest.onChange(defaultValue as ChangeEvent<HTMLInputElement>);
		}
	}, []);

	const optionsClassName = joinClassNames(`options ${isOpen && 'options__active'}`);

	useHandleOutside<HTMLDivElement>(selectRef, handleClose, 'mousedown');

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div ref={selectRef} onClick={toggleOpen} className={`select-color-${color}`}>
			<span className="selected">{activeElement.label ?? 'Select your variant'}</span>
			<div className={optionsClassName}>
				{render()}
			</div>
		</div>
	);
});

Select.displayName = 'Select';
Select.defaultProps = {
	color: 'blue',
};

export default assign(Select, { Option });
