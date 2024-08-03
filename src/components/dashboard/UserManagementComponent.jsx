import SearchComponent from '../component/SearchComponent';
import PaginationComponent from './PaginationComponent';
import UserManagementStore from '../../store/UserManagementStore';
import ComponentTable from '../component/Table';
import { useEffect, useState } from 'react';
import UserFormWithMap from '../component/UserFormWithMap';
import Swal from 'sweetalert2';

const UserManagement = () => {
    const headers = ["name", "email", "phone_number", "location"];
    const { users, totalPages, currentPage, fetchUsers, setCurrentPage } = UserManagementStore();
    const [isAddingUser, setIsAddingUser] = useState(false);
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
        setSelectedUser({});
    };

    const handleEditUserClick = (user) => {
        setIsAddingUser(true);
        setIsEditingUser(true);
        setSelectedUser(user);
    };


    const handleFormSubmit = () => {
        setIsAddingUser(false); // Kembali ke tampilan tabel setelah submit
        setIsEditingUser(false);
        setSelectedUser(null);

        fetchUsers(currentPage) // Refresh data pengguna
            .then(() => {
                const message = isEditingUser ? 'User data successfully updated.' : 'User successfully added';
                Swal.fire({
                    title: 'Success!',
                    text: message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    const handleDeleteUserClick = async (userId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:3000/users/${ userId }`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete user.');
                }

                Swal.fire('Deleted!', 'User has been deleted.', 'success');
                fetchUsers(currentPage);
            } catch (error) {
                console.error(error);
                Swal.fire('Error!', 'Failed to delete user.', 'error');
            }
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
                        (<div className='font-bold text-lg'>All Users</div>)
                    }

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