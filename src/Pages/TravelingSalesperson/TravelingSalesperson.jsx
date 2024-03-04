import React, { useState } from "react";
import TravelingSalespersonBox from "../../Components/TravelingSalespersonBox/TravelingSalespersonBox";

function TravelingSalesperson() {
    const [totalCities, setTotalCities] = useState(7);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleTotalCitiesChange = (newTotalCities) => {
        setTotalCities(newTotalCities);
    };

    const handleRefresh = () => {
        // Incrementar el valor de refreshKey
        setRefreshKey((prevKey) => prevKey + 1);
    };

    return (
        <div>
            <input
                type="number"
                value={totalCities}
                onChange={(e) => handleTotalCitiesChange(e.target.value)}
            />
            <button onClick={handleRefresh}>Incrementar Key</button>
            <TravelingSalespersonBox key={refreshKey} totalCities={totalCities} />
        </div>
    );
}

export default TravelingSalesperson;
