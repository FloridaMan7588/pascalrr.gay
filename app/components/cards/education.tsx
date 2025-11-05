'use client';
import Link from 'next/link';
import { ReactElement } from 'react';

interface Props {
	url: string;
	title: string;
	date: string;
	description: string;
	activities: ReactElement;
}


export default function EducationCard({ url, title, date, description, activities }: Props) {

	return (
		<div className='bg-ctp-crust rounded-[32px] p-2'>
			<div className='grid md:p-2 md:flex md:justify-between text-left font-bold md:items-center'>
				<Link href={url} className='text-ctp-flamingo md:text-ctp-text hover:text-ctp-flamingo'><h2 className='p-2 text-xl'>{title}</h2></Link>
				<h2 className='text-md p-2'>{date}</h2>
			</div>
			<div className='p-2 text-left sm:text-start'>
				<p className='sm:px-2'>{description.split('|')[0]}</p>
				<p className='sm:px-2'>{description.split('|')[1]}</p>
			</div>
			<div className='text-ctp-text p-2 md:px-8 justify-center min-w-fit sm:text-center'>
				<h3 className='text-xl font-bold py-4'>Activities</h3>
				<hr className='bg-ctp-text'></hr>
				{activities}
			</div>
		</div>
	)
}