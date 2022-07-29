import React, {
	Children,
	cloneElement,
	FC,
	ReactElement,
	PropsWithChildren,
} from 'react';
import { isFunction, assign, map } from 'lodash';

import { StepsContext } from './Steps.context';
import { DefaultColor, DefaultColumn } from './Steps.types';

import Step from './Step';

import './Steps.scss';

interface IStepsProps {
	color: BaseColors;
	isColumn: boolean;
	nonLinear?: boolean;
	activeStep: number;
	isValid?: (step: number, index: number) => boolean;
	onSelect?: (step: number) => void;
}

const Steps: FC<PropsWithChildren<IStepsProps>> = ({
	color,
	isColumn,
	nonLinear,
	isValid,
	activeStep,
	onSelect,
	children,
}) => {
	const steps = Children.toArray(children);
	const { length } = steps;

	const render = () => {
		return map(steps, (step, index) => {
			const isFirst = index === 0;
			const isLast = index === length - 1;
			const isActive = activeStep === index;
			const isCompleted = !nonLinear && activeStep > index;
			const isValidStep = isFunction(isValid) ? isValid(activeStep, index) : true;

			const StepContext = (
				<StepsContext.Provider value={{
						isFirst,
						isLast,
						isActive,
						isCompleted,
						isValid: isValidStep,
						index,
						onSelect,
						color,
						isColumn,
				}}
				>
					{step}
				</StepsContext.Provider>
			);

			return cloneElement(StepContext as ReactElement);
		});
	};

	return (
		<div className="steps" role="menubar">
			<div className="steps__container">
				<ol className="list">{render()}</ol>
			</div>
		</div>
	);
};

Steps.displayName = 'Steps';
Steps.defaultProps = {
	color: DefaultColor,
	isColumn: DefaultColumn,
	nonLinear: false,
};

export default assign(Steps, { Step });
