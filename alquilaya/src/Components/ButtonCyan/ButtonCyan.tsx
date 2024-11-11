import styles from "./Button.module.css"
import { TbArrowBadgeRightFilled, TbArrowBadgeRight } from "react-icons/tb";

const ButtonCyan:any = ({ onClick, isDisabled}: { onClick: () => void, isDisabled: boolean }) => {

    return (
        <button
            onClick={onClick}
            disabled= {isDisabled}
            className={styles.buttonArrow}>
            <TbArrowBadgeRightFilled className='w-10 h-10 p-0 -ml-1' />
            <TbArrowBadgeRight className='w-10 h-10 p-0 -ml-5' />
        </button>
    );
};

export default ButtonCyan;