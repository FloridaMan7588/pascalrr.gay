import nextMdx from '@next/mdx'

const withMdx = nextMdx({
	extension: /\.(md|mdx)$/
})

/** @type {import('next').NextConfig} */
const nextConfig = withMdx({
	reactStrictMode: true,
	pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
	turbopack: {
		resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
		styledComponents: {
			minify: true
		}
	},
	experimental: {
		optimizeCss: true,
	},
	images: {
		qualities: [25, 50, 75, 100],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.gravatar.com",
				port: "",
				pathname: "/avatar/**",
			},
		],
	},
});

export default nextConfig;