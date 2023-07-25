'use client'
import useSWR from 'swr'
import React from 'react'
import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);
import { map, range } from 'lodash'
import Component from './component';
import { buildReactElement } from './utils';
const Widget = () => {
	const { data: pureJson } = useSWR('/api/widget', (url) => fetch(url).then((res) => res.json()))
	return buildReactElement(pureJson)
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
	const { data } = useSWR('foo', Component)
	console.log('result', data)
	return (
		<ReactGridLayout
			layout={layout}
		>
			{dom}
		</ReactGridLayout>
	)
}
