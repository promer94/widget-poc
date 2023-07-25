import Component from '~/app/component'
import { NextResponse } from 'next/server'
// @ts-ignore
export const GET = () => {
	const text = Component()
	return NextResponse.json(JSON.parse(JSON.stringify(text)))
}