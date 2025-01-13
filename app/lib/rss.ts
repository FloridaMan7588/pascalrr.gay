import RSS from 'rss';
import { appConfig } from '~/next.config.mjs'
import { getBlogsData } from '@lib/posts';
import fs from 'fs';
import path from 'path';


export async function generateRssFeed() {
	const allPostsData = await getBlogsData();

	const feedOptions = {
		title: 'Kay Haun (Pascalrr) | Blog Posts',
		description: 'Hello! I‘m Pascalrr, your average enby kittycoded programmer on the interwebs. I like to make things sometimes but I‘m not very good at it lol.',
		site_url: appConfig.appUrl,
		feed_url: `${appConfig.appUrl}/feed.xml`,
		image_url: `${appConfig.appUrl}/avatar.png`,
		pubDate: new Date(),
		copyright: `All Content © 2021-2024 by Cayden (Kay) Haun is licensed under CC BY-SA 4.0`,
	};
	const feed = new RSS(feedOptions);

	allPostsData.map((post) => {
		feed.item({
			title: post.title,
			description: post.description,
			url: `${appConfig.appUrl}/blog/${post.slug}`,
			date: post.date,
		});
	})
	fs.writeFile(path.join(process.cwd(), '/public/feed.xml'), feed.xml({ indent: true }), (err) => {
		if (err) {
			console.error(err);
		}
	})
}