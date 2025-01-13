interface Config {
	shorturls: {
		redirect: string;
		target: string;
	}[];
}

const config: Config = {
	shorturls: [
		{
			redirect: "links",
			target: "https://www.pascalrr.gay/links"
		},
		{
			redirect: "website",
			target: "https://www.pascalrr.gay"
		},
		{
			redirect: "github",
			target: "https://github.com/floridaman7588"
		},
		{
			redirect: "linkedin",
			target: "https://www.linkedin.com/in/cayden-haun-b85650258/"
		},
		{
			redirect: "mastodon",
			target: "https://blahaj.zone/@floridaman"
		},
		{
			redirect: "youtube",
			target: "https://youtube.com/@FloridaMan7588"
		},
		{
			redirect: "discord",
			target: "https://discord.gg/cTAvaYxWF6"
		},
		{
			redirect: "kofi",
			target: "https://ko-fi.com/floridaman7588"
		},
		{
			redirect: "coffee",
			target: "https://buymeacoffee.com/floridaman7588"
		},
		{
			redirect: "waterfox-github",
			target: "https://github.com/flathub/net.waterfox.waterfox"
		},
		{
			redirect: "mochad-github",
			target: "https://github.com/floridaman7588/mochad-ha-addon"
		},
		{
			redirect: "waterfox-flathub",
			target: "https://flathub.org/apps/details/net.waterfox.waterfox"
		},
		{
			redirect: "mochad-releases",
			target: "https://github.com/floridaman7588/mochad-ha-addon/releases"
		}
	]
}

export function checkRedirect(shorturl: string): string {
	let destination
	for (const shortnerObject of config.shorturls) {
		if (shorturl == shortnerObject.redirect) {
			destination = shortnerObject.target
		}
	}
	return destination
}