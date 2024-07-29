

const ComponentTable = ({ headers, data }) => {
    return (
        <div className="overflow-x-auto p-4">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="py-2 px-4 border border-gray-200 text-left">No</th>
                        {headers.map((header, index) => (
                            <th key={index} className="py-2 px-4 border border-gray-200 text-left">
                                {header}
                            </th>
                        ))}
                        <th className="py-2 px-4 border border-gray-200 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => {
                        const isLastRow = rowIndex === data.length - 1;
                        return (
                            <tr key={rowIndex} className={`${ rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white' } ${ isLastRow ? 'border-b-2 border-gray-200' : '' }`}>
                                <td className="py-2 px-4 border border-gray-200">{rowIndex + 1}</td>
                                {headers.map((header, colIndex) => (
                                    <td key={colIndex} className="py-2 px-4 border border-gray-200">
                                        {row[header]}
                                    </td>
                                ))}
                                <td className="py-2 px-4 border border-gray-200">Action</td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr className="bg-white rounded-b-lg">
                        <td colSpan={headers.length + 2} className="py-2 border-0">
                            {/* Optional footer content */}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default ComponentTable;