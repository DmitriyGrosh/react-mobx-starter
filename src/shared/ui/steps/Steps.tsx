import React, {
	Children,
	cloneElement,
	FC,
	ReactElement,
	PropsWithChildren,
	memo,
	ReactNode,
	isValidElement,
} from 'react';
import { isFunction, assign, map } from 'lodash';

import { IStepsContextProps, StepsContext } from './Steps.context';
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

export interface IStepsPropsT {
	color: BaseColors;
	isColumn: boolean;
	nonLinear?: boolean;
	activeStep: number;
	isValid?: boolean;
	isFirst: boolean;
	isLast: boolean;
	isActive: boolean;
	isCompleted: boolean;
	index: number;
	onSelect?: (step: number) => void;
}

const Steps: FC<PropsWithChildren<IStepsProps>> = memo(({
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
		// return map(steps, (step, index) => {
		// 	const isFirst = index === 0;
		// 	const isLast = index === length - 1;
		// 	const isActive = activeStep === index;
		// 	const isCompleted = !nonLinear && activeStep > index;
		// 	const isValidStep = isFunction(isValid) ? isValid(activeStep, index) : true;

		// 	const StepContext = (
		// 		<StepsContext.Provider
		// 			key={index}
		// 			value={{
		// 				isFirst,
		// 				isLast,
		// 				isActive,
		// 				isCompleted,
		// 				isValid: isValidStep,
		// 				index,
		// 				onSelect,
		// 				color,
		// 				isColumn,
		// 		}}
		// 		>
		// 			{step}
		// 		</StepsContext.Provider>
		// 	);

		// 	return cloneElement(StepContext as ReactElement);
		// });
		return Children.map(children, (child, index) => {
			const isFirst = index === 0;
			const isLast = index === length - 1;
			const isActive = activeStep === index;
			const isCompleted = !nonLinear && activeStep > index;
			const isValidStep = isFunction(isValid) ? isValid(activeStep, index) : true;

			
			return cloneElement(child as React.ReactElement, {
				isFirst,
				isLast,
				isActive,
				isCompleted,
				isValid: isValidStep,
				index,
				onSelect,
				color,
				isColumn,
			})

			
			

		}
			
		  )
	};

	return (
		<div className="steps" role="menubar">
			<div className="steps__container">
				<ol className="list">{render()}</ol>
			</div>
		</div>
	);
})

Steps.displayName = 'Steps';
Steps.defaultProps = {
	color: DefaultColor,
	isColumn: DefaultColumn,
	nonLinear: false,
};

export default assign(Steps, { Step });
