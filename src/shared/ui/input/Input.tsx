import React, {
	forwardRef,
	InputHTMLAttributes,
	PropsWithChildren,
	useId,
} from 'react';
import { joinClassNames } from '../../lib/cx';

import './Input.scss';

type Variant = 'standard' | 'outlined';

interface IInput extends InputHTMLAttributes<HTMLInputElement>{
	color?: BaseColors;
	variant?: Variant;
	label?: string;
}

const Input = forwardRef<HTMLInputElement, PropsWithChildren<IInput>>((props, ref) => {
	const { children, color, className, label, variant, ...rest } = props;
	const classNamesColor = `input-color-${color}`;
	const classNameVariant = `field__${variant}`;
	const cx = joinClassNames(`${className} ${classNameVariant}`);
	const inputId = useId();

	return (
		<div className={classNamesColor}>
			<div className={`field ${cx}`}>
				<label htmlFor={inputId} className="ha-screen-reader">{label}</label>
				<input id={inputId} className="field__input" {...rest} />
				<span className="field__label-wrap" aria-hidden="true">
          <span className="field__label">{label}</span>
    </span>
			</div>
		</div>
	);
});

Input.defaultProps = {
	color: 'blue',
	variant: 'standard',
};
export default Input;
