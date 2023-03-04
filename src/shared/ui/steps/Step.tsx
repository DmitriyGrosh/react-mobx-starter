import React, { FC, memo, PropsWithChildren } from 'react';
import { isFunction } from 'lodash';

import { HOC } from '../hoc';

import './Step.scss';

import { IStepsPropsT } from './Steps';

const StepTest: FC<PropsWithChildren<IStepsPropsT>> = (props) => {
	const {
		isFirst,
		isLast,
		isActive,
		isCompleted,
		isValid,
		onSelect,
		index,
		isColumn,
		color,
		children,
	} =	props;
	const classNameColor = `step-color-${color}`;
	const isDefaultBgColor = isActive || isCompleted ? classNameColor : '';

	const handleChange = () => {
		if (!isActive && isFunction(onSelect)) onSelect(index);
	};

	return (
		<li className="step">
			{isValid ? (
				<div className={`step__valid ${isColumn ? 'column' : 'row'}`}>
					<button
						tabIndex={0}
						onClick={handleChange}
						className={`round ${isDefaultBgColor}`}
					>
						{isCompleted ? (
							<img
								src="https://api.iconify.design/material-symbols:check-small.svg?color=white"
								alt="check"
							/>
						) : (
							<span>{index + 1}</span>
						)}
					</button>
					<span
						role="button"
						tabIndex={0}
						aria-hidden="true"
						onClick={handleChange}
					>
             {children}
					</span>
				</div>
			) : (
				<div className="step__invalid">
					{isFirst || isLast ? 'styles.errorImage ' : 'styles.errorImageCustom'}
				</div>
			)}
		</li>
	);
};

const Step = memo(StepTest);

Step.displayName = 'Step';

export default HOC<IStepsPropsT, PropsWithChildren>({} as IStepsPropsT)(Step);
