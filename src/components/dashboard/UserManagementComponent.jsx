
// import TableComponent from '../component/TableComponent';
import SearchComponent from '../component/SearchComponent';
// import PaginationComponent from './PaginationComponent';
import UserManagementStore from '../../store/UserManagementStore';
import ComponentTable from '../component/Table';
import { useEffect } from 'react';

const UserManagement = () => {


    const headers = ["name", "email", "phone_number", "location"];
    // const { users, fetchUsers } = UserManagementStore(UserManagementStore);
    const users = UserManagementStore((state) => state.users);
    const fetchUsers = UserManagementStore((state) => state.fetchUsers);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    console.log(users);



    // const usersPerPage = 10;
    // const totalPages = Math.ceil(totalItems / usersPerPage);
    // const indexOfLastUser = currentPage * usersPerPage;
    // const indexOfFirstUser = indexOfLastUser - usersPerPage;
    // const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // const handlePageChange = (page) => {
    //     if (page > 0 && page <= totalPages) {
    //         setCurrentPage(page);
    //     }
    // };



    return (
        <div className="flex flex-col p-4 h-full">
            <h1 className='mb-4 text-2xl font-semibold'>User Management</h1>
            <div className="w-full bg-white shadow-lg rounded-lg flex-1 flex flex-col">
                <div className="my-4 flex flex-row justify-between px-4">
                    <div className='font-bold text-lg'>All Users</div>
                    <div className='flex flex-row gap-6'>
                        <SearchComponent />
                        <button>Add User</button>
                    </div>

                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="min-w-full">
                        {/* <TableComponent headers={headers} data={currentUsers} /> */}
                        <ComponentTable headers={headers} data={users} />
                    </div>
                </div>
                <div className='my-4 flex justify-end'>
                    {/* <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    /> */}
                </div>
            </div>
        </div>
    );
}

export default UserManagement;