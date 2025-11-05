import { createElement } from 'react';
import { MDXComponents } from 'mdx/types';
import { getPageContent } from '@lib/content';
import dynamic from 'next/dynamic';


interface Props {
    page: string;
    section?: string;
    wrapperClass?: string;
    components?: Record<string, string>;
}

export default async function MDXWrapper({ page, section, wrapperClass, components }: Props) {

    const { Section, components: fileComponents } = await getPageContent({ pageName: page, sectionName: section })
    let parsedComponents: MDXComponents = {};

    if (components) {
        for (const [tag, classes] of Object.entries(components)) {
            parsedComponents[tag] = ({ className, children, ...props }: any) =>
                createElement(tag, { ...props, className: [className, classes].filter(Boolean).join(' ') }, children);
        }
    }

    const mdxComponents: MDXComponents = { ...fileComponents, ...parsedComponents };
    // const mdxComponents: MDXComponents = { ...parsedComponents}

    return (
        <div className={wrapperClass ?? ''}>
            <Section components={mdxComponents} />
        </div>
    )
}