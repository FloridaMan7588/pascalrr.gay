import { useState, useEffect, useCallback } from "react";

interface useScreenSize {
    resolution: {
        width: number;
        height: number;
    }
    onMobile: boolean;
    isReady: boolean;
}

export function useScreenSize(): useScreenSize {
    const [onMobile, setOnMobile] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [resolution, setResolution] = useState({
        width: null as number | null,
        height: null as number | null
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleResize = () => {
            const currentRes = { width: window.innerWidth, height: window.innerHeight }
            setResolution(currentRes);
            setOnMobile((resolution.width < 768));
        }
        handleResize()
        setIsReady(true);
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize);
    }, [onMobile, resolution.width])
    return { resolution, onMobile, isReady }
}


interface useScrollToTop {
    nearTop: boolean,
    jumpToTop(): void;
}

/**
 * 
 * @param {string} currentPath URL Path of the current page
 * @returns {useScrollToTop} 
 */
export function useScrollToTop(currentPath: string): useScrollToTop {
    const [nearTop, setNearTop] = useState(true)
    const { onMobile, resolution } = useScreenSize()

    const jumpToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
        const rootPath = currentPath.split('#')[0]
        if (currentPath != '/blog') window.history.replaceState(null, '', rootPath)
    }, [currentPath])


    /* Based on this lovely scroll-to-top button from https://gist.github.com/robert-kratz/e750685a279c8701beafdcb2800bdd2c */
    /*Thanks to Robert Kratz! */
    useEffect(() => {
        if (typeof window === 'undefined' && typeof resolution.width !== 'undefined') return;
        const handleScrollAction = () => {
            if (onMobile && window.scrollY > 400) {
                setNearTop(false);
            } else if (window.scrollY > 600) {
                setNearTop(false);
            } else {
                setNearTop(true);
            }
        }
        window.addEventListener('scroll', handleScrollAction)
        return () => window.removeEventListener('scroll', handleScrollAction)
    }, [onMobile, resolution, jumpToTop])
    return { nearTop, jumpToTop }
}

export interface useCurrentParams {
    urlPrefix: string;
    urlParams: string;
    currentParams: {
        [key: string]: string
    }
    hasParams: boolean;
}

export async function useCurrentParams(searchParams: Promise<{ [key: string]: string | undefined }>, currentPath: string): Promise<useCurrentParams> {
    const currentParams = (await searchParams) ?? {};
    let urlPrefix = currentPath;
    let urlParams = '';
    let hasParams = false;
    let params = Object.keys(currentParams);
    if (params.length != 0) {
        hasParams = true
        for (const param of params) {
            if (currentParams[param].includes(' ')) {
                currentParams[param] = currentParams[param].split(' ').join('+')
            } else {
                currentParams[param] = currentParams[param]
            }
            let seperator = '&';
            if (params.indexOf(param) == 0) {
                seperator = '?';
            }
            urlParams += seperator + param + '=' + currentParams[param];
        }
        urlPrefix += urlParams;
    }
    return { urlPrefix, urlParams, currentParams, hasParams }

}