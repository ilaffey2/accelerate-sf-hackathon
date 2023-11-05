'use client'
import React from 'react';
import { useTable } from 'react-table';


const Table = ({ data }: {data: any}) => {
  const columns = React.useMemo(
    () => Object.keys(data[0]).map((key, index) => ({
      Header: key,
      accessor: key,
      id: index.toString(),
    })),
    [data]
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()} className=" divide-y divide-gray-200 p-4" >
      <thead className="bg-gray-50">
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, index) => (
              <th {...column.getHeaderProps()} key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={index}>
              {row.cells.map((cell, index) => (
                <td {...cell.getCellProps()} key={index} className="px-6 py-4 whitespace-nowrap">{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;