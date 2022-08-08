import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { map } from 'lodash';

import Steps from './Steps';

const steps = ['Primary Patient', 'Duplicate Patients', 'Confirmation', 'Duplicate Patients'];

const isValid = (step: number, index: number) => {
	return true;
};

export default {
	title: 'Shared/Steps',
	component: Steps,
	args: {
		nonLinear: false,
		column: false,
		isValid,
	},
	argTypes: {
		nonLinear: { control: { type: 'boolean' } },
		column: { control: { type: 'boolean' } },
		color: {
			options: ['black', 'white', 'gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof Steps>;

const Template: ComponentStory<typeof Steps> = ({ nonLinear, ...args }) => {
	const [activeStep, setActiveStep] = useState<number>(0);

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const handleComplete = () => {
		handleNext();
	};

	const props = {
		...args,
		nonLinear,
		activeStep,
		onSelect: setActiveStep,
	};

	return (
		<div>
			<Steps {...props}>
				{map(steps, (label, i) => (
					<Steps.Step key={i.toString(36)}>{label}</Steps.Step>
				))}
			</Steps>

			{!nonLinear && <div className="text-primary">{steps?.[activeStep] ?? 'Succesed!'}</div>}

			{!nonLinear && (
				<div>
					{activeStep !== steps.length && (
						<>
							<button onClick={handleBack} disabled={activeStep === 0 || steps.length < activeStep + 1}>
								Back
							</button>
							{steps.length !== activeStep + 1 ? (
								<button onClick={handleNext} disabled={steps.length < activeStep + 1}>
									Next
								</button>
							) : (
								<button onClick={handleComplete}>Finish</button>
							)}
						</>
					)}
					{activeStep === steps.length && <button onClick={handleReset}>Reset</button>}
				</div>
			)}
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	nonLinear: false,
	isColumn: false,
	isValid,
};
