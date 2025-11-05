'use client'

import { useState } from "react";
import Queerify from "@components/queerify";

export default function Title() {
    const [isHovered, setHovered] = useState(false);

    return (
        <div className='flex place-items-center' onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <Queerify className={`flex place-items-center ${isHovered ? '' : 'text-transparent'}`}>
                <p className={`${isHovered ? 'text-inherit' : ''} text-ctp-text transition-colors duration-200`}>pascalrr</p>
                <p className={`${isHovered ? '' : 'text-inherit'} transition-colors duration-200`}>.gay</p>
            </Queerify>
        </div>
    )
}