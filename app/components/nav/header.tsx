import NavMenu from '@components/nav/navMenu';
import Title from '@components/nav/title';
import Avatar from '@components/avatar';
import Link from 'next/link';
import { Arima } from 'next/font/google';

const arima = Arima({ subsets: ["latin"], preload: true, display: 'swap', weight: '400' });

export default function Header() {
	return (
		<header className="py-4 bg-base px-2 relative">
			<nav className="mx-auto flex max-w-[1880px] max-h-10 items-center justify-between p-6 lg:px-8 bg-ctp-mantle rounded-[45px] sm:w-full z-20">
				<div className="flex justify-start">
					<div className="flex justify-center place-content-start w-9 h-9 relative">
						<Avatar className='relative rounded-full max-h-9 max-w-9' />
					</div>
					<div className={`${arima.className} flex flex-row`} >
						<Link href="/" className="lg:text-3xl text-xl font-bold px-4 flex hoverPop105 text-ctp-text">
							<Title />
						</Link>
					</div>
				</div>
				<NavMenu />
			</nav>
		</header>
	);
}