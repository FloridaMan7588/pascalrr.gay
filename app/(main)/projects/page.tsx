import BaseCard from "@components/cards/base"
import ProjectCard from "@components/cards/project"
import waterfoxLogo from '@images/projects/waterfox-logo.png';
import mochadLogo from '@images/projects/mochad-logo.png';
import conductorLogo from '@images/projects/conductor-logo.png'
import MDXWrapper from "@components/mdxwrapper";

export default function Projects() {
	return (
		<main className="bg-ctp-base min-h-screen max-w-screen text-text">
			<BaseCard>
				<div className="grid grid-cols-1">
					<h1 className="text-3xl text-ctp-text text-center">All Projects</h1>
				</div>
				<div className="flex px-8">
					<h2 className="text-2xl text-ctp-text">Featured Projects</h2>
				</div>
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
				<div className="flex px-8">
					<h2 className="text-2xl text-ctp-text">Other Projects</h2>
				</div>
				<div className='grid grid-cols-1 md:flex md:flex-wrap py-4 px-4 md:justify-center'>
					<div className='px-2 py-2 min-h-full w-1/3'>
						<ProjectCard title='BRL Utils'
							description={<MDXWrapper page="projects" section="brl-utils_description" components={{ p: 'text-xl text-left py-4' }} />}
							sourceUrl='https://github.com/FloridaMan7588/brl-utils' />
					</div>
					<div className='px-2 py-2 min-h-full w-1/3'>
						<ProjectCard title='Swerve Template'
							description={<MDXWrapper page="projects" section="swerve-template_description" components={{ p: 'text-xl text-left py-4' }} />}
							sourceUrl='https://github.com/SMNWTeam1982/java-swerve-template' />
					</div>
					<div className='px-2 py-2 min-h-full w-1/3'>
						<ProjectCard title='OpenCore EFI'
							description={<MDXWrapper page="projects" section="macos-efi_description" components={{ p: 'text-xl text-left py-4' }} />}
							sourceUrl='https://github.com/FloridaMan7588/MacOS-efi' />
					</div>
					<div className='px-2 py-2 min-h-full w-1/2'>
						<ProjectCard title='PiHole Webhook'
							description={<MDXWrapper page="projects" section="pihole-webhook_description" components={{ p: 'text-xl text-left py-4' }} />}
							sourceUrl='https://github.com/FloridaMan7588/pihole-webhook' />
					</div>
					<div className='px-2 py-2 min-h-full w-1/2'>
						<ProjectCard title='SMS Tank Drive'
							description={<MDXWrapper page="projects" section="tank-drive_description" components={{ p: 'text-xl text-left py-4' }} />}
							sourceUrl='https://github.com/SMNWTeam1982/SMS-Tank-Drive' />
					</div>
				</div>
			</BaseCard>
		</main>
	)
}