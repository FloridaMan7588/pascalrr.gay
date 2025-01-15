/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.gravatar.com",
				port: "",
				pathname: "/avatar/**",
			},
		],
	},
};

export default nextConfig;

/* This was added by me so that I can store global variables if need be. */
const appConfig = {
	appUrl: "https://floridaman7588.me",
};

export { appConfig };