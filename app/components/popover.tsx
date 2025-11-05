'use client'
import { ReactNode, useState } from "react";

type ComponentProps = {
    children?: ReactNode,
    content: string,
    className?: string,
    backgroundClassName?: string,
    showByDefault?: boolean
}

export default function PopOver({ children, content, className, backgroundClassName, showByDefault }: ComponentProps) {
    const [isHovered, setHovered] = useState(showByDefault ?? false);
    if (showByDefault == true) setTimeout(() => setHovered(false), 2500)
    if (!backgroundClassName) backgroundClassName = "bg-ctp-surface0";
    return (
        <span onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
            <span className="min-w-fit relative min-h-full inline-block">
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 z-40">
                    <span className={`${isHovered ? 'visible' : 'hidden'}`}>
                        <span className={`${backgroundClassName} p-1 text-xs flex min-w-fit text-nowrap align-content-center justify-center rounded-lg`}>
                            <span className="min-w-fit text-center">
                                <span className={`${className}`}>
                                    {content}
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
                <span className={`${backgroundClassName} max-w-fit px-1 rounded-md bg-opacity-25 hover:text-ctp-flamingo`}>
                    {children}
                </span>
            </span>
        </span>
    )
}