import React from 'react';
import { TbArrowBadgeLeft, TbArrowBadgeLeftFilled } from "react-icons/tb";

const ButtonCyanBack:any = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
    onClick={onClick}
    className="flex items-center justify-center border-2 border-[#aa31cf] bg-secondary text-black px-8 py-3 rounded-lg font-bold hover:scale-110 transition transform duration-200">
    <TbArrowBadgeLeft className="w-10 h-10 p-0 -mr-5" />
    <TbArrowBadgeLeftFilled className="w-10 h-10 p-0 -mr-1" />
</button>
    );
};

export default ButtonCyanBack;