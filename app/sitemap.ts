export default function sitemap() {
	return [
		{
			url: 'https://pascalrr.gay',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: 'https://pascalrr.gay/blog',
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		}
	]
}