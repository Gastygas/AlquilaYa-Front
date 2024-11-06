import React, { useState } from 'react';
import { IsSelectedItem } from '../Sube-tu-propiedad/types';

const IconSelector = ({ data, isSelected, setIsSelected, numCols = 4, iconSize = 48 }: { data: any, isSelected: IsSelectedItem | IsSelectedItem[], setIsSelected: (data: any) => void, numCols?: number, iconSize?: number }) => {
    const isArr = Array.isArray(isSelected)
    const checkSelected = (i:IsSelectedItem) => {
        const selected = isArr ? isSelected.find(s => s.text === i.text) : i.text === isSelected?.text
        return !!selected
    }
    return (
        <div className="flex justify-center items-center">
            <div className={`grid gap-x-8 gap-y-4 p-4 items-center justify-center`}
                style={{gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`}}>
                {/* {[...Array(12)].map((_, index) => (
                    <button key={index} className="w-36 h-36 border border-gray-400 rounded-md m-1">
                        Icon {index + 1}
                    </button>
                ))} */}
                {data.map((d:any, index:any) => (
                    <button
                        key={index}
                        className="w-36 h-36 border border-gray-400 rounded-md m-1 flex flex-col items-center justify-center gap-2"
                        style={{ backgroundColor: checkSelected(d) ? '#aa31cf' : 'white' }}
                        onClick={() => setIsSelected(d)}
                    >
                        {
                            typeof d.icon === 'string' ?
                                <img width={iconSize} height={iconSize} src={d.icon} alt="" /> :
                                d.icon

                        }


                        <span className='text-xl'>
                            {d.text}
                        </span>

                    </button>
                ))}
            </div>
        </div>
    );
};

export default IconSelector;