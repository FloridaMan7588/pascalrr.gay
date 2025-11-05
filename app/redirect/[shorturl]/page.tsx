import { checkRedirect } from "@lib/shorturls"
import { redirect } from "next/navigation";


export default async function Redirector({params} : { params: Promise<{shorturl: string}>}) {
	const { shorturl } = await params
	let destination = shorturl;
	if (!destination) {
		redirect("/404")
	}
	redirect(checkRedirect(destination))
}