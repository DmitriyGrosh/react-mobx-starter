import React, {
	Children,
	cloneElement, FC,
	PropsWithChildren,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from 'react';
import { assign, map, isEqual } from 'lodash';
import { Control, Controller } from 'react-hook-form';

import { UseFormStateReturn } from 'react-hook-form/dist/types';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form/dist/types/controller';

import Cross from 'assets/svg/Cross';
import { joinClassNames } from '../../lib/cx';
import { useHandleOutside, useHandleInside } from '../../lib/hooks';

import { IActiveElement, MultiSelectContext } from './MultiSelect.context';
import Option from './Option';

import './MultiSelect.scss';

interface IMultiSelect {
	color?: BaseColors;
	defaultValue?: IActiveElement | IActiveElement[];
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
	const selectedContainerRef = useRef<HTMLDivElement>(null);
	const optionsClassName = joinClassNames(`options ${isOpen && 'options__active'}`);

	const toggleOpen = () => {
		setIsOpen((prev) => !prev);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const onChangeRef = useRef<any>(null);

	const handleDeleteElement = (current: IActiveElement) => {
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

	useHandleOutside<HTMLDivElement>(multiSelectRef, handleClose, 'mousedown');
	useHandleInside<HTMLDivElement>(selectedContainerRef, toggleOpen, 'mousedown');

	useEffect(() => {
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
	}, [deletedElement]);

	useEffect(() => {
		const updateElements = onChangeRef.current;
		if (defaultValue && updateElements) {
			if (Array.isArray(defaultValue)) {
				updateElements([...defaultValue]);
				setActiveElements([...defaultValue]);
			} else {
				updateElements([defaultValue]);
				setActiveElements([defaultValue]);
			}
		}
	}, []);

	return (
		<div ref={multiSelectRef} className={`multi-select-color-${color}`}>
			{/* eslint-disable-next-line max-len */}
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
			<div ref={selectedContainerRef} className="selected-container">
				{activeElements.length ? (
					<>
						{map(activeElements, (el, index) => (
							<div key={index} className="selected-container__selected">
								<span className="text">{el.label}</span>
								{/* eslint-disable-next-line max-len */}
								{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
								<div className="delete" onClick={() => handleDeleteElement(el)}>
									<Cross />
								</div>
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
