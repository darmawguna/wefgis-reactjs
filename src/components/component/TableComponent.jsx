const TableComponent = ({ headers, data }) => {
    return (
        <div className="p-4">
            <div className="overflow-x-auto">
                {data.length > 0 ? (
                    <table className="min-w-full shadow rounded-lg">
                        <thead className="text-white">
                            <tr className="bg-blue-400 border-b">
                                <th className="px-4 py-2 text-left bg-blue-400 rounded-tl-lg">No</th>
                                {headers.map((header, index) => (
                                    <th key={index} className="px-4 py-2 text-left bg-blue-400">
                                        {header}
                                    </th>
                                ))}
                                <th className="px-4 py-2 text-left bg-blue-400 rounded-tr-lg">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={row.user_id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    {headers.map((header, idx) => (
                                        <td key={idx} className="px-4 py-2">
                                            {row[header.toLowerCase().replace(/ /g, '_')]}
                                        </td>
                                    ))}
                                    <td className="px-4 py-2">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center text-white bg-red-500 p-4 rounded-lg">
                        No data available
                    </div>
                )}
            </div>
        </div>
    );
}

export default TableComponent;