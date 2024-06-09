

const LegendController = () => {
    return (
        <div>
            {/* Contoh konten legend, bisa diubah sesuai kebutuhan */}
            <div className="my-2">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 mr-2"></div>
                    <span>High Risk</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 mr-2"></div>
                    <span>Moderate Risk</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 mr-2"></div>
                    <span>Low Risk</span>
                </div>
            </div>
        </div>
    );
};

export default LegendController;
