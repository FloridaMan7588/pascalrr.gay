import { shortnerConfig } from "~/config"

export function checkRedirect(shorturl: string): string {
	let destination
	for (const shortnerObject of shortnerConfig.shorturls) {
		if (shorturl == shortnerObject.redirect) {
			destination = shortnerObject.target
		}
	}
	if (!destination) {
		destination = "/404"
	}
	return destination
}