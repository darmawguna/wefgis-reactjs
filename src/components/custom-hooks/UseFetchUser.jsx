import { useEffect } from 'react';
import UserManagementStore from '../../store/UserManagementStore';


const UseFetchUsers = () => {
    const fetchUsers = UserManagementStore((state) => state.fetchUsers);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
};

export default UseFetchUsers;