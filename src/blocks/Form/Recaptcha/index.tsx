"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useId, useRef } from "react";

declare global {
    const grecaptcha: {
        enterprise: {
            ready: (cb: () => void) => void;
            execute: (
                siteKey: string,
                options: { action: string }
            ) => Promise<string>;
        };
    };
}
interface Props {
    action: string;
    setToken: React.Dispatch<React.SetStateAction<string>>
}

export function Recaptcha({ action, setToken }: Props) {
    const id = useId()
    const inputRef = useRef<HTMLInputElement | null>(null)
    const pathname = usePathname()
    const executeRecaptcha = () => {
        if (typeof grecaptcha !== "undefined") {
            grecaptcha.enterprise.ready(async () => {
                try {
                    const token = await grecaptcha.enterprise.execute(
                        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
                        { action }
                    );
                    if (inputRef.current) {
                        inputRef.current.value = token
                        setToken(token)
                    }
                } catch (e) {
                    console.error("Recaptcha error", e);
                }
            });
        }
    };

    useEffect(() => {
        executeRecaptcha()
    }, [typeof grecaptcha, pathname])

    return (
        <>
            <Script
                src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                strategy="afterInteractive"
            />
            <input type="hidden" name="recaptchaToken" id={`recaptcha-token_${id}`} ref={inputRef} />
        </>
    );
}