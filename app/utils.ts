import { Element } from 'react-is'

interface RSCSimplePlayload {
	type?: HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
	props?: {
		children: RSCSimplePlayload[] | RSCSimplePlayload
		[key: string]: any
	}
	$$typeof?: Symbol
}

export const buildReactElement: (playload: RSCSimplePlayload | RSCSimplePlayload[] | null) => any = (playload) => {
	if (!playload) return null
	if (Array.isArray(playload) && playload.length > 0) {
		return playload.map(buildReactElement)
	}
	if (!Array.isArray(playload)) {
		if (playload.props && Array.isArray(playload.props.children) && playload.props.children.length > 0) return {
			...playload,
			$$typeof: Element,
			props: {
				...playload.props,
				children: buildReactElement(playload.props.children)
			}
		}
		if (!playload.type) {
			return {
				...buildReactElement(playload.props?.children || null),
			}
		}
	}
	return {
		...playload,
		$$typeof: Element,
	}
}