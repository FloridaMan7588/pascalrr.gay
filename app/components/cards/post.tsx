import Link from 'next/link'
import parse from 'html-react-parser';
import { PostType } from '@lib/posts';

interface Props {
	title: string;
	date: Date;
	formattedDate: string;
	description?: string;
	author: string;
	slug: string;
	type: PostType
}

export default function PostCard({ title, formattedDate, description, author, slug, type }: Props) {
	const postUrl = (type === 'blog' ? '/blog/' + slug : slug);
	return (
		<Link href={postUrl} className='p-4 text-ctp-text'>
			<div className='bg-ctp-crust rounded-[45px] min-h-full p-4 hoverPop105'>
				<div className='p-4'>
					<div className={`flex flex-col sm:flex-row justify-between items-center min-h-fit ${(title.length > 20) ? 'max-w-fit' : 'max-w-min'}`}>
						<h2 className='text-4xl font-bold'>{title}</h2>
					</div>
					<p className='text-lg font-semibold py-2'>{author}</p>
					<p className='text-left text-lg'>{formattedDate}</p>
					<br></br>
					<hr></hr>
					<br></br>
					{type === 'mastodon'
						? <div className='text-lg text-left'>{(parse(description))}</div>
						: <p className='text-lg text-left'>{description}</p>
					}
				</div>
			</div>
		</Link>
	)
}