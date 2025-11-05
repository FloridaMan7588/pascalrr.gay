'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { Kalam } from 'next/font/google';

import { useMemo, useState } from 'react';
import Link from "next/link";
import { useScreenSize } from "@lib/hooks";

const kalam = Kalam({ subsets: ["latin"], preload: true, display: 'swap', weight: '400' });

export const dynamic = 'force-dynamic';

export default function NavMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const { onMobile, isReady } = useScreenSize();
	const headerLinks = (
		<div className={`${onMobile ? 'flex flex-col' : ''}`}>
			<Link href="/#about" onClick={() => setIsOpen(!isOpen)} className={`${onMobile ? 'px-6' : ''} px-4 text-ctp-text font-bold hover:text-ctp-flamingo`}>About Me</Link>
			<Link href="/#projects" onClick={() => setIsOpen(!isOpen)} className={`${onMobile ? 'px-6' : ''} px-4 text-ctp-text font-bold hover:text-ctp-flamingo`}>Projects</Link>
			<Link href="/contact" onClick={() => setIsOpen(!isOpen)} className={`${onMobile ? 'px-6' : ''} px-4 text-ctp-text font-bold hover:text-ctp-flamingo`}>Contact</Link>
			<Link href="/blog" onClick={() => setIsOpen(!isOpen)} className={`${onMobile ? 'px-6' : ''} px-4 text-ctp-text font-bold hover:text-ctp-flamingo`}>Blog</Link>
		</div>
	)
	const Icon = useMemo(() => isOpen ? faBarsStaggered : faBars, [isOpen]);
	if (!isReady) return null;
	return (
		<div className={`${kalam.className} z-20`}>
			<button type="button" className={`${onMobile ? 'visible' : 'hidden'} flex absolute top-8 right-8 z-30 hover:text-ctp-flamingo`} onClick={() => setIsOpen(!isOpen)} aria-label='Header Menu'>
				<FontAwesomeIcon icon={Icon} className={`${isOpen ? 'text-ctp-flamingo' : 'text-ctp-text'}`} />
			</button>
			<div className={`${isOpen && onMobile ? 'visible' : 'hidden'} flex flex-col justify-end items-center`}>
				<div className={`flex h-32 bg-ctp-mantle pb-4 pt-6 relative rounded-[25px] justify-self-end mt-28`}>
					{headerLinks}
				</div>
			</div>
			<div className={`${onMobile ? 'hidden' : 'visible'} lg:flex`}>
				{headerLinks}
			</div>
		</div>
	)
}