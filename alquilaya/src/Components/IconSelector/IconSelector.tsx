import React from 'react';
import { IsSelectedItem } from '../Sube-tu-propiedad/types';
import styles from "./Icon.module.css"

interface IconSelectorProps {
    data: IsSelectedItem[];
    isSelected: IsSelectedItem[] | IsSelectedItem | null;
    setIsSelected: (service: IsSelectedItem) => void;
    numCols?: number;
    iconSize?: number;
}

const IconSelector: React.FC<IconSelectorProps> = ({ data,
    isSelected,
    setIsSelected,
    numCols = 4,
    iconSize = 48 }) => {


    const checkSelected = (item: IsSelectedItem) => {

        return Array.isArray(isSelected) ? isSelected.some(d => d.id === item.id): item.id === isSelected?.id
    };


//     const handleSelect = (item: IsSelectedItem) => {
//         const newSelectedItems = checkSelected(item)
//             ? isSelected?.filter((service: IsSelectedItem) => service.id !== item.id)
//             : item;
// console.log(newSelectedItems)
//         setIsSelected(newSelectedItems);
//     };

    return (
        <div className="flex justify-center items-center">
            <div
                className={styles.gridContainer}
                style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
            >
                {data.map((d) => (
                    <button
                        key={d.id}
                        className={styles.button}
                        style={{ backgroundColor: checkSelected(d) ? '#aa31cf' : 'white' }}
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
    );
};

export default IconSelector;
