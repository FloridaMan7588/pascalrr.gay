import { Raleway } from "next/font/google";
import Header from '@components/nav/header';
import Footer from '@components/nav/footer';
import ToTop from '@components/nav/toTop';
import ONeko from "@components/neko";
import { ReactNode } from "react";

const raleway = Raleway({ subsets: ["latin"], preload: true, variable: "--font-raleway" });


export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<body className={`${raleway.variable} font-sans bg-ctp-base`}>
			<Header />
			{children}
			<ToTop />
			<Footer />
			<ONeko />
		</body>
	);
}
