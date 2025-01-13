import NavMenu from '@components/nav/navMenu';
import { Arima } from 'next/font/google';
import Avatar from '@components/avatar';
import Link from 'next/link';

const indieFlower = Arima({
	subsets: ["latin"], preload: true, display: 'swap',
	weight: '400'
});

export default function Header() {
	return (
		<header className="py-4 bg-base px-2 z-[50] relative">
			<nav className="mx-auto flex max-w-[1880px] max-h-10 items-center justify-between p-6 lg:px-8 bg-ctp-mantle rounded-[45px] lg:w-full">
				<div className="flex justify-start">
					<div className="flex justify-center place-content-start w-9 h-9 relative">
						<Avatar className='relative rounded-full max-h-9 max-w-9' />
					</div>
					<div className={`${indieFlower.className} flex flex-row`}>
						<Link href="/" className="text-ctp-text lg:text-3xl sm:text-1xl font-bold px-4 flex">
								<p>pascalrrr</p><p className='bi-animated'>.gay</p>
						</Link>
					</div>
				</div>
				<NavMenu />
			</nav>
		</header>
	);
}