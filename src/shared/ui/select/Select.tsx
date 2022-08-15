import React, {
	Children,
	PropsWithChildren,
	ReactElement,
	InputHTMLAttributes,
	ChangeEvent,
	cloneElement,
	forwardRef,
	useState,
	useEffect,
} from 'react';
import { assign, map } from 'lodash';

import { IActiveElement, SelectContext } from './Select.context';

import Option from './Option';

interface ISelect extends InputHTMLAttributes<HTMLInputElement> {
	value?: string | number;
	color?: BaseColors;
}

const Select = forwardRef<HTMLInputElement, PropsWithChildren<ISelect>>((props, ref) => {
	const { children, value, ...rest } = props;
	const [activeElement, setActiveElement] = useState<IActiveElement>({
		label: '',
		value: value?.toString(),
	});

	const options = Children.toArray(children);

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

	console.log('==========>activeElement.label', activeElement.label);
	return (
		<div className="select">
			{render()}
		</div>
	);
});

Select.displayName = 'Select';

export default assign(Select, { Option });
