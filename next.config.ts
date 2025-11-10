import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	cacheComponents: true,
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
		turbopackMinify: true,
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
};

export default nextConfig;