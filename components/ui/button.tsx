"use client";

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";

type ButtonProps = {
    onClick?: () => {} | void;
    href?: string;
    loading?: boolean;
    className?: string;
    severity?: "secondary" | "success" | "info" | "warning" | "danger" | "help";
    outlined?: boolean;
    disabled?: boolean;
    raised?: boolean;
    text?: boolean;
    rounded?: boolean;
    size?: "small" | "large";
    link?: boolean;
    children: React.ReactNode;
};

export default function Btn({
    onClick,
    href,
    loading,
    className,
    severity,
    outlined,
    disabled,
    raised,
    text,
    rounded,
    size,
    link,
    children,
}: ButtonProps) {
    const router = useRouter();

    return (
        <Button
            label={children?.toString()}
            loading={loading}
            onClick={href ? () => router.push(href) : onClick}
            className={`${className} text-white`}
            severity={severity}
            outlined={outlined}
            disabled={disabled}
            raised={raised}
            text={text}
            size={size}
            rounded={rounded}
            link={link}
        />
    );
}
