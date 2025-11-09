import { join } from 'path';
import { readFile } from 'fs/promises';
import { evaluate } from '@mdx-js/mdx';
import { MDXComponents } from 'mdx/types.js';
import * as runtime from 'react/jsx-runtime';
import Link from 'next/link';
import Image from 'next/image';
import { createElement } from 'react';
import Queerify from '@components/queerify';
import Avatar from '@components/avatar';
import { ToTop } from '@components/nav/toTop';
import PopOver from '@components/popover';

const defaultComponents: MDXComponents = {
    Link: (props: any) => createElement(Link, { ...props }),
    Image: (props: any) => createElement(Image, { ...props }),
    Queerify: (props: any) => createElement(Queerify, { ...props }),
    Avatar: (props: any) => createElement(Avatar, { ...props }),
    ToTop: (props: any) => createElement(ToTop, { ...props }),
    PopOver: (props: any) => createElement(PopOver, {...props})
}


// const resolveImportExtension = (prefix) => {
//     let extension: string = '';
//     if (prefix == '@components') extension += '.tsx';
//     if (prefix == '@lib') extension += '.ts';
//     if (prefix == '@images') extension += '.png';
//     return extension;
// }

// function resolveImportAlias(importMatch: string[]) {
//     const [aliasPrefix, aliasSuffix] = importMatch[2].split('/');
//     const paths = tsConfig.compilerOptions.paths;
//     if (paths[`${aliasPrefix}/*`]) {
//         const pathPrefix = paths[`${aliasPrefix}/*`][0].replace('*', '')
//         const pathSuffix = resolveImportExtension(aliasPrefix);
//         return join(process.cwd(), pathPrefix, aliasSuffix + pathSuffix);
//     }
//     return importMatch[0];
//     // return importStatement.replace(importRegex, (match: string, component: string, alias: string) => {
//         // component = component.trim()
//         // console.log(component)
//         // const [aliasPrefix, aliasSuffix] = alias.split('/');
//         // const paths = tsConfig.compilerOptions.paths;
//         // // const fileExtension = resolveImportExtension(aliasPrefix);
//         // let resolvedPath: string | undefined;
//         // if (paths[`${aliasPrefix}/*`]) {
//         //     const pathValue = paths[`${aliasPrefix}/*`][0].replace(/\.\/|\*/g, '');
//         //     resolvedPath = join(pathValue, aliasSuffix);
//         //     return resolvedPath;
//         // }
//         // return match;
//     // });
// }

interface GetPageContent {
    pageName: string;
    sectionName?: string;
}


export async function getPageContent({ pageName, sectionName }: GetPageContent): Promise<{ Section: React.ComponentType<any>, components: MDXComponents }> {
    const filePath = join(process.cwd(), 'content/pages', `${pageName}.mdx`);
    let mdxSource = await readFile(filePath, 'utf-8');

    const components: MDXComponents = { ...defaultComponents };

    if (sectionName) {
        const importRegex = new RegExp(`import(?:["'\\s]*([\\w*{}\\n, ]+)from\\s*)?["'\\s]*([@\\w/_-]+)["']*;?`, 'g');
        const sectionRegex = new RegExp(`\\{\\/\\*\\ssection:${sectionName}\\s\\*\\/\\}([\\s\\S]*?)(?=\\{\\/\\*\\ssection:|$)`);
        const sectionMatch = mdxSource.match(sectionRegex);
        if (sectionMatch) {
            mdxSource = sectionMatch[1].trim();
            const importMatches = mdxSource.matchAll(importRegex);
            for (const match of importMatches) {
                mdxSource = mdxSource.replace(match[0], '').trim();
            }
        }
    }
    const { default: Section } = await evaluate(mdxSource, { ...runtime })
    return {
        Section,
        components
    }
}