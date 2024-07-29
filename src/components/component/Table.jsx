const ComponentTable = ({ headers, data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        {headers.map((header, index) => (
                            <th key={index} className="py-2 px-4 border border-gray-200 text-left">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className={`${ rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white' }`}>
                            {headers.map((header, colIndex) => (
                                <td key={colIndex} className="py-2 px-4 border border-gray-200">
                                    {row[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ComponentTable;