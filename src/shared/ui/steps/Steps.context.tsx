import { createContext } from 'react';

export interface IStepsContextProps {
	index: number;
	isFirst: boolean;
	isLast: boolean;
	isActive: boolean;
	isCompleted: boolean;
	isValid: boolean;
	onSelect?: (step: number) => void;
	isColumn: boolean;
	color: BaseColors;
}

export const StepsContext = createContext({} as IStepsContextProps);
