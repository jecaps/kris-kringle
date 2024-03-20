"use client";

import Link from "next/link";
import { Button } from "primereact/button";

type ButtonProps = {
    onClick?: () => {};
    link?: string;
    isDisabled?: boolean;
    children: React.ReactNode;
};

export default function Btn({
    onClick,
    link,
    isDisabled,
    children,
}: ButtonProps) {
    if (link) {
        return <Link href={link}>{children}</Link>;
    }

    return (
        <Button disabled={isDisabled} onClick={onClick}>
            {children}
        </Button>
    );
}
