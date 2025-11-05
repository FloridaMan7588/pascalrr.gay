import BaseCard from '@components/cards/base';
import ContactCard from '@components/cards/contact';

export default async function Contact() {
	return (
		<main className="bg-ctp-base min-h-screen max-w-screen">
			<BaseCard>
				<ContactCard
					title='Contact Me'
					content='Want to get in touch with me? Have a question about something I do? Feel free to reach out to learn about my products, services, or just get to know me!'
					contacts={[
						{ title: 'Email', link: 'mailto:me@floridaman7588.me' },
						{ title: 'Mastodon', link: 'https://pascalrr.gay/redirect/mastodon' },
						{ title: 'LinkedIn', link: 'https://pascalrr.gay/redirect/linkedin' },
						{ title: 'Discord', link: 'https://pascalrr.gay/redirect/discord' },
						{ title: 'Full Social List', link: 'https://pascalrr.gay/redirect/links' }
					]} />
			</BaseCard>
		</main>
	)
}