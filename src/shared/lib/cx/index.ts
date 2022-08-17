export const joinClassNames = (className: string) => {
	const regExp = /true|false|undefined/gi;
	const cleanClassName = className.replace(regExp, '')
		.trim()
		.split(' ')
		.filter((el) => el)
		.join(' ');

	return cleanClassName;
};
