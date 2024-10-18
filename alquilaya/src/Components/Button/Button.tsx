import Link from "next/link";

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

    return <Link href=""><button className={`
 flex text-sm px-10 py-[7px] rounded-[20px]
cursor-pointer transition-all duration-300 hover:scale-90 ${variantClass} active:scale-105 ${className} `}
        onClick={onClick}
    >{children}</button></Link>
}

export default Button