import styles from "./Button.module.css"
interface IButton {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "transparent";
    onClick?: () => void;
    href?: string
}

const Button = ({ children,
    className = "",
    variant = "primary",
    onClick,

}: IButton) => {

    const variantClass = variant === "primary" ? "bg-primary" : variant === "secondary"
        ? "bg-secondary"
        : "bg-transparent";

    return <button className={`
 flex text-sm px-[10px] py-[7px] rounded-[20px]
cursor-pointer transition-all duration-300 hover:scale-90 active:scale-105 ${variantClass} ${className} `}
        onClick={onClick}
    >{children}</button>
}

export default Button