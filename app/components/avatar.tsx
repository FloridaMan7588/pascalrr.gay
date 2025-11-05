import Gravatar from 'react-awesome-gravatar'
import Image from 'next/image';
import { appConfig } from '~/config';

interface Props {
	className?: string | undefined;
}

export default function Avatar({ className }: Props) {
	return (
		<Gravatar email={appConfig.email} options={appConfig.gravatarOptions}>
			{url => (<Image src={url} alt='Avatar' className={className} sizes='(max-width: 1200px) 100vw, (max-width: 1200px) 50vw, 33vw' fill priority={true}/>)}
		</Gravatar>
	)
}