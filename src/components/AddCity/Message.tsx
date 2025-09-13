interface MessageProps {
    text: string | null;
}

export default function Message({ text }: MessageProps) {
    if (!text) return null;
    return <p>{text}</p>;
}