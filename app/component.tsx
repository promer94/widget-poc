'use server'


const Component = () => {
	return (
		<div className='h-full w-full p-5 bg-red-100 flex flex-col justify-around'>
			<a href='https://vercel.com'>vercel</a>
			<div className='hover:text-gray-200 text-white transition-all'>hover me</div>
			<a href='https://vercel.com'>netlify</a>
		</div>
	)
}

export default Component