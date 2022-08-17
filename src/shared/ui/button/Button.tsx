import React, {
	FC,
	PropsWithChildren,
	ButtonHTMLAttributes,
} from 'react';

import { joinClassNames } from '../../lib/cx';

import './Button.scss';

type Variant = 'text' | 'contained' | 'outlined';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	color?: BaseColors;
	size?: BaseSize,
	variant?: Variant,
}

const Button: FC<PropsWithChildren<IButton>> = ({
		children,
		color,
		className,
		size,
		variant,
		...props
	}) => {
	const classNameColor = `button-color-${color}`;
	const classNameVariant = `${classNameColor}__${variant}`;
	const classNameSize = `${classNameColor}__${size}`;
	const cx = joinClassNames(`${classNameColor} ${className} ${classNameVariant} ${classNameSize}`);

	return (
		<button
			className={`button ${cx}`}
			{...props}
		>
			{children}
		</button>
	);
};

Button.displayName = 'Button';
Button.defaultProps = {
	color: 'red',
	size: 'large',
	variant: 'outlined',
};

export default Button;
