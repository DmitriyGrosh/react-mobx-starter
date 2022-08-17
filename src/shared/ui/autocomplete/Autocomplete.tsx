import React, { forwardRef } from 'react';

interface IAtocomplete {
	color?: BaseColors;
}

const Autocomplete = forwardRef<HTMLInputElement, IAtocomplete>((props, ref) => {

	return (
		<>

		</>
	);
});

Autocomplete.displayName = 'Autocomplete';
export default Autocomplete;
