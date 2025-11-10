import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export default function Statistics() {
	return (
		<>
			<SpeedInsights />
			<Analytics />
		</>
	)
}