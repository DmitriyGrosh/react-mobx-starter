import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from './Button';

export default {
	title: 'Shared/Button',
	component: Button,
	args: {
		color: 'blue',
		size: 'large',
		variant: 'outlined',
	},
	argTypes: {
		size: {
			options: ['small', 'medium', 'large'],
			control: { type: 'radio' },
		},
		variant: {
			options: ['text', 'contained', 'outlined'],
			control: { type: 'radio' },
		},
		color: {
			options: ['black', 'white', 'gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({ ...args }) => {
	return (
		<div>
			<Button {...args}>тест</Button>
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	color: 'blue',
	variant: 'text',
	size: 'small',
};
