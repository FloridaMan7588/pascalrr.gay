import { Raleway } from "next/font/google";
import Link from "next/link";

const raleway = Raleway({ subsets: ["latin"], preload: true, variable: "--font-raleway" });


export default function Custom404() {
	return (
		<body>
			<main className={`${raleway.variable} font-sans bg-ctp-base min-h-screen max-w-screen`}>
				<div className="flex flex-col text-center justify-center items-center h-[100vh]">
					<h1 className='text-3xl font-bold px-2 py-2 text-ctp-text'>Whoops! You&apos;ve gone somewhere you weren&apos;t supposed to...</h1>
					<p className="px-2 py-2 text-ctp-subtext1"><Link href='/' className='text-ctp-flamingo'>Click here</Link> to go back to the home page</p>
				</div>
			</main>
		</body>
	)
}