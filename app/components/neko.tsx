'use client'
import { Neko } from 'neko-ts';
import { ReactNode, useEffect, useRef, useState } from "react";
import { useScreenSize } from "@lib/hooks";

export default function ONeko(): ReactNode | null {
	const { resolution, onMobile } = useScreenSize();
	const [isSleeping, setSleeping] = useState(false);
	const originRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 })
	const neko = useRef<Neko | undefined>();

	useEffect(() => {
		if (Object.values(resolution)[0] !== null && !neko.current && !onMobile) {
			originRef.current.x = resolution.width - Math.floor(Math.random() * 100) - 25
			originRef.current.y = Math.floor(Math.random() * (resolution.height - 200)) + 40
			neko.current = new Neko({
				speed: 10,
				nekoId: 0,
				origin: { ...originRef.current },
			});
		}
		let interval: number | null = null;
		let currentNeko: HTMLElement | null = null;

		const handleClick = () => {
			setSleeping((sleeping) => {
				if (!sleeping) neko.current.sleep();
				else neko.current.wake();
				return !sleeping
			})
		}
		const attachListener = () => {
			currentNeko = document.querySelector("[id^='neko-']");
			if (currentNeko) {
				currentNeko.addEventListener('click', handleClick);
				currentNeko.style.visibility = onMobile ? 'hidden' : 'visible';
				currentNeko.style.transition = 'opacity 400ms ease'
				if (interval) clearInterval(interval);
			}
		};
		interval = window.setInterval(attachListener, 500);
		return () => {
			if (currentNeko) {
				currentNeko.removeEventListener('click', handleClick);
			}
			if (interval) clearInterval(interval);
		}
	}, [neko, resolution, onMobile]);

	useEffect(() => {
		if (typeof document === 'undefined' || typeof window === 'undefined') return;
		let currentNeko: HTMLElement | null = document.querySelector("[id^='neko-']");

		if (!currentNeko) return;

		if (!isSleeping) {
			currentNeko.style.setProperty('opacity', '1', 'important');
			return;
		}

		const checkAtOrigin = () => {
			const rect = currentNeko.getBoundingClientRect();
			const atOrigin = (Math.abs(rect.left - originRef.current.x) < 50) && (Math.abs(rect.top - originRef.current.y) < 50);
			if (atOrigin) {
				currentNeko.style.setProperty('opacity', '0.5', 'important');
			} else {
				currentNeko.style.setProperty('opacity', '1', 'important');
				setTimeout(checkAtOrigin, 100);
			}
		};
		checkAtOrigin();
	}, [isSleeping])

	return null
}