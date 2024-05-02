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
    plain?: boolean;
    link?: boolean;
    icon?: string;
    type?: "button" | "submit" | "reset";
    style?: React.CSSProperties;
    children?: React.ReactNode;
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
    plain,
    link,
    icon,
    type,
    children,
    style,
}: ButtonProps) {
    const router = useRouter();

    return (
        <Button
            loading={loading}
            onClick={href ? () => router.push(href) : onClick}
            className={`${className} text-white`}
            severity={severity}
            outlined={outlined}
            disabled={disabled}
            raised={raised}
            text={text}
            size={size}
            plain={plain}
            rounded={rounded}
            link={link}
            icon={icon}
            style={style}
            type={type}
        >
            {children}
        </Button>
    );
}
