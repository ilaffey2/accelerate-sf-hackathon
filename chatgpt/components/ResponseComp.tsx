import React from 'react';
import Table from "./Table";
import { useEffect, useRef, useState } from 'react'


interface ResponseCompProps {
    item: string;
    index: number;
    tableData: string[][];
    isTableVisible: boolean;
    setTableVisible: (isVisible: boolean) => void;
    //tableContainerRef: React.RefObject<HTMLDivElement>;
}

const ResponseComp: React.FC<ResponseCompProps> = ({
    item,
    index,
    tableData,
    isTableVisible,
    setTableVisible,
    //tableContainerRef,
}) => {

    const tableContainerRef = useRef<any>(null);

    useEffect(() => {
        const container = tableContainerRef.current;
        console.log('container', container)

        if (!container) return;
        const handleWheel = (e: any) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        };

        container.addEventListener('wheel', handleWheel);

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [tableData]);

    return (
        <div>
            <div className={`${index % 2 === 0 ? 'bg-blue-500' : 'bg-gray-300'} p-3 rounded-lg mb-3`}>
                <p className={`${index % 2 === 0 ? 'text-white' : 'text-black'}`}>{item}</p>
            </div>

            {index % 2 !== 0 && (
                <div className='w-full mx-2 flex flex-col items-start gap-3 last:mb-6 md:mx-auto md:max-w-6xl text-xs'>
                    {tableData && tableData.length > 0 && (
                        <button onClick={() => setTableVisible(!isTableVisible)} className="p-2 rounded-md bg-blue-500 text-white">
                            {isTableVisible ? 'Hide Table' : 'Show Table'}
                        </button>
                    )}
                    {tableData && tableData.length > 0 && (
                        <div ref={tableContainerRef} style={{ maxWidth: '100%', maxHeight: '550px', overflowX: 'auto' }} className={isTableVisible ? '' : 'hidden'}>
                            <Table data={tableData} />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ResponseComp;
