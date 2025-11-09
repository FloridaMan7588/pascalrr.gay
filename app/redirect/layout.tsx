import { Suspense } from "react";

export default function RootLayout({ children }) {
	return (
		<main className="bg-ctp-base min-h-screen max-w-screen">
			<Suspense>{children}</Suspense>
		</main>
	)
}