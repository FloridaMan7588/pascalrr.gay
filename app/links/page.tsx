import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faGithub,
	faYoutube,
	faMastodon,
	faLinkedin,
	faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

library.add(
	faGithub,
	faYoutube,
	faGlobe,
	faMastodon,
	faLinkedin,
	faDiscord,
	faDollarSign
);

import background from "@images/links/background.png";
import Avatar from "@components/avatar";
import LinkCard from "@components/cards/link";
import Image from "next/image";
import Link from "next/link";

const faGithubIcon = faGithub as IconProp;
const faYoutubeIcon = faYoutube as IconProp;
const faGlobeIcon = faGlobe as IconProp;
const faMastodonIcon = faMastodon as IconProp;
const faLinkedinIcon = faLinkedin as IconProp;
const faDiscordIcon = faDiscord as IconProp;
const faDollarIcon = faDollarSign as IconProp;

export default function Page() {
	const randomChoice = Math.floor(Math.random() * 2)
	var mainHeader
	if (randomChoice == 0) {
		mainHeader = `<div class='flex place-items-center'><p class='bi-animated'>Pascalrr</p></div>`
	} else {
		mainHeader = `<div class='flex place-items-center'><p class='enby-animated'>Pascalrr</p></div>`
	}
	return (
		<div className="h-screen">
			<Image
				src={background}
				className="-z-10 h-screen w-screen fixed md:object-cover grayscale-[75%] blur-[25px]"
				quality={100}
				alt="A background for the page, both the bisexual and nonbinary flags intersecting"
			/>
			<div className="flex flex-col justify-center items-center py-16">
				<div className="flex relative min-h-48 min-w-48 py-4 md:max-h-48 md:max-w-48 ">
					<Avatar className="rounded-[70px] max-h-48 max-w-48" />
				</div>
				<div className="flex flex-col py-8 text-center justify-center items-center">
					<div className="font-bold text-3xl py-4 bi-animated" dangerouslySetInnerHTML={{ __html: mainHeader}} />
					<p className="py-4 px-4 text-lg">
						kittycoded enby programmer on the internet • minor • do drugs •
						become ungovernable
					</p>
					<p className="py-4 px-4 text-lg">He/They</p>
					<LinkCard
						icon={faGlobeIcon}
						name="Website"
						link="https://pascalrr.gay/redirect/website"
						description="Link to Personal portfolio/website"
						className="bg-blue-700"
					/>
					<LinkCard
						icon={faGithubIcon}
						name="GitHub"
						link="https://pascalrr.gay/redirect/github"
						description="Link to Personal GitHub Page"
						className="bg-black"
					/>
					<LinkCard
						icon={faLinkedinIcon}
						name="LinkedIn"
						link="https://pascalrr.gay/redirect/linkedin"
						description="Link to Personal LinkedIn page"
						className="bg-indigo-700"
					/>
					<LinkCard
						icon={faMastodonIcon}
						name="Mastodon"
						link="https://pascalrr.gay/redirect/mastodon"
						description="Link to Personal Microblog/ Mastodon page"
						className="bg-violet-900"
					/>
					<LinkCard
						icon={faYoutubeIcon}
						name="YouTube"
						link="https://pascalrr.gay/redirect/youtube"
						description="Link to Programming YouTube Channel"
						className="bg-red-600"
					/>
					<LinkCard
						icon={faDiscordIcon}
						name="Discord Server"
						link="https://pascalrr.gay/redirect/discord"
						description="Link to Project discord server"
						className="bg-indigo-600"
					/>
					<LinkCard
						icon={faDollarIcon}
						name="Ko-Fi"
						link="https://pascalrr.gay/redirect/kofi"
						description="Link to Ko-Fi page"
						className="bg-sky-600"
					/>
					<LinkCard
						icon={faDollarIcon}
						name="Buy Me a Coffee"
						link="https://pascalrr.gay/redirect/coffee"
						description="Link to Buy me A Coffee"
						className="bg-amber-400"
					/>
					<p className="py-6 px-4 font-bold text-xl">Projects</p>
					<LinkCard
						icon={faGithubIcon}
						name="Waterfox Flatpak GitHub"
						link="https://pascalrr.gay/redirect/waterfox-github"
						description="Link to Waterfox Flatpak GitHub"
						className="bg-black"
					/>
					<LinkCard
						icon={faGithubIcon}
						name="Mochad Addon GitHub"
						link="https://pascalrr.gay/redirect/mochad-github"
						description="Link to Mochad Addon GitHub"
						className="bg-black"
					/>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<Link href='https://web.archive.org/web/20240128005707/https://lololol.tk/'><p className='text-sky-500 underline'>Brrrr, it&apos;s cold down here</p></Link>
				</div>
			</div>
		</div>
	);
}