import Image from 'next/image';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGitAlt } from '@fortawesome/free-brands-svg-icons';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ReactNode } from 'react';

interface Props {
	title: string;
	description: string | ReactNode;
	image?: string | StaticImport;
	imageLink?: string;
	downloadUrl?: string;
	sourceUrl: string;
}

export default function ProjectCard({ title, description, image, imageLink, downloadUrl, sourceUrl }: Props) {
	if (typeof description === 'string') description = (<p className='text-xl text-left py-4'>{description}</p>)
	return (
		<div className='p-4 md:px-10 min-h-full bg-ctp-crust rounded-[32px]'>
			<div className='px-2 text-ctp-text grid-cols-1 grid place-items-center'>
				<div className='p-2 sm:h-48 md:h-64'>
					<h2 className='text-left text-3xl font-bold py-4'>{title}</h2>
					{description}
				</div>
				<div className='p-2'>
					{image && (
						<Link href={imageLink} className='flex justify-center items-center'>
							<div className='sm:w-64 sm:h-64 md:w-96 md:h-96 flex justify-center items-center overflow-hidden'>
								<Image
									src={image}
									alt={title + ' cover image'}
									className='object-contain w-full h-full p-8 hoverPop105'
									width={384}
									height={384}
									priority={false}
								/>
							</div>
						</Link>
					)}
				</div>
				<div className='p-2 min-w-full'>
					<hr></hr>
					<div className='grid grid-cols-2 items-center sm:flex sm:justify-between'>
						<div className='p-4'>
							<Link href={sourceUrl} aria-label={title + ' Source page'}><FontAwesomeIcon icon={faGitAlt} className='min-w-12 min-h-12 justify-self-center hoverPop110 hover:text-ctp-flamingo' /></Link>
						</div>
						<div className='p-2 sm:p-4'>
							{downloadUrl && (<Link href={downloadUrl} aria-label={title + ' Download page'}><p className='font-bold text-center text-lg text-ctp-flamingo sm:text-justify'>Download Here</p></Link>)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};