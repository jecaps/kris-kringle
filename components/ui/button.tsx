"use client";

import Link from "next/link";

type ButtonProps = {
    onClick?: () => {};
    link?: string;
    isDisabled?: boolean;
    children: React.ReactNode;
};

export default function Button({
    onClick,
    link,
    isDisabled,
    children,
}: ButtonProps) {
    if (link) {
        return <Link href={link}>{children}</Link>;
    }

    return (
        <button disabled={isDisabled} onClick={onClick}>
            {children}
        </button>
    );
}
