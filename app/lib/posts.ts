//rewrite/restructure of posts functionality in ts
import { ReactNode, createElement } from 'react';
import sanitizeHtml from 'sanitize-html'

import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { format } from 'date-fns';

import { unified } from 'unified';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import remarkGemoji from 'remark-gemoji';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { all } from 'lowlight';

import { generateRssFeed } from '@lib/rss';
import PostCard from '@components/cards/post';


type post = 'blog' | 'toot';

export class Post {
	postData: genericPost;
	constructor(postType: post, postData: genericPost) {
		if (postType === 'blog') {
		}
		else if (postType === 'toot') {
		}
		else {
			throw new Error('Invalid post type');
		}
	}
}

class genericPost {
	title: string;
	date: Date;
	slug: string;
	formattedDate: string;
	constructor(title: string, date: Date, slug: string) {
		this.title = title;
		this.date = date;
		this.slug = slug;
		this.formattedDate = format(date, 'do LLL. yyyy h:mm a');
	}
}

class blogPost extends genericPost {
	author: string;
	description?: string;
	card: ReactNode;
	constructor(title: string, slug: string, date: Date, author: string, description?: string) {
		super(title, date, slug);
		this.author = author;
		if (description) {
			this.description = description;
		}
		this.card = createElement(PostCard, { title: this.title, date: this.date, formattedDate: this.formattedDate, slug: this.slug, author: this.author, description: this.description });
	}
}

class mastoPost extends genericPost {
	content: string;
	summary?: string;
	card: ReactNode;
	constructor(title: string, slug: string, date_modified: Date, content: string, summary?: string) {
		super(title, date_modified, slug);
		this.content = content;
		if (summary) {
			this.summary = summary;
		} else {
			this.summary = content?.substring(0, 128);
		}
		this.card = createElement(PostCard, { title: this.title, date: this.date, formattedDate: this.formattedDate, url: new URL(this.slug), author: 'Pascalr (Kay)', description: this.summary });
	}
}

interface frontMatter {
	title: string;
	date: Date;
	draft: boolean;
	tags: string[];
	author: string;
	comments: boolean
	description?: string;
}

export async function getBlogsData(): Promise<blogPost[]> {
	const postsDirectory = path.join(process.cwd(), 'content/posts/');
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		const slug = fileName.replace(/\.md$/, '');
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const matterResult = matter(fileContents);
		return {
			slug,
			...matterResult.data as frontMatter,
		};
	});
	const postData = allPostsData.map((post) => {
		return new blogPost(post.title, post.slug, post.date, post.author, post.description);
	});
	return postData.sort((a, b) => {
		return b.date.getTime() - a.date.getTime();
	});
}

export async function getMastoData() {
	const tootData = []
	await fetch('https://blahaj.zone/@floridaman.json', { next: { revalidate: 0 } })
		.then(res => res.json())
		.then(data => {
			for (const item of data.items) {
				const content = sanitizeHtml(item.content_html, { allowedTags: [], })
				tootData.push(new mastoPost('New Microblog Status', item.url, new Date(item.date_modified), content, item.summary));
			}
		});
	return tootData.sort((a, b) => {
		return b.date.getTime() - a.date.getTime();
	});
}

export async function getPostSlugs(): Promise<string[]> {
	const filenames = fs.readdirSync(path.join(process.cwd(), 'content/posts/'));
	return filenames.map((fileName) => {
		return fileName.replace(/\.md$/, '')
	})
}

export async function getPostData(slug: string) {
	const fullPath = path.join(process.cwd(), 'content/posts/', `${slug}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const matterResult = matter(fileContents);
	const processedContent = await unified()
		.use(remarkParse)
		.use(remarkGemoji)
		.use(remarkGfm)
		.use(remarkHtml, { sanitize: false })
		.use(remarkRehype)
		.use(rehypeHighlight, { languages: { ...all } })
		.use(rehypeStringify)
		.process(matterResult.content)

	const date = format(matterResult.data.date, 'do LLL. yyyy h:mm a');
	const renderedHtml = { __html: processedContent.toString() };

	return {
		slug,
		renderedHtml,
		...matterResult.data as frontMatter,
		date,
	};
}

export async function getBlogPosts(): Promise<ReactNode[]> {
	const postData = await getBlogsData();
	await generateRssFeed();

	const postList: ReactNode[] = [];
	for (const post of postData) {
		postList.push(
			createElement('div', { key: post.slug, className: 'py-4 px-2' }, post.card)
		)
	}
	return postList;
}

export async function getMastoPosts(): Promise<ReactNode[]> {
	const tootData = await getMastoData();
	const postList: ReactNode[] = [];
	for (const post of tootData) {
		let content;
		if (post.summary) {
			content = post.summary;
		} else {
			content = post.content?.substring(0, 128);
		}
		const postElement = createElement(PostCard, { title: post.title, date: post.date, formattedDate: post.formattedDate, url: post.slug, author: 'Pascalr (Kay)', description: content });
		postList.push(
			createElement('div', { key: post.slug, className: 'py-4 px-2' }, post.card)
		)
	}
	return postList
}

export async function getAllPosts() {
	const allPostList: ReactNode[] = [];

	await getBlogPosts().then(posts => {
		for (const post of posts) {
			allPostList.push(post);
		}
	})
	await getMastoPosts().then(posts => {
		for (const post of posts) {
			allPostList.push(post);
		}
	})

	return allPostList.sort((a, b) => {
		const dateA = new Date((a as any).props.children.props.date);
		const dateB = new Date((b as any).props.children.props.date);
		return dateB.getTime() - dateA.getTime();
	});
}