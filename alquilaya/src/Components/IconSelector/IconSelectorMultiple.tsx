import React from 'react';

interface IconOption {
    icon: JSX.Element | string;
    text: string;
};
interface IconSelectorProps {
    data: IconOption[];
    isSelected: IconOption | any;
    setIsSelected: (data: IconOption | null | any) => void;  // Cambiar a aceptar null
    numCols?: number;
    iconSize?: number;
};

const IconSelectorMultiple: React.FC<IconSelectorProps> = ({ data, isSelected, setIsSelected, numCols = 4, iconSize = 48 }) => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div
                className="grid gap-x-8 gap-y-4 p-4 items-center justify-center"
                style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
            >
                {data.map((d, index) => (
                    <button
                        key={index}
                        className={`w-36 h-36 border border-gray-400 rounded-md m-1 flex flex-col items-center justify-center gap-2 ${
                            Array.isArray(isSelected) && isSelected.some((s: any) => s.text === d.text) ? 'bg-purple-500 text-white' : 'bg-white'
                        }`}
                        onClick={() => setIsSelected(d)}
                    >
                        {typeof d.icon === 'string' ? (
                            <img width={iconSize} height={iconSize} src={d.icon} alt="" />
                        ) : (
                            d.icon
                        )}
                        <span className="text-xl">{d.text}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default IconSelectorMultiple;
