import React, {
	ChangeEvent,
	InputHTMLAttributes,
	FocusEvent,
	forwardRef,
	useState,
	useEffect, useRef,
} from 'react';
import { filter, map } from 'lodash';

import { joinClassNames } from '../../lib/cx';
import { useDebounce, useHandleOutside } from '../../lib/hooks';

import { Spinner } from '../spinner';

import './Autocomplete.scss';

interface IAutocomplete extends InputHTMLAttributes<HTMLInputElement> {
	color?: BaseColors;
	options: any[];
	getOptionLabel: (data: any) => string;
	isLoading?: boolean;
	debounce?: number;
}

const Autocomplete = forwardRef<HTMLInputElement, IAutocomplete>((props, ref) => {
	const {
		onChange,
		name,
		defaultValue,
		color,
		options,
		getOptionLabel,
		isLoading,
		debounce,
		onFocus,
		...rest
	} = props;

	const [isOpenOptions, setIsOpenOptions] = useState<boolean>(false);
	const [autocompleteValue, setAutocompleteValue] = useState<any>(defaultValue || '');
	const [filteredOptions, setFilteredOptions] = useState<any[]>(options);
	const debounceValue = useDebounce<any>(autocompleteValue, debounce);
	const autocompleteRef = useRef<HTMLDivElement>(null);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		if (onChange) {
			const defaultValueTest = {
				target: {
					name,
					value: { value },
				},
			};

			onChange(defaultValueTest as unknown as ChangeEvent<HTMLInputElement>);
		}
		if (!isOpenOptions) {
			setIsOpenOptions(true);
		}

		setAutocompleteValue(value);
	};

	const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
		if (onFocus) {
			onFocus(event);
		}

		if (!isOpenOptions) {
			setIsOpenOptions((prev) => !prev);
		}
	};

	const handleClose = () => {
		setIsOpenOptions(false);
	};

	useHandleOutside<HTMLDivElement>(autocompleteRef, handleClose, 'mousedown');
	useEffect(() => {
		const data = filter(options, (el) => getOptionLabel(el).includes(debounceValue));

		if (!debounceValue) {
			setFilteredOptions(options);
		} else {
			setFilteredOptions(data);
		}
	}, [debounceValue]);

	return (
		<div ref={autocompleteRef} className={`autocomplete-${color}`}>
			{/* eslint-disable-next-line max-len */}
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
			<div className={`autocomplete-${color}__container`}>
				<input
					{...rest}
					onChange={handleChange}
					onFocus={handleFocus}
					ref={ref}
					value={autocompleteValue}
					className={`autocomplete-${color}__container__input`}
				/>
				{isLoading && <Spinner spinnerSize="small" className={`autocomplete-${color}__container__spinner`} />}
			</div>
			<div
				className={
				joinClassNames(`autocomplete-${color}__list ${isOpenOptions && `autocomplete-${color}__list__active`}`)
			}
			>
				{filteredOptions.length ? (
					<>
						{map(filteredOptions, (option, index) => {
							const node = getOptionLabel(option);

							const clickHandler = () => {
								const value = {
									target: {
										value: option,
									},
								} as unknown as ChangeEvent<HTMLInputElement>;

								handleChange(value);
								handleClose();
							};

							return (
								// eslint-disable-next-line max-len
								// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
								<div
									onClick={clickHandler}
									key={index}
									className="list-row"
								>
									{node}
								</div>
							);
						})}
					</>
				) : (
					<div className="list-row list-row__disabled">
						No options
					</div>
				)}
			</div>
		</div>
	);
});

Autocomplete.defaultProps = {
	color: 'blue',
	debounce: 0,
};

Autocomplete.displayName = 'Autocomplete';
export default Autocomplete;
