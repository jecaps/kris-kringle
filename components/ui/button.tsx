"use client";
export default function Button(props: {
    onClick?: any;
    children: React.ReactNode;
}) {
    return <button onClick={() => props.onClick()}>{props.children}</button>;
}
