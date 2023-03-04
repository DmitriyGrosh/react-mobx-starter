import React, { ComponentType, FC } from 'react';

export const HOC = <TInjectedProps, TOwnProps>(injectedProps: TInjectedProps) => {
	const withHoc = (Component: ComponentType<TInjectedProps & TOwnProps>): FC<TOwnProps> => {
		const WithPureLayout: FC<TOwnProps> = (props) => (
			<Component {...injectedProps} {...props} />
		);

		WithPureLayout.displayName = `WithPureLayout(${
			Component?.displayName ?? Component?.name
		})`;

		return WithPureLayout;
	};

	return withHoc;
};
