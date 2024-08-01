import SearchComponent from '../component/SearchComponent';
import PaginationComponent from './PaginationComponent';
import UserManagementStore from '../../store/UserManagementStore';
import ComponentTable from '../component/Table';
// import AddUserForm from '../component/UserForm'; // Import komponen form
import { useEffect, useState } from 'react';
import UserFormWithMap from '../component/UserFormWithMap';

const UserManagement = () => {
    const headers = ["name", "email", "phone_number", "location"];
    const { users, totalPages, currentPage, fetchUsers, setCurrentPage } = UserManagementStore();
    const [isAddingUser, setIsAddingUser] = useState(false); // State untuk kontrol tampilan form
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {
        fetchUsers(currentPage); // Fetch data for the current page
    }, [fetchUsers, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchUsers(page); // Fetch data for the new page
    };


    const handleAddUserClick = () => {
        setIsAddingUser(true); // Set state untuk menampilkan form
        setIsEditingUser(false);
        setSelectedUser(null);
        // console.log(isAddingUser);
    };

    const handleEditUserClick = (user) => {
        setIsAddingUser(true);
        setIsEditingUser(true);
        setSelectedUser(user);
        console.log(user);
    };


    const handleFormSubmit = () => {
        setIsAddingUser(false); // Kembali ke tampilan tabel setelah submit
        setIsEditingUser(false);
        setSelectedUser(null);
        fetchUsers(currentPage); // Refresh data pengguna
    };

    const handleDeleteUserClick = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${ userId }`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user.');
            }

            fetchUsers(currentPage); // Refresh data pengguna setelah delete
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex flex-col p-4 h-full overflow-y-auto ">
            <h1 className='mb-4 text-2xl font-semibold'>User Management</h1>
            <div className="w-full bg-white shadow-lg rounded-lg flex-1 flex flex-col">
                <div className="my-4 flex flex-row justify-between px-4">
                    {isAddingUser || isEditingUser ?
                        (<div className='font-bold text-lg'>{isEditingUser ? 'Edit User' : 'Add User'}</div>)
                        :
                        (<div className='font-bold text-lg'>All Users</div>)}

                    {isAddingUser || isEditingUser ? (
                        ""
                    ) : (
                        <div className='flex flex-row gap-6'>
                            <SearchComponent />
                                <div>
                                    <button
                                        onClick={handleAddUserClick}
                                        className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                                    >
                                        Add User
                                    </button>
                                </div>
                        </div>
                    )}

                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="min-w-full">
                        {isAddingUser || isEditingUser ? (
                            <UserFormWithMap onSubmit={handleFormSubmit} initialValues={selectedUser} />
                        ) : (
                                <ComponentTable
                                    headers={headers}
                                    data={users}
                                    onEdit={handleEditUserClick}
                                    onDelete={handleDeleteUserClick}
                                    currentPage={currentPage}
                                    itemsPerPage={10}
                                />
                        )}
                    </div>
                </div>
                {!isAddingUser && !isEditingUser && (
                    <div className='my-4 flex justify-end mr-4'>
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}

            </div>
        </div>
    );
}

export default UserManagement;