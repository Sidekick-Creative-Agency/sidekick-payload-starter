'use client'

import RichText from "@/components/RichText";
import { Button } from "@/components/ui/button";
import { Page } from "@/payload-types";
import { useEffect, useState } from "react";
import { useGetCookies, useSetCookie, useHasCookie, useDeleteCookie, useGetCookie } from 'cookies-next';
import { CMSLink } from "@/components/Link";
import canUseDOM from "@/utilities/canUseDOM";

interface CookieBannerClientProps {
    content: {
        [k: string]: unknown;
        root: {
            type: string;
            children: {
                type: string;
                version: number;
                [k: string]: unknown;
            }[];
            direction: ("ltr" | "rtl") | null;
            format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
            indent: number;
            version: number;
        };
    } | null | undefined
    links: {
        link: {
            type?: ("reference" | "custom") | null;
            newTab?: boolean | null;
            reference?: {
                relationTo: "pages";
                value: number | Page;
            } | null;
            url?: string | null;
            label: string;
        };
        id?: string | null;
    }[] | null | undefined
}
export const CookieBannerClient: React.FC<CookieBannerClientProps> = ({ content, links }) => {
    const [isVisible, setIsVisible] = useState(false);

    const setCookie = useSetCookie();
    const getCookie = useGetCookie();

    useEffect(() => {
        if (canUseDOM) {
            if (!getCookie('cookie_consent') || getCookie('cookie_consent') !== 'yes') {
                setIsVisible(true)
            } else if (isVisible) {
                setIsVisible(false)
            }
        }
    }, [isVisible]);
    const handleAcceptCookies = () => {
        setCookie('cookie_consent', 'yes');
        setIsVisible(false);
    };

    if (!isVisible || !content) return
    return (
        <div className='fixed top-auto left-auto right-5 bottom-5 sm:right-6 sm:bottom-6 px-5 py-10 sm:p-10 bg-white shadow-lg max-h-[calc(100vh-1.25rem)] sm:max-h-[calc(100vh-2.5rem)] w-[calc(100%-2.5rem)] sm:w-[calc(100%-5rem)] max-w-lg z-50 border border-brand-gray-01 overflow-scroll'>
            <RichText content={content} enableGutter={false} enableProse={false} className="leading-tight font-light text-brand-gray-04 [&_a]:underline [&_a]:text-brand-navy" />
            <Button onClick={handleAcceptCookies} className="w-full mt-10">Opt-In</Button>
            {links && links.length > 0 && (
                <div className="flex gap-x-4 gap-y-2 justify-center items-center mt-4 flex-wrap">
                    {links.map(({ link }, index) => {
                        return <CMSLink key={index} {...link} appearance={'inline'} className="text-sm text-brand-gray-04 underline" />
                    })}
                </div>
            )}
        </div>

    )
}