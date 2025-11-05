import Avatar from '@components/avatar';
import Socials from '@components/socials';
import MDXWrapper from '@components/mdxwrapper';

import waterfoxLogo from '@images/projects/waterfox-logo.png';
import conductorLogo from '@images/projects/conductor-logo.png'
import mochadLogo from '@images/projects/mochad-logo.png';

import BaseCard from '@components/cards/base';
import AboutCard from '@components/cards/about';
import ProjectCard from '@components/cards/project';
import EducationCard from '@components/cards/education';

import { getAllPosts } from '@lib/posts';
import { isValidElement, ReactNode } from 'react';
import Link from 'next/link';

export const dynamic = 'force-static';

export default async function Home() {
	const { blogList } = await getAllPosts();
	let displayedPosts: ReactNode[] = [];
	blogList.forEach((blog) => {
		if (isValidElement(blog.card)) {
			displayedPosts.push(blog.card)
		}
	})
	displayedPosts = displayedPosts.slice(0, 4);

	const skillsStyle: Record<string, string> = {
		ul: 'list-disc pl-6 md:text-xl text-lg md:w-64',
		li: 'py-2 md:py-4',
	}

	const jcccStyle: Record<string, string> = {
		ul: 'list-disc justify-center text-md sm:text-xl sm:justify-around md:flex-wrap md:flex md:w-72 md:min-w-full p-2 list-inside',
		li: 'md:w-1/2 py-2 md:py-4 md:px-4 text-left last:md:w-full last:md:text-center'
	}
	const smnwStyle: Record<string, string> = {
		ul: 'list-disc justify-center text-md sm:text-xl sm:justify-around md:flex-wrap md:flex md:w-72 md:min-w-full p-2 list-inside',
		li: 'md:w-1/2 py-2 md:py-4 md:px-4 text-left'
	}

	return (
		<main className="bg-ctp-base min-h-screen max-w-screen">
			<div className="px-16 py-8 grid grid-cols-1 md:grid-cols-2 place-items-center md:justify-center">
				<div className='max-w-48 max-h-fit md:justify-center grid grid-cols-1 place-items-center min-w-fit'>
					<div className="sm:flex relative min-h-48 min-w-48 py-4 sm:min-h-64 sm:min-w-64 z-0">
						<Avatar className='rounded-[70px] relative hoverPop105 z-0' />
					</div>
					<Socials type='hero' />
				</div>
				<div className="block md:flex relative text-center min-w-content md:px-4">
					<MDXWrapper page="home" section="hero" wrapperClass="text-ctp-text font-light sm:text-4xl text-2xl text-center max-w-[694px] min-w-fit" />
				</div>
			</div>
			<BaseCard id='about'>
				<AboutCard
					content={<MDXWrapper page="home" section="about" />}
					skills={<MDXWrapper page="home" section="skills" components={skillsStyle} />} />
			</BaseCard>
			<BaseCard id='education'>
				<h1 className='text-ctp-text text-center text-4xl font-bold px-7 py-4'>Education</h1>
				<ul className='px-2 py-4 text-ctp-text'>
					<li className='px-2 py-2'>
						<EducationCard
							url='https://jccc.edu'
							title='Johonson County Community College'
							date='June 2024-Present'
							description='Computer Information Systems | Software Development Certificate'
							activities={<MDXWrapper page="home" section="jccc_activities" components={jcccStyle} />} />
					</li>
					<li className='px-2 py-2'>
						<EducationCard
							url='https://smnorthwest.smsd.org'
							title='Shawnee Mission Northwest High School'
							date='August 2023-Present'
							description='High School Diploma | IB Diploma Candidate'
							activities={<MDXWrapper page="home" section="smnw_activities" components={smnwStyle} />} />
					</li>
				</ul>
			</BaseCard>
			<BaseCard id='projects'>
				<h1 className='text-ctp-text text-center text-4xl font-bold px-7 py-4'>Featured Projects</h1>
				<div className='grid grid-cols-1 md:grid-cols-3 py-4 px-4 md:justify-center'>
					<div className='px-2 py-2 min-h-full'>
						<ProjectCard title='Waterfox Flatpak'
							description={<MDXWrapper page="projects" section="waterfox_description" components={{ p: 'text-xl text-left py-4' }} />}
							image={waterfoxLogo}
							imageLink='https://pascalrr.gay/redirect/waterfox-github'
							downloadUrl='https://pascalrr.gay/redirect/waterfox-flathub'
							sourceUrl='https://pascalrr.gay/redirect/waterfox-github' />
					</div>
					<div className='px-2 py-2 min-h-full'>
						<ProjectCard title='Conductor Driver Station'
							description={<MDXWrapper page="projects" section="conductor_description" components={{ p: 'text-xl text-left py-4' }} />}
							image={conductorLogo}
							imageLink='https://pascalrr.gay/redirect/conductor-github'
							downloadUrl='https://pascalrr.gay/redirect/conductor-releases'
							sourceUrl='https://pascalrr.gay/redirect/conductor-github' />
					</div>
					<div className='px-2 py-2 min-h-full'>
						<ProjectCard title='hass-addon-mochad'
							description={<MDXWrapper page="projects" section="mochad_description" components={{ p: 'text-xl text-left py-4' }} />}
							image={mochadLogo}
							imageLink='https://pascalrr.gay/redirect/mochad-github'
							downloadUrl='https://pascalrr.gay/redirect/mochad-releases'
							sourceUrl='https://pascalrr.gay/redirect/mochad-github' />
					</div>
				</div>
				<div className='py-4 px-4'>
					<div className='text-ctp-text bg-ctp-crust rounded-[45px] px-4 py-4'>
						<h2 className='text-left text-2xl font-bold py-4 px-4'>Full Project List</h2>
						<div className='md:flex justify-between'>
							<p className='text-xl px-4 py-4 md:text-justify'>I have a few other projects, some less maintained and some less important than these</p>
							<Link href='/projects' aria-label='Navigate to full projects page'><p className='font-bold text-ctp-flamingo text-xl px-4 py-4'>View List Here</p></Link>
						</div>
					</div>
				</div>
			</BaseCard>
			<BaseCard>
				<div>
					<h1 className='text-ctp-text text-center text-4xl font-bold px-7 py-4'>Recent Blog Posts</h1>
					<div className='grid lg:grid-cols-4 justify-center'>{displayedPosts}</div>
				</div>
			</BaseCard>
		</main>
	);
}
