import {
	createContext,
	Dispatch,
	ForwardedRef,
	InputHTMLAttributes,
	SetStateAction,
	useContext,
	Context,
} from 'react';

export interface IActiveElement {
	value?: string | number;
	label?: string;
}

export interface ISelectContext extends InputHTMLAttributes<HTMLInputElement> {
	ref: ForwardedRef<HTMLInputElement>;
	activeElement?: IActiveElement;
	setActiveElement: Dispatch<SetStateAction<IActiveElement>>;
}

export const SelectContext = createContext({} as ISelectContext);
