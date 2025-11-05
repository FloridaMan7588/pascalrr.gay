import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faLinkedin, faMastodon } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

interface Props {
	type: 'footer' | 'hero';
}

export default function Socials({ type }: Props) {
	let iconCss: string;
	if (type == 'hero') {
		iconCss = "min-w-10 min-h-10 px-4 md:min-w-14 md:min-h-14 hoverPop110 hover:text-ctp-flamingo"
	} else {
		iconCss = "px-4 min-w-8 min-h-8 hoverPop110 hover:text-ctp-flamingo"
	}

	return (
		<div className='grid-cols-3 py-2 md:py-4 flex justify-center'>
			<Link href='https://pascalrr.gay/redirect/github' aria-label='GitHub profile link'><FontAwesomeIcon icon={faGithubSquare} className={iconCss} /></Link>
			<Link href='https://pascalrr.gay/redirect/linkedin' aria-label='LinkedIn profile link'><FontAwesomeIcon icon={faLinkedin} className={iconCss} /></Link>
			<Link href='https://pascalrr.gay/redirect/mastodon' aria-label='Mastodon profile link'><FontAwesomeIcon icon={faMastodon} className={iconCss} /></Link>
			<Link href='https://pascalrr.gay/redirect/links' aria-label='Linktree-like index page link'><FontAwesomeIcon icon={faLink} className={iconCss} /></Link>
		</div>
	)

}