const ReportCard = ({ title, jumlahProvinsi, jumlahKabupaten, jumlahKecamatan }) => {
    let backgroundColor;
    if (title === 'Waspada') {
        backgroundColor = 'bg-yellow-100'; // Sesuaikan warna latar belakang sesuai kebutuhan
    } else if (title === 'Siaga') {
        backgroundColor = 'bg-red-100'; // Sesuaikan warna latar belakang sesuai kebutuhan
    } else if (title === 'Awas') {
        backgroundColor = 'bg-orange-100'; // Sesuaikan warna latar belakang sesuai kebutuhan
    }

    return (
        <div className={`report-card flex items-center gap-4 rounded-lg bg-white transition ease-out duration-300 cursor-pointer`}>
            <div className="w-2 h-full rounded-l-lg flex-shrink-0"></div>
            <div className="flex items-center gap-4 justify-between w-full px-4 py-2 pl-0 flex-row">
                <div className="flex items-center gap-4 flex-1 w-full">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 ${ backgroundColor }`}>
                        <i className="bx bxs-error text-3xl text-white"></i>
                    </div>
                    <p className="text-lg font-extrabold">{title}</p>
                </div>
                <div className="border-gray-300 flex flex-col gap-2 text-gray-800 flex-shrink-0 border-l pl-4">
                    <p className="text-sm"><strong>{jumlahProvinsi} Provinsi</strong></p>
                    <p className="text-sm"><strong>{jumlahKabupaten} Kabupaten/Kota</strong></p>
                    <p className="text-sm"><strong>{jumlahKecamatan} Kecamatan</strong></p>
                </div>
            </div>
        </div>
    );
};

export default ReportCard;
