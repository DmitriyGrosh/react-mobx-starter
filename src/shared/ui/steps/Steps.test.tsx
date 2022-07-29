import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Steps from './Steps';

afterEach(cleanup);

describe('Steps Component', () => {
	it('Steps default snapshot', () => {
		const steps = render(
			<Steps color="blue" isColumn={false} activeStep={0}>
				<Steps.Step>text</Steps.Step>
			</Steps>,
		);
		screen.debug();
		expect(screen.getByRole('menubar')).toBeInTheDocument();
		expect(steps).toMatchSnapshot();
	});
});
