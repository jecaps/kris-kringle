"use client";

// import { useFormStatus } from "react-dom";

export default function Button(props: {
    onClick?: any;
    disabled?: boolean;
    children: React.ReactNode;
}) {
    if (props.onClick) {
        return (
            <button onClick={() => props.onClick()}>{props.children}</button>
        );
    }

    if (props.disabled) {
        return <button disabled>{props.children}</button>;
    }

    return <button>{props.children}</button>;
}
