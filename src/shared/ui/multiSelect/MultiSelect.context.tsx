import {
	createContext,
	Dispatch,
	SetStateAction,
} from 'react';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';

export type SelectAction = 'add' | 'delete';

export interface IActiveElement {
	label?: string;
	value?: any;
}

export interface IMultiSelect extends ControllerRenderProps<any, any>{
	setActiveElements: Dispatch<SetStateAction<IActiveElement[]>>;
}

export const MultiSelectContext = createContext({} as IMultiSelect);
