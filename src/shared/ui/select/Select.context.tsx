import {
	createContext,
	Dispatch,
	ForwardedRef,
	InputHTMLAttributes,
	SetStateAction,
	useContext,
	Context,
} from 'react';

export interface ISelectContext extends InputHTMLAttributes<HTMLInputElement> {
	ref: ForwardedRef<HTMLInputElement>;
	activeElement?: string | number;
	setActiveElement: Dispatch<SetStateAction<string | number | undefined>>;
}

export const SelectContext = createContext({} as ISelectContext);
