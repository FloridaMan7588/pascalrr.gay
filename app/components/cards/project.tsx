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
		<div className='p-2 md:px-8 h-full bg-ctp-crust rounded-[32px]'>
			<div className='px-2 text-ctp-text flex flex-col h-full'>
				<div className='p-2 w-full'>
					<h2 className='text-left text-3xl font-bold py-4'>{title}</h2>
					{description}
				</div>
				<div className='h-full flex'>
					<div className='w-full flex justify-center align-items-center mt-auto'>
						{image && (
							<Link href={imageLink} className='block w-full max-w-[22.5rem]'>
								<div
									className='relative w-full overflow-hidden rounded-xl aspect-square hoverPop105'
									style={{ aspectRatio: '1 / 1' }}
								>
									<Image
										src={image}
										alt={title + ' cover image'}
										fill
										sizes='(min-width:1024px) 360px, (min-width:768px) 192px, 160px'
										className='object-contain'
										priority={false}
									/>
								</div>
							</Link>
						)}
					</div>
				</div>
				<div className='p-2 min-w-full mt-auto'>
					<hr></hr>
					<div className='grid grid-cols-2 items-center min-w-full'>
						<div className='py-4'>
							<Link href={sourceUrl} aria-label={title + ' Source page'}><FontAwesomeIcon icon={faGitAlt} className='min-w-12 min-h-12 justify-self-center hoverPop110 hover:text-ctp-flamingo' /></Link>
						</div>
						<div className='p-2'>
							{downloadUrl && (<Link href={downloadUrl} aria-label={title + ' Download page'}><p className='font-bold text-center text-lg text-ctp-flamingo sm:text-justify'>Download Here</p></Link>)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};