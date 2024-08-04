

const DashboardComponent = () => {
    return (
        <div className="flex flex-col p-4 h-full overflow-y-auto ">
            <h1 className='mb-4 text-2xl font-semibold'>Welcome to Dashboard</h1>
            <div className="w-full bg-white shadow-lg rounded-lg flex-1 flex flex-col">
                <div className="my-4 flex flex-row justify-between px-4">
                    Welcome to Dashboard
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="min-w-full">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardComponent
