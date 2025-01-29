import "./style.css";

type Props = {
    children: React.ReactNode,
    onClick?: () => void,
    width?: string
}

function Button({children, onClick, width}: Props) {
    return (
        <button onClick={onClick} style={width ? { width } : undefined}>
            {children}
        </button>
    );
}

export default Button;
