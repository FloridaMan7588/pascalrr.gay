import { ReactNode } from "react"

interface Props {
	children: ReactNode;
	id?: string;
}

export default function BaseCard({children, id}: Props) {
	return (
		<div className="px-8 py-8 md:px-12" id={id}>
			<div className='bg-ctp-mantle rounded-[45px] min-h-fit p-4 sm:px-8'>
				{children}
			</div>
		</div>
	)
}