import { ReactElement } from 'react'

interface Props {
	content: ReactElement;
	skills: ReactElement;
}

export default function AboutCard({ content, skills }: Props) {
	return (
		<div className='bg-ctp-mantle rounded-[45px]'>
			<h1 className='text-ctp-text text-center text-4xl font-bold px-7 py-4'>About Me</h1>
			<div className='grid-cols-1 grid lg:flex lg:justify-center place-items-center px-4'>
				<div className='text-ctp-text text-center px-2 md:text-2xl md:px-16 text-lg md:py-8'>
					{content}
				</div>
				<div className="py-8">
					<div className='text-ctp-text px-8 md:px-16 py-4 rounded-[45px] justify-center min-w-fit bg-crust'>
						<h2 className='text-3xl font-bold py-4 text-center'>My Skills</h2>
						{skills}
					</div>
				</div>
			</div>
		</div>
	)
}