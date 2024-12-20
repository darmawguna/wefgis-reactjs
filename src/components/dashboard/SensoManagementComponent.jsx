import SensorManagementStore from "../../store/SensorManagementStore";
import SearchComponent from "../component/SearchComponent";
import ComponentTable from "../component/Table";

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import PaginationComponent from "./PaginationComponent";
import SensorForm from "../component/sensorForm";

const SensorManagementComponent = () => {
    const [isAddingSensor, setIsAddingSensor] = useState(false);
    const [isEditingSensor, setIsEditingSensor] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState(null);
    const { sensors, totalPages, currentPage, fetchSensors, setCurrentPage } = SensorManagementStore();
    const headers = ['location', 'description', 'status'];

    useEffect(() => {
        fetchSensors(currentPage); // Fetch data for the current page
    }, [fetchSensors, currentPage]);

    const handleAddSensorClick = () => {
        setIsAddingSensor(true); // Set state untuk menampilkan form
        setIsEditingSensor(false);
        setSelectedSensor({});
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchSensors(page); // Fetch data for the new page
    };

    const handleEditSensorClick = (sensor) => {
        setIsAddingSensor(false);
        setIsEditingSensor(true);
        setSelectedSensor(sensor);
    };

    const handleDeleteSensorClick = async (id) => {
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
                const response = await fetch(`https://api.fmews.wefgis.com/api/sensors/${ id }`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete sensor.');
                }

                Swal.fire('Deleted!', 'Sensor has been deleted.', 'success');
                fetchSensors(currentPage);
            } catch (error) {
                console.error(error);
                Swal.fire('Error!', 'Failed to delete sensor.', 'error');
            }
        }

    };

    const handleFormSubmit = () => {
        setIsAddingSensor(false); // Kembali ke tampilan tabel setelah submit
        setIsEditingSensor(false);
        setSelectedSensor(null);

        fetchSensors(currentPage) // Refresh data pengguna
            .then(() => {
                const message = isEditingSensor ? 'Sensor data successfully updated.' : 'Sensor successfully added';
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

    return (
        <div className="flex flex-col p-4 h-full overflow-y-auto ">
            <h1 className='mb-4 text-2xl font-semibold'>Sensor Management</h1>
            <div className="w-full bg-white shadow-lg rounded-lg flex-1 flex flex-col">
                <div className="my-4 flex flex-row justify-between px-4">
                    {isAddingSensor || isEditingSensor ?
                        (<div className='font-bold text-lg'>{isEditingSensor ? 'Edit Sensor' : 'Add Sensor'}</div>)
                        :
                        (<div className='font-bold text-lg'>All Sensors</div>)
                    }
                    {isAddingSensor || isEditingSensor ? (
                        ""
                    ) : (
                        <div className='flex flex-row gap-6'>
                            <SearchComponent />
                            <div>
                                <button
                                    onClick={handleAddSensorClick}
                                    className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                                >
                                    Add Sensor
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="min-w-full">
                        {isAddingSensor || isEditingSensor ? (
                            <SensorForm onSubmit={handleFormSubmit} initialValues={selectedSensor} />
                        ) : (
                            <ComponentTable
                                headers={headers}
                                data={sensors}
                                onEdit={handleEditSensorClick}
                                onDelete={handleDeleteSensorClick}
                                currentPage={currentPage}
                                itemsPerPage={10}
                            />
                        )}
                    </div>
                </div>
                {!isAddingSensor && !isEditingSensor && (
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
    )
}

export default SensorManagementComponent
