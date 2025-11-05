'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useSearchParams } from 'next/navigation';
import { useScrollToTop } from "@lib/hooks";
import { useEffect, useState } from "react";


export default function ToTop() {
	const currentPath = usePathname()
	const { nearTop, jumpToTop } = useScrollToTop(currentPath)
	const [highlight, setHighlight] = useState({ hovered: false, clicked: false});

	useEffect(() => {
		if (nearTop) setTimeout(() => setHighlight(() => ({hovered: false, clicked: false})), 200);
	}, [nearTop])

	const handleClick = () => {
		setHighlight(state => ({...state, clicked: true}))
		jumpToTop();
	}

	return (
		<div>
			<div className={`fixed bottom-0 right-0 mb-4 mr-4 z-10 transition-opacity ease-out duration-500  ${nearTop ? 'opacity-0' : 'opacity-100'}`}>
				<button onMouseOver={() => {setHighlight(state => ({...state, hovered: true}))}} onMouseOut={() => setHighlight(state => ({...state, hovered: false}))} onClick={handleClick} className="flex items-center justify-center bg-ctp-crust rounded-full hoverPop110 transition" aria-label="Jump to top">
					<FontAwesomeIcon icon={faArrowUp} className={`${(highlight.clicked || highlight.hovered )? '!text-ctp-flamingo' : ''} text-ctp-text h-6 w-6 m-2`} />
				</button>
			</div>
		</div>
	)
}

export function ScrollOnLoad({ params }: { params: { [key: string]: string | undefined } }) {
	const page = useSearchParams().get('page');
	const currentPath = usePathname();
	const { jumpToTop } = useScrollToTop(currentPath)

	useEffect(() => {
		jumpToTop()
		if (typeof window !== 'undefined' && page !== null) {
			//const path = currentPath.split('#')[0] + `?page=${page}`
			//window.history.replaceState(null, '', path)
		}
	}, [page, jumpToTop, currentPath])
	return (<></>)
}