'use client'
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCurrentParams } from "@lib/hooks";
import { usePathname } from "next/navigation";

export default function Filter({ params }: { params: Promise<{ [key: string]: string | undefined }> }) {
    const currentPath = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [hasFilters, setHasFilters] = useState(false);
    const [sortPrefix, setSortPrefix] = useState('?filter=');
    const [noSortUrl, setNoSortUrl] = useState(usePathname());
    const [possibleFilters, setPossibleFilters] = useState({
        aToZ: true,
        zToA: true,
        latest: true,
        oldest: true,
        blog: true,
        mastodon: true,
    });


    useEffect(() => {
        const defaultFilters = {
            aToZ: true,
            zToA: true,
            latest: true,
            oldest: true,
            blog: true,
            mastodon: true,
        };
        useCurrentParams(params, currentPath).then(({ currentParams, urlParams }) => {
            if (!currentParams.filter) {
                setSortPrefix('?filter=')
                setHasFilters(false);
                setPossibleFilters({ ...defaultFilters })
            }
            if (currentParams.page) {
                setSortPrefix('?page=' + currentParams.page + '&filter=')
                setNoSortUrl('?page=' + currentParams.page)
            }
            if (currentParams.filter) {
                setSortPrefix(urlParams + '+');
                setHasFilters(true);
                const disabledFiltersMap: Record<string, Partial<typeof defaultFilters>> = {
                    az: { aToZ: false, zToA: false },
                    za: { aToZ: false, zToA: false },
                    latest: { latest: false, oldest: false },
                    oldest: { latest: false, oldest: false },
                    blog: { blog: false },
                    mastodon: { mastodon: false }
                }
                let newState = { ...defaultFilters };
                currentParams.filter.split('+').forEach(filter => {
                    const disabled = disabledFiltersMap[filter];
                    if (disabled) Object.assign(newState, disabled);
                });
                setPossibleFilters(newState);

            }
        });
    }, [params])
    return (
        <div>
            <button type="button" className={`flex text-ctp-text absolute top-40 right-12 sm:right-20 z-30`} onClick={() => setIsOpen(!isOpen)} aria-label='Sort Menu'>
                <div className={`transition-[padding-bottom] duration-75 ease-in-out ${isOpen ? 'pb-10 text-ctp-flamingo items-left' : 'text-ctp-text items-center duration-0'} p-2 flex bg-ctp-crust rounded-full`}>
                    <FontAwesomeIcon icon={faFilter} />
                </div>
            </button>
            <div className="relative">
                <div className={`transition-opacity ease-in-out duration-100 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'} left-[80%] -right-2 -top-4 absolute z-50 flex justify-end items-center p-2`}>
                    <div className={`flex bg-ctp-crust shadow-lg shadow-ctp-mantle relative rounded-[25px] justify-self-end p-2`}>
                        <div className={`flex flex-col h-fit w-full p-2 sm:text-justify text-left text-nowrap`}>
                            <Link href={sortPrefix + 'az'} onClick={() => setIsOpen(!isOpen)} className={`${possibleFilters.aToZ ? 'visible' : 'hidden'} px-2 py-0.5 text-ctp-text font-bold`}>A-Z</Link>
                            <Link href={sortPrefix + 'za'} onClick={() => setIsOpen(!isOpen)} className={`${possibleFilters.zToA ? 'visible' : 'hidden'} px-2 py-0.5 text-ctp-text font-bold`}>Z-A</Link>
                            <Link href={sortPrefix + 'latest'} onClick={() => setIsOpen(!isOpen)} className={`${possibleFilters.latest ? 'visible' : 'hidden'} px-2 py-0.5 text-ctp-text font-bold`}>Newest First</Link>
                            <Link href={sortPrefix + 'oldest'} onClick={() => setIsOpen(!isOpen)} className={`${possibleFilters.oldest ? 'visible' : 'hidden'} px-2 py-0.5 text-ctp-text font-bold`}>Oldest First</Link>
                            <Link href={sortPrefix + 'blog'} onClick={() => setIsOpen(!isOpen)} className={`${possibleFilters.blog ? 'visible' : 'hidden'} px-2 py-0.5 text-ctp-text font-bold`}>Blog Posts</Link>
                            <Link href={sortPrefix + 'mastodon'} onClick={() => setIsOpen(!isOpen)} className={`${possibleFilters.mastodon ? 'visible' : 'hidden'} px-2 py-0.5 text-ctp-text font-bold`}>Mastodon Posts</Link>
                            <Link href={noSortUrl} onClick={() => setIsOpen(!isOpen)} className={`${hasFilters ? 'visible' : 'hidden'} px-2 py-0.5 text-ctp-text font-bold`}>Remove Filters</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}