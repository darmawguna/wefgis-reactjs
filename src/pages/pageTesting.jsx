import ReportCard from "../components/CardWarning"


const PageTesting = () => {
    const title = 'Waspada';
    const jumlahProvinsi = 15;
    const jumlahKabupaten = 55;
    const jumlahKecamatan = 200;
    return (
        <div className="p-4 bg-blue-400">
            <ReportCard title={title} jumlahProvinsi={jumlahProvinsi} jumlahKabupaten={jumlahKabupaten} jumlahKecamatan={jumlahKecamatan} />
        </div>
    )
}

export default PageTesting
