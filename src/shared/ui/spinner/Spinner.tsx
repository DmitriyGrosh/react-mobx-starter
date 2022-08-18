import React, { FC, AllHTMLAttributes } from 'react';
import { joinClassNames } from '../../lib/cx';

import './Spinner.scss';

interface ISpinner extends AllHTMLAttributes<HTMLDivElement> {
	spinnerSize?: BaseSize;
}

const Spinner: FC<ISpinner> = ({ className, spinnerSize, ...rest }) => (
	<div {...rest} className={joinClassNames(`lds-ring lds-ring__${spinnerSize} ${className}`)}>
		<div />
		<div />
		<div />
		<div />
	</div>
);

Spinner.displayName = 'Spinner';
export default Spinner;
