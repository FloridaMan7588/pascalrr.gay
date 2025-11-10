import { format } from "date-fns";
import sanitizeHtml from 'sanitize-html'
import { join } from 'path'
import matter from 'gray-matter';
import { readdir, readFile } from "fs/promises";
import { createElement, ReactNode, isValidElement } from "react";
import PostCard from "@components/cards/post";
import { Url } from "next/dist/shared/lib/router/router";
import { generateRssFeed } from "@lib/rss";

import remarkGemoji from 'remark-gemoji';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

export type PostType = 'blog' | 'mastodon';

abstract class GenericPost {
    title: string;
    author: string;
    description: string;
    slug: string;
    date: Date;
    formattedDate: string;
    type: PostType;
    card: ReactNode;
    constructor(title: string, author: string, slug: string, date: Date, type: PostType, description?: string) {
        this.title = title;
        this.author = author;
        this.description = description || '';
        this.slug = slug;
        this.date = date;
        this.formattedDate = format(date, 'do LLL. yyyy h:mm a');
        this.type = type;
        this.card = createElement(PostCard, { key: this.slug, title: this.title, date: this.date, formattedDate: this.formattedDate, description: this.description, author: this.author, slug: this.slug, type: this.type })
    }
}

class BlogPost extends GenericPost {
    draft: boolean;
    constructor(title: string, author: string, slug: string, date: Date, description?: string, draft?: boolean) {
        super(title, author, slug, date, 'blog', description);
        if (!draft) this.draft = false;
        this.draft = draft;
    }
    async getPostData() {
        const slug = this.slug
        const filePath = join(process.cwd(), '/content/posts', `${slug}.md`);
        const fileContents = await readFile(filePath, 'utf-8');
        const fileMatter = matter(fileContents);
        const date = format(fileMatter.data.date, 'do LLL. yyyy h:mm a');
        const { default: mdxContent } = await evaluate(fileMatter.content, { ...runtime, remarkPlugins: [remarkGemoji, remarkGfm], rehypePlugins: [rehypeHighlight] })

        return {
            slug,
            Section: mdxContent,
            ...fileMatter.data as PostMatter,
            date,
        }
    }
}

class MastodonPost extends GenericPost {
    constructor(title: string, author: string, url: Url, date: Date, summary?: string) {
        super(title, author, url.toString(), date, 'mastodon', summary);
    }
}

interface PostMatter {
    title: string;
    date: Date;
    draft: boolean;
    tags: string[];
    author: string;
    comments: boolean
    description?: string;
}


async function getAllPosts() {
    const postList: ReactNode[] = [];
    const blogList: BlogPost[] = [];
    const mastodonList: MastodonPost[] = [];

    await fetch('https://blahaj.zone/@floridaman.json', { next: { revalidate: 600 } })
        .then((res) => res.json())
        .then((data) => {
            const postData: MastodonPost[] = [];
            for (const item of data.items) {
                const content = sanitizeHtml(item.content_html, { allowedTags: ['p', 'span', 'i', 'b', 'strong', 'br'] });
                if (!item.summary) {
                    if (content.length > 192) {
                        const summary = content.slice(0, 191).trim();
                        const trimIndex = (summary.lastIndexOf(" ") < summary.lastIndexOf("<") ? summary.lastIndexOf("<") : summary.lastIndexOf(" "));
                        item.summary = summary.slice(0, trimIndex) + "...";
                    } else item.summary = content;
                }
                postData.push(new MastodonPost('Mastodon Post', data.author.name, item.url, new Date(item.date_modified), item.summary))
            }
            for (const post of postData) {
                postList.push(post.card);
                mastodonList.push(post);
            }
        });

    await (async () => {
        const postsDirectory = join(process.cwd(), 'content/posts/');
        const fileNames = await readdir(postsDirectory);
        const allFileNames = fileNames.map(async (fileName) => {
            const fileSlug = fileName.replace(/\.md$/, '');
            const filePath = join(postsDirectory, fileName);
            const fileContents = await readFile(filePath, 'utf-8');
            const fileMatter = matter(fileContents);
            return {
                fileSlug,
                ...fileMatter.data as PostMatter,
            }
        })
        const postData: Promise<BlogPost>[] = allFileNames.map(async (post) => {
            const data = await post;
            return new BlogPost(data.title, data.author, data.fileSlug, data.date, data.description, data.draft);
        })
        return await postData
    })().then(async (postData) => {
        const data = await postData;
        for (const post of data) {
            let postObject = await post;
            if (!postObject.draft) {
                postList.push(postObject.card);
                blogList.push(postObject);
            };
        }
    })

    postList.sort((a, b) => {
        let dateA: Date;
        let dateB: Date;
        if (isValidElement(a) && isValidElement(b)) {
            dateA = (a).props.date;
            dateB = (b).props.date
        }
        return dateB.getTime() - dateA.getTime();
    });

    generateRssFeed(blogList);
    return { postList, blogList, mastodonList };
}

interface GetFilteredPosts {
    filteredPosts: ReactNode[],
    pageUrlSuffix: string
}

function getFilteredPosts(filters: string, postList: ReactNode[]): GetFilteredPosts {
    let filterList = filters.split(' ');
    let filteredPosts = postList;
    let pageUrlSuffix = filterList.length ? '&filter=' + filterList.join('+') : '';

    const allowedTypes: string[] = [];
    filterList.forEach((filter) => {
        if (filter == 'blog' || filter == 'mastodon') allowedTypes.push(filter)
    })

    if (allowedTypes.length) {
        filteredPosts = filteredPosts.filter(post =>
            isValidElement(post) && allowedTypes.includes(post.props.type)
        );
    };

    const postFilters: ((a: ReactNode, b: ReactNode) => number)[] = filterList.map((filter) => {
        switch (filter) {
            case 'latest':
                return (a, b) => isValidElement(a) && isValidElement(b)
                    ? new Date(b.props.date).getTime() - new Date(a.props.date).getTime()
                    : 0
            case 'oldest':
                return (a, b) => isValidElement(a) && isValidElement(b)
                    ? new Date(a.props.date).getTime() - new Date(b.props.date).getTime()
                    : 0
            case 'az':
                return (a, b) => isValidElement(a) && isValidElement(b)
                    ? a.props.title.localeCompare(b.props.title)
                    : 0
            case 'za':
                return (a, b) => isValidElement(a) && isValidElement(b)
                    ? b.props.title.localeCompare(a.props.title)
                    : 0
            default:
                return () => 0;
        };
    });

    if (postFilters.length) {
        filteredPosts = [...filteredPosts.sort((a, b) => {
            for (const filter of postFilters) {
                const result = filter(a, b);
                if (result !== 0) return result;
            }
            return 0;
        })]
    }

    return { filteredPosts, pageUrlSuffix }
}

export { GenericPost, BlogPost, MastodonPost, getAllPosts, getFilteredPosts }
