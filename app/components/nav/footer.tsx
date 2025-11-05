import Socials from '@components/socials';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="bg-ctp-mantle text-ctp-text">
			<div className='flex text-center flex-col md:flex-row md:justify-between'>
				<div className='px-4 md:py-4 py-2'>
					<div className='md:py-4'>
						<p>Website © 2021-2025 by Pascalrr</p>
						<p>Content Licensed under <Link href="https://creativecommons.org/licenses/by-nc-sa/4.0" className='text-ctp-flamingo'>CC BY-NC-SA 4.0</Link></p>
						<p>Source Licensed under the <Link href="https://opensource.org/license/mit" className='text-ctp-flamingo'>MIT License</Link></p>
					</div>
				</div>
				<div className='px-4 md:py-4 py-2'>
					<div className='md:py-4'>
						<p>Designed in Figma</p>
						<p>Made with <span className='text-ctp-red'>❤</span> in React + Next.JS</p>
					</div>
				</div>
				<div className='px-4 md:py-4 py-2'>
					<Socials type='footer' />
				</div>
				<div className='px-4 md:py-4 py-2'>
					<div className='md:py-4'>
						<p>View the <Link href='/privacy-policy' className='text-ctp-flamingo'>Privacy Policy</Link></p>
					</div>
				</div>
			</div>
		</footer>
	);
}