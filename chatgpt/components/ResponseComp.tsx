import React from 'react';
import Table from "./Table";
import { useEffect, useRef, useState } from 'react'


interface ResponseCompProps {
    item: string;
    index: number;
    tableData: string[][];
    sql: string;
    //isTableVisible: boolean;
    //setTableVisible: (isVisible: boolean) => void;
    //tableContainerRef: React.RefObject<HTMLDivElement>;
}

const ResponseComp: React.FC<ResponseCompProps> = ({
    item,
    index,
    tableData,
    sql,
    //isTableVisible,
    //setTableVisible,
    //tableContainerRef,
}) => {

    const tableContainerRef = useRef<any>(null);
    const [isTableVisible, setTableVisible] = useState(false);


    return (
        <div>
            <div className={`${index % 2 === 0 ? 'bg-blue-500' : 'bg-gray-300'} p-3 rounded-lg mb-3`}>
                <p className={`${index % 2 === 0 ? 'text-white' : 'text-black'}`}>{item}</p>
            </div>

            {index % 2 !== 0 && (
                <div className='w-full mx-2 flex flex-col items-start gap-3 last:mb-6 md:mx-auto md:max-w-6xl text-xs'>
                    {tableData && tableData.length > 0 && (
                        <button onClick={() => setTableVisible(!isTableVisible)} className="p-2 rounded-md bg-blue-500 text-white">
                            {isTableVisible ? 'Hide Data' : 'Show Data'}
                        </button>
                    )}
                    {tableData && tableData.length > 0 && (
                        <div ref={tableContainerRef} style={{ maxWidth: '100%', maxHeight: '550px', overflowX: 'auto' }} className={isTableVisible ? '' : 'hidden'}>
                            <div>
                                <div className='w-full mx-2 flex flex-col items-start gap-3 pb-6 last:mb-6 md:mx-auto md:max-w-6xl'>
                                    {sql && <div className="inline-flex items-center bg-gray-800 text-green-400 text-xs px-2 py-1 rounded-md border border-green-400 font-mono flex-col gap-y-6">
                                        <span className="mr-1 font-bold text-white">SQL Query:</span>
                                        <code className='mx-6'>{sql}</code>
                                    </div>}
                                    <Table data={tableData} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )
            }
        </div>
    )
}
export default ResponseComp;
