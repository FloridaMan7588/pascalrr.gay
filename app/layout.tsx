import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false
import "@/globals.css";
import Statistics from "@components/statistics";
import { ReactNode } from "react";

export const metadata = {
	title: "Pascalrr's Site",
	description: "Pascalrr's Personal Website built with Next.js",
	robots: {
		index: true,
		follow: true,
	}
};

export default function GlobalLayout({ children }: { children: ReactNode}) {
	return (
		<html lang="en" className={`scroll-smooth scrollbar-none`}>
			<Statistics />
			{children}
		</html>
	);
}
