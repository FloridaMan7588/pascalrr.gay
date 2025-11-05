'use client'
import { ReactNode, useEffect, useState } from "react";

export default function Queerify({ children, className }: { children: ReactNode, className?: string }) {
    const [randomAnimation, setRandomAnimation] = useState<number | null>(null);
    useEffect(() => {
        setRandomAnimation(Math.floor(Math.random() * 3));
    }, [])

    let animationClass;
    switch (randomAnimation) {
        case 0:
            animationClass = 'bi-animated';
            break;
        case 1:
            animationClass = 'enby-animated';
            break;
        case 2:
            animationClass = 'fluid-animated';
            break;
    }
    return (
        <span className={`${animationClass} transition-colors duration-400 ${className ? className : ''}`}>
            {children}
        </span>
    )
}