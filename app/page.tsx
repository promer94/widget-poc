'use client'
import useSWR from 'swr'
import React from 'react'
import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);
import { map, range } from 'lodash'

const treverse = (data: React.ReactElement | null) => {
	if(!data) return null
	return {
		...data, '$$typeof': Symbol.for('react.element'), 
		_store: { validated: true },
		props: {
			...data.props,
			children: Array.isArray(data.props?.children) ? data.props.children.map(treverse) : data.props?.children
		}
	}
}

const Widget = () => {
	const { data: pureJson } = useSWR('/api/widget', (url) => fetch(url).then((res) => res.json()))
	return treverse(pureJson)
}
const dom = map(range(2), (i) => {
	return (
		<div className='h-full w-full' key={i}>
			<Widget></Widget>
		</div>
	);
})
const layout = map(new Array(2), function (_, i) {
	const y = Math.ceil(Math.random() * 4) + 1;
	return {
		x: (i * 2) % 12,
		y: Math.floor(i / 6) * y,
		w: 2,
		h: y,
		i: i.toString(),
		resizeHandles: ['e', 'se', 's', 'sw', 'w'] as any,
	};
});
export default function Home() {
	return (
		<ReactGridLayout
			layout={layout}
		>
			{dom}
		</ReactGridLayout>
	)
}
