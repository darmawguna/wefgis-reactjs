

const fetchGroundwaterData = async () => {
    const url = '/groundwater';
    const data = {
        geometry: [101.58023369989316, 13.620938502946455],
        type: 'point',
        startYear: '2022',
        endYear: '2023'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${ response.status }`);
        }

        const result = await response.json();
        console.log('Groundwater data:', result);
        return result;
    } catch (error) {
        console.error('Error fetching groundwater data:', error);
    }
};

// Contoh penggunaan fungsi
fetchGroundwaterData().then(data => {
    if (data) {
        // Lakukan sesuatu dengan data yang diterima
        console.log(data);
    }
});


const PageTesting = () => {
    return (
        <h1>hello world</h1>
    )
}

export default PageTesting
