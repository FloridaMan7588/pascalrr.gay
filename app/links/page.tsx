import { faGithub, faYoutube, faMastodon, faLinkedin, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faMugHot, faBeerMugEmpty } from "@fortawesome/free-solid-svg-icons";
import { Arima } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import background from "@images/links/background.png";
import Avatar from "@components/avatar";
import LinkCard from "@components/cards/link";
import Queerify from "~/app/components/queerify";
import { createElement, ReactNode } from "react";

const arima = Arima({ subsets: ["latin"], preload: true, display: 'swap', weight: '700' });


export default async function Page() {
	'use cache'
	const randomBreaks: ReactNode[] = [];
	const randomNumber = Math.floor(Math.random() * (120 - 80)) + 80
	for (let i = 0; i < randomNumber; i++) {
		randomBreaks.push(createElement('br', {key: i}))
	}

	return (
		<div className="min-h-screen">
			<Image
				src={background}
				className="-z-10 h-screen w-screen fixed md:object-cover grayscale-[75%] blur-xl"
				quality={100}
				alt="A background for the page, both the bisexual and nonbinary flags intersecting"
			/>
			<div className="flex flex-col justify-center items-center py-16">
				<div className="flex relative min-h-48 min-w-48 py-4 md:max-h-48 md:max-w-48 ">
					<Avatar className="rounded-[70px] max-h-48 max-w-48" />
				</div>
				<div className="flex flex-col py-8 text-center justify-center items-center">
					<div className="font-bold text-3xl py-4 flex place-items-center">
						<Queerify><p className={`${arima.className} font-bold`}>Pascalrr</p></Queerify>
					</div>
					<p className="p-4 text-lg">
						kittycoded enby programmer on the internet • minor • do drugs •
						become ungovernable
					</p>
					<p className="p-4 text-lg">He/They She/Them</p>
					<LinkCard
						icon={faGlobe}
						name="Website"
						link="/redirect/website"
						description="Link to Personal portfolio/website"
						className="bg-blue-700"
					/>
					<LinkCard
						icon={faGithub}
						name="GitHub"
						link="/redirect/github"
						description="Link to Personal GitHub Page"
						className="bg-black"
					/>
					<LinkCard
						icon={faLinkedin}
						name="LinkedIn"
						link="/redirect/linkedin"
						description="Link to Personal LinkedIn page"
						className="bg-indigo-700"
					/>
					<LinkCard
						icon={faMastodon}
						name="Mastodon"
						link="/redirect/mastodon"
						description="Link to Personal Microblog/ Mastodon page"
						className="bg-violet-900"
					/>
					<LinkCard
						icon={faYoutube}
						name="YouTube"
						link="/redirect/youtube"
						description="Link to Programming YouTube Channel"
						className="bg-red-600"
					/>
					<LinkCard
						icon={faDiscord}
						name="Discord Server"
						link="/redirect/discord"
						description="Link to Project discord server"
						className="bg-indigo-600"
					/>
					<LinkCard
						icon={faBeerMugEmpty}
						name="Ko-Fi"
						link="/redirect/kofi"
						description="Link to Ko-Fi page"
						className="bg-sky-600"
					/>
					<LinkCard
						icon={faMugHot}
						name="Buy Me a Coffee"
						link="/redirect/coffee"
						description="Link to Buy me A Coffee"
						className="bg-amber-400"
					/>
					<p className="py-6 px-4 font-bold text-xl">Projects</p>
					<LinkCard
						icon={faGithub}
						name="Waterfox Flatpak GitHub"
						link="/redirect/waterfox-github"
						description="Link to Waterfox Flatpak GitHub"
						className="bg-black"
					/>
					<LinkCard
						icon={faGithub}
						name="Mochad Addon GitHub"
						link="/redirect/mochad-github"
						description="Link to Mochad Addon GitHub"
						className="bg-black"
					/>
					{randomBreaks}
					<Link href='https://web.archive.org/web/20240128005707/https://lololol.tk/'><p className='text-sky-500 underline'>Brrrr, it&apos;s cold down here</p></Link>
				</div>
			</div>
		</div>
	);
}