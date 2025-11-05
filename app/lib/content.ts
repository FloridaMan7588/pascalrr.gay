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
import ToTop from '@components/nav/toTop';
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
    // let mdxSource = fileContents;

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
// const importMatches = mdxSource.matchAll(importRegex)
// for (const match of impo)

//     for (const match of importMatches) {
//         if (!match[1]) break;
//         const name = match[1].trim();
//         if ()
//         // let importAlias = resolveImportAlias(match);
//         // if (importAlias == match[0]) importAlias = match[2];
//         // const mod = dynamic(async () => await import(importAlias));
//         // components[name] = (props: any) => createElement(mod, { ...props });
//         importPaths.push({name, path: importAlias})
//         // console.log(components[name])
//         mdxSource = mdxSource.replace(match[0], '').trim()
//         // components[match[1]] = mod[name]
//         // mdxSource = mdxSource.replace(match[2], importAlias)
//         // console.log(mdxSource)
//         // const mod = await import(importAlias);
//         // const names = match[1].replace(/[{}]/g, '').split(',').map(s => s.trim()).filter(Boolean)
//         // console.log(names)
//         // for (const name of names) {
// //             if (componentRegistry[name]) {
// //                 components[name] = componentRegistry[name];
// //             }
// //             // componentNames.push(name);
// //             // componentPaths.push(resolveImportAlias(match[0]));
//         // }
//     }
//     const componentImports = await Promise.all(
//         componentNames.map(async (name, index) => {
//             const mod = await import(componentPaths[index]);
//             return { name, component: mod.default };
//         }))
//     for (const { name, component } of componentImports) {
//         if (!components[name] && component) components[name] = component;
//     }
// }
// mdxSource = mdxSource.replace(importRegex, '').trim();
// const compiledMdx = await compile(mdxSource, {
//     outputFormat: 'program',
//     jsx: false,
//     baseUrl: process.cwd()
// })
// let output = Function(compiledMdx.value.toString()) as MDXContent
// console.log(compiledMdx.value)
// console.log(new Function(compiledMdx.toString()))
// const jsx = await evaluate(compiledMdx, {...runtime, baseUrl: process.cwd()})
// await evaluate(compiledMdx.value, { ...runtime })

// const Section: MDXContent = () => null;
// const content = await getPageContent({ pageName: 'home', sectionName: 'hero' })
// // let section = content.Section as MDXContent
// console.log(content.components)
// // console.log(String(section))
// // section(undefined)
// // console.log(section(undefined))