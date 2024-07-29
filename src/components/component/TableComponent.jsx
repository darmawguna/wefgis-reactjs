const TableComponent = ({ headers, data }) => {
    return (
        <table className="min-w-full border-collapse border border-gray-200">
            <thead>
                <tr className="bg-gray-100">
                    {headers.map((header, index) => (
                        <th key={index} className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2 text-sm">{index + 1}</td>
                        <td className="border border-gray-200 px-4 py-2 text-sm">{user.name}</td>
                        <td className="border border-gray-200 px-4 py-2 text-sm">{user.email}</td>
                        <td className="border border-gray-200 px-4 py-2 text-sm">{user.phone}</td>
                        <td className="border border-gray-200 px-4 py-2 text-sm">{user.location}</td>
                        <td className="border border-gray-200 px-4 py-2 text-sm">
                            <button className="text-blue-500 hover:underline">View</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TableComponent;