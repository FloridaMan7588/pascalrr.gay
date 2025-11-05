import BaseCard from '@components/cards/base';
import { getAllPosts, getFilteredPosts } from '@lib/posts';
import Link from 'next/link';
import { createElement, isValidElement, ReactNode } from 'react';
import { ScrollOnLoad } from '@components/nav/toTop';
import Filter from '@components/nav/filter';



export default async function Blog({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
	let { postList } = await getAllPosts()
	let displayedPosts = postList;
	let { page, filter } = await searchParams;
	let pageUrlSuffix = '';
	const pages: ReactNode[] = [];

	if (filter) {
		const { filteredPosts, pageUrlSuffix: suffix } = getFilteredPosts(filter, postList)
		pageUrlSuffix = suffix;
		displayedPosts = filteredPosts;
	}

	if (!page) page = '1';
	const pageSize = 6;
	const totalPages = Math.ceil(displayedPosts.length / pageSize);
	if (parseInt(page) > totalPages) page = '1';
	const pageStart = (parseInt(page) - 1) * pageSize;
	const pageEnd = parseInt(page) * pageSize;
	displayedPosts = displayedPosts.slice(pageStart, pageEnd);

	for (let i = 0; i < totalPages; i++) {
		const link = createElement(Link, { href: `${'?page=' + (i + 1) + pageUrlSuffix}`, className: `hover:text-ctp-flamingo focus:text-ctp-flamingo ${((i + 1) == parseInt(page)) ? 'text-ctp-flamingo' : ''}`, scroll: false }, (i + 1))
		pages.push(createElement('div', { key: i, className: 'px-4 py-4' }, link))
	}

	return (
		<main className="bg-ctp-base min-h-screen max-w-screen text-ctp-text scroll-smooth">
			<BaseCard>
				<div>
					<h1 className='text-center text-3xl font-bold py-4 px-2'>Recent Posts</h1>
					<Filter params={await searchParams}></Filter>
				</div>
				<div className='md:grid md:grid-cols-2'>{displayedPosts}</div>
				<div className={`text-center text-xl bg-ctp-crust rounded-[20px] py-2 px-2 max-w-fit items-center justify-self-center justify-center flex flex-row`}>{pages}</div>
			</BaseCard>
			<ScrollOnLoad params={await searchParams} />
		</main>
	)
}