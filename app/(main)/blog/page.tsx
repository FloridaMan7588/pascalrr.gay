import BaseCard from '@components/cards/base';
import { getAllPosts, getFilteredPosts } from '@lib/posts';
import Link from 'next/link';
import { createElement, ReactNode, Suspense } from 'react';
import { ScrollOnLoad } from '@components/nav/toTop';
import Filter from '@components/nav/filter';


async function ListSkelton(props: { postList: ReactNode[]; pageList: ReactNode[] } | 'loading') {
	if (props === 'loading') {
		const postList: ReactNode[] = []
	for (let i = 0; i < 6; i++) postList.push(<div className='py-4 h-fit md:p-4' key={i}><div className="rounded-[45px] bg-ctp-surface0 p-4 min-h-[275px]" /></div>)
		return (<>
			<div className='h-fit justify-center flex animate-pulse'>
				<div className='md:grid md:grid-cols-2 w-full'>
					{postList}
				</div>
			</div>
		</>);
	}
	return (
		<>
			<div className='md:grid md:grid-cols-2'>{props.postList}</div>
			<div className='px-4'>
				<div className='text-center text-xl bg-ctp-crust rounded-[20px] py-2 px-2 max-w-fit items-center justify-self-center justify-center flex flex-row'>
					{props.pageList}
				</div>
			</div>
		</>
	)
}


async function PostList({ params }) {
	const searchParams = await params;
	const currentFilters = searchParams.filter;
	const currentPage = searchParams.page;
	let { postList } = await getAllPosts()
	let urlSuffix = '';

	if (currentFilters) {
		const { filteredPosts, pageUrlSuffix: suffix } = getFilteredPosts(currentFilters, postList);
		urlSuffix = suffix;
		postList = filteredPosts;
	}

	let page = 1;
	if (currentPage) page = parseInt(currentPage);
	const pageSize = 6;
	const totalPages = Math.ceil(postList.length / pageSize);
	if (page > totalPages) page = 1;
	const pageStart = (page - 1) * pageSize;
	const pageEnd = page * pageSize;
	postList = postList.slice(pageStart, pageEnd);

	let pageList: ReactNode[] = [];
	for (let i = 0; i < totalPages; i++) {
		const link = createElement(Link, { href: `${'?page=' + (i + 1) + urlSuffix}`, className: `hover:text-ctp-flamingo focus:text-ctp-flamingo ${((i + 1) == page) ? 'text-ctp-flamingo' : ''}`, scroll: false }, (i + 1))
		pageList.push(createElement('div', { key: i, className: 'px-4 py-4' }, link))
	}

	return (ListSkelton({ pageList, postList}))
}


export default async function Blog({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
	return (
		<main className="bg-ctp-base min-h-screen max-w-screen text-ctp-text scroll-smooth">
			<BaseCard>
				<div>
					<h1 className='text-center text-3xl font-bold py-4 px-2'>Recent Posts</h1>
					<Filter params={searchParams} />
				</div>
				<Suspense fallback={ListSkelton('loading')}>
					<PostList params={searchParams} />
				</Suspense>
			</BaseCard>
			<Suspense><ScrollOnLoad params={searchParams} /></Suspense>
		</main>
	)
}