import Link from "next/link";
import { ReactElement } from "react";

interface Props {
	title: string;
	content: string;
	contacts: {
		link: string;
		title: string;
	}[];
}

export default function AboutCard({ title, content, contacts }: Props) {
	const contactList: ReactElement[] = [];
	for (const contact of contacts) {
		const listId: number = contacts.indexOf(contact);
		contactList.push(
			<li className="py-2 md:py-4" key={listId}>
				<Link href={contact.link}>
					<div className="text-ctp-flamingo hoverPop105">
						{"• " + contact.title}
					</div>
				</Link>
			</li>
		);
	}
	return (
		<div className="bg-ctp-mantle rounded-[45px]">
			<h1 className="text-ctp-text text-center text-4xl font-bold px-7 py-4">
				{title}
			</h1>
			<div className="grid-cols-1 grid md:flex md:justify-center place-items-center px-4">
				<div className="text-ctp-text text-center px-2 md:text-2xl md:px-16 text-lg md:py-8">
					<p>{content}</p>
				</div>
				<div className="py-8">
					<div className="text-ctp-text px-8 md:px-16 py-4 rounded-[45px] justify-center min-w-fit bg-crust">
						<h2 className="text-3xl font-bold py-4">Preferred Contact Methods</h2>
						<ul className="md:text-xl text-lg md:w-64">{contactList}</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
