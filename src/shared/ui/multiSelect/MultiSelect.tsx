import React, {
	Children,
	cloneElement, FC,
	forwardRef,
	InputHTMLAttributes,
	PropsWithChildren,
	ReactElement, useEffect, useRef,
	useState,
} from 'react';
import { assign, map, isEqual } from 'lodash';
import { Control, Controller } from 'react-hook-form';

import { IActiveElement, MultiSelectContext, SelectAction } from './MultiSelect.context';
import Option from './Option';
import { UseFormStateReturn } from 'react-hook-form/dist/types';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import { joinClassNames } from '../../lib/cx';
import { useHandleOutside } from '../../lib/hooks';
import { useHandleInside } from '../../lib/hooks/useHandleInside';

import './MultiSelect.scss';

interface IMultiSelect {
	color?: BaseColors;
	defaultValue?: string | number;
	control: Control;
	controlName: string;
	label: string;
}

interface ITest<TFieldValues> {
	field: ControllerRenderProps<TFieldValues, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<TFieldValues>;
}

const MultiSelect: FC<PropsWithChildren<IMultiSelect>> = ({
		control,
		defaultValue,
		color,
		controlName,
		children,
		label,
	}) => {
	const options = Children.toArray(children);
	const [activeElements, setActiveElements] = useState<IActiveElement[]>([]);
	const [deletedElement, setDeletedElement] = useState<IActiveElement>({
		label: undefined,
		value: null,
	});
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const multiSelectRef = useRef<HTMLDivElement>(null);
	const selectedContainertRef = useRef<HTMLDivElement>(null);

	const toggleOpen = () => {
		setIsOpen((prev) => !prev);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const onChangeRef = useRef<any>(null);

	const handleDeleteElement = (current: IActiveElement) => {
		console.log('==========>1', 1);
		setDeletedElement(current);
	};

	const render = ({
			field: { onChange, onBlur, value, name, ref },
			fieldState: { invalid, isTouched, isDirty, error },
			formState,
	}: ITest<any>) => {
		onChangeRef.current = onChange;
		const elements = map(options, (option, index) => {
			const context = {
				ref,
				onBlur,
				onChange,
				value,
				name,
				setActiveElements,
			};

			const multiSelectContext = (
				<MultiSelectContext.Provider key={index.toString(36)} value={context}>
					{option}
				</MultiSelectContext.Provider>
			);

			return cloneElement(multiSelectContext as ReactElement);
		});

		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <>{elements}</>;
	};

	useEffect(() => {
		console.log('==========>2', 2);
		const updateElements = onChangeRef.current;

		if (updateElements && deletedElement.label) {
			const currentValues = [...activeElements];

			activeElements.forEach((el, index) => {
				if (isEqual(el, deletedElement)) {
					currentValues.splice(index, 1);
				}
			});

			setActiveElements(currentValues);
			updateElements(currentValues);
		}
	}, [deletedElement.value || deletedElement.label]);

	const optionsClassName = joinClassNames(`options ${isOpen && 'options__active'}`);

	// useHandleOutside<HTMLDivElement>(multiSelectRef, handleClose, 'mousedown');
	useHandleInside<HTMLDivElement>(selectedContainertRef, toggleOpen, 'mousedown');

	// useEffect(() => {
	// 	const callback = (event: MouseEvent) => {
	// 		const el = multiSelectRef?.current;
	//
	// 		if (!el || el.contains(event.target as Node)) {
	// 			console.log('==========>1', 1);
	// 			console.log('==========>el', el);
	// 			console.log('==========>event.target', event.target);
	// 			console.log('==========>event.target', (event.target as Node).contains(el));
	// 			// return;
	// 		}
	// 	};
	// 	document.addEventListener('click', callback);
	// }, []);

	return (
		<div ref={multiSelectRef} className={`multi-select-color-${color}`}>
			{/* eslint-disable-next-line max-len */}
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
			<div ref={selectedContainertRef} className="selected-container">
				{activeElements.length ? (
					<>
						{map(activeElements, (el, index) => (
							<div key={index} className="selected-container__selected">
								<span className="text">{el.label}</span>
								<button className="delete" onClick={() => handleDeleteElement(el)}>
									delete
								</button>
							</div>
						))}
					</>
				) : <span className="selected-container__label">{label}</span>}
			</div>
			<div className={optionsClassName}>
				<Controller
					control={control}
					name={controlName}
					render={render}
				/>
			</div>
		</div>
	);
};

MultiSelect.displayName = 'MultiSelect';
MultiSelect.defaultProps = {
	color: 'blue',
};

export default assign(MultiSelect, { Option });
