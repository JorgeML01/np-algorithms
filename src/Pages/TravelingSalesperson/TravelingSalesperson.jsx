import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import TravelingSalespersonFinalBox from "../../Components/TravelingSalespersonBox/TravelingSalesPersonFinalBox";
import { Container } from "react-bootstrap";

function TravelingSalesperson() {
    const [totalCities, setTotalCities] = useState(7);
    const [refreshKey, setRefreshKey] = useState(0);
    const [refreshKey2, setRefreshKey2] = useState(0);

    const handleTotalCitiesChange = (newTotalCities) => {
        setTotalCities(newTotalCities);
    };

    const handleRefresh = () => {
        setRefreshKey(Math.random());
    };

    return (
        <Container className="align-items-center justify-content-center">
            <input
                type="number"
                value={totalCities}
                onChange={(e) => handleTotalCitiesChange(e.target.value)}
            />
            <Button variant="outline-success" onClick={handleRefresh}>Update nodes</Button>
            <TravelingSalespersonFinalBox key={refreshKey} totalCities={totalCities} />
        </Container>
    );
}

export default TravelingSalesperson
