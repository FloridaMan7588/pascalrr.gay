import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false
import "@/globals.css";
import { ReactNode } from "react";
import Statistics from "@components/statistics";

export const metadata = {
	title: "Pascalrr's Site",
	description: "Pascalrr's Personal Website built with Next.js",
	robots: {
		index: true,
		follow: true,
	}
};

export default async function GlobalLayout({ children }: { children: ReactNode}) {
	return (
		<html lang="en" className={`scroll-smooth scrollbar-none`}>
			<head>
				<Statistics/>
			</head>
			{children}
		</html>
	);
}
