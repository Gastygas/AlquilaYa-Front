import React, { useState } from 'react';

const IconSelector = ({ data, isSelected, setIsSelected, numCols = 4, iconSize = 48 }: { data: any, isSelected: null, setIsSelected: (data: any) => void, numCols?: number, iconSize?: number }) => {

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className={`grid gap-x-8 gap-y-4 p-4 items-center justify-center`}
                style={{gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`}}>
                {/* {[...Array(12)].map((_, index) => (
                    <button key={index} className="w-36 h-36 border border-gray-400 rounded-md m-1">
                        Icon {index + 1}
                    </button>
                ))} */}
                {data.map((d, index) => (
                    <button
                        key={index}
                        className="w-36 h-36 border border-gray-400 rounded-md m-1 flex flex-col items-center justify-center gap-2"
                        style={{ backgroundColor: d.text === isSelected?.text ? '#aa31cf' : 'white' }}
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