import React, {
	Children,
	FC,
	PropsWithChildren,
	useContext,
} from 'react';
import { isEqual } from 'lodash';

import { MultiSelectContext } from './MultiSelect.context';

import { joinClassNames } from '../../lib/cx';

interface IOption {
	data: any;
}

const Option: FC<PropsWithChildren<IOption>> = ({ children, data }) => {
	const {
		onChange,
		setActiveElements,
		value,
		...rest
	} = useContext(MultiSelectContext);
	const label = Children.toArray(children)[0] as string;

	const currentElement = {
		label,
		data,
	};

	const handleChange = () => {
		if (value) {
			const currentValues = [...value];
			let counter = 0;

			(value as any[])?.forEach((el, index) => {
				if (isEqual(el, currentElement)) {
					counter += 1;
					currentValues.splice(index, 1);
				}
			});

			if (!counter) {
				setActiveElements([...value, currentElement]);
				onChange([...value, currentElement]);
			} else {
				setActiveElements(currentValues);
				onChange(currentValues);
			}
		} else {
			setActiveElements([currentElement]);
			onChange([currentElement]);
		}
	};

	const isActive = (): boolean => {
		let active = false;

		if (value) {
			(value as any[]).forEach((el) => {
				if (isEqual(el, currentElement)) {
					active = true;
				}
			});
		}

		return active;
	};

	return (
		<div className={joinClassNames(`multi-select-option ${isActive() && 'multi-select-option__active'}`)}>
			<span className="multi-select-option__label">{children}</span>
			<input {...rest} className="multi-select-option__input" value={value} onChange={handleChange} type="checkbox" />
		</div>
	);
};

Option.displayName = 'Multi Select Option';

export default Option;
