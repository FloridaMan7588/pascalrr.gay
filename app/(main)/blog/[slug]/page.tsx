import { getAllPosts } from '@lib/posts';
import BaseCard from '@components/cards/base';
import CommentCard from '@components/cards/comment';
import './post.css'
import { MDXContent } from 'mdx/types';
import { Suspense } from 'react';

interface Content {
	title?: string;
	date: string;
	author?: string;
	slug: string;
	comments: boolean
	Section: MDXContent
}

async function PostSkeleton(postContent: Content | 'loading') {
	if (postContent === 'loading') {
		return (<>
			<div className="animate-pulse">
				<div className='flex justify-center'>
					<div className="rounded-full bg-ctp-surface0 py-4 px-2 w-1/3 h-8" />
				</div>
				<div className='flex justify-between px-4 py-2 min-h-4 min-w-full'>
					<div className="h-6 w-1/3 rounded-full bg-ctp-surface0" />
					<div className="h-6 w-1/4 rounded-full bg-ctp-surface0" />
				</div>
				<div className='flex justify-center h-fit'>
					<div className="h-8 rounded-full bg-ctp-surface0 w-full mx-4 py-2 my-4"></div>
				</div>
			</div>
		</>);
	}

	const Section = postContent.Section;

	return (<>
		<h1 className='text-ctp-text text-center text-3xl font-bold py-4 px-2'>{postContent.title}</h1>
		<div className='flex justify-between px-4 py-2'>
			<p className='text-ctp-text text-md font-bold'>{postContent.date}</p>
			<p className='text-ctp-text text-md font-bold'>{postContent.author}</p>
		</div>
		<div className='text-ctp-text' id='postContent'>
			<Section />
		</div>
		{postContent.comments == true &&
			<CommentCard />
		}
	</>)
}

async function PostContent({ params }) {
	const { slug } = await params;
	const { blogList } = await getAllPosts();

	let postContent: Content;

	for (const post of blogList) {
		if (slug == post.slug) postContent = await post.getPostData();
	}

	return (PostSkeleton(postContent))
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
	return (
		<main className="bg-ctp-base min-h-screen max-w-screen">
			<BaseCard>
				<Suspense fallback={PostSkeleton('loading')}>
					<PostContent params={params} />
				</Suspense>
			</BaseCard>
		</main>
	)
}