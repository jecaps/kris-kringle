"use client";

import Link from "next/link";
import { Button } from "primereact/button";

type ButtonProps = {
    onClick?: () => {} | void;
    link?: string;
    loading?: boolean;
    children: React.ReactNode;
};

export default function Btn({ onClick, link, loading, children }: ButtonProps) {
    if (link) {
        return (
            <Link href={link} className="p-button no-underline text-white">
                {children}
            </Link>
        );
    }

    return (
        <Button loading={loading} onClick={onClick} className="text-white">
            {children}
        </Button>
    );
}
