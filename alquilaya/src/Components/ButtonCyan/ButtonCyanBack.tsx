import styles from "./Button.module.css"
import { TbArrowBadgeLeft, TbArrowBadgeLeftFilled } from "react-icons/tb";

const ButtonCyanBack:any = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
    onClick={onClick}
    className={styles.buttonArrowBack}>
    <TbArrowBadgeLeft className="w-10 h-10 p-0 -mr-5" />
    <TbArrowBadgeLeftFilled className="w-10 h-10 p-0 -mr-1" />
</button>
    );
};

export default ButtonCyanBack;