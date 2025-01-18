'use client'
import { Neko } from 'neko-ts';
import { ReactNode, useEffect, useRef } from "react";

export default function ONeko(): ReactNode | null {
	const neko = useRef<Neko | undefined>();
	useEffect(() => {
		if (!neko.current) {
			neko.current = new Neko({
				speed: 1,
				origin: {
					x: 100,
					y: 100,
				},
			});
		}
	}, [neko]);
	
	return null
}