interface AppConfig {
	developmentUrl: string;
    appUrl: string;
    email: string;
	gravatarOptions: {
		size: number;
	}
}

interface ShortnerConfig {
	shorturls: {
		redirect: string;
		target: string;
	}[];
}

const appConfig: AppConfig = {
	developmentUrl: "http://localhost:3000",
    appUrl: "https://pascalrr.gay",
    email: "me@floridaman7588.me",
	gravatarOptions: {
		size: 512
	}
}

const shortnerConfig: ShortnerConfig = {
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
			redirect: "conductor-github",
			target: "https://github.com/SMNWTeam1982/Conductor"
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
			redirect: "conductor-releases",
			target: "https://github.com/SMNWTeam1982/Conductor/releases"
		},
		{
			redirect: "mochad-releases",
			target: "https://github.com/floridaman7588/mochad-ha-addon/releases"
		}
	]
}

export { appConfig, shortnerConfig };