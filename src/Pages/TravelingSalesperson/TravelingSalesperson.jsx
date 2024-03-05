import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Button from 'react-bootstrap/Button';
import TravelingSalespersonFinalBox from "../../Components/TravelingSalespersonBox/TravelingSalesPersonFinalBox";
import { Container } from "react-bootstrap";

function TravelingSalesperson() {
    const [totalCities, setTotalCities] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleTotalCitiesChange = (newTotalCities) => {
        setTotalCities(newTotalCities);
    };

    const handleRefresh = () => {
        setRefreshKey(Math.random());
    };

    return (
        <Container className="text-center justify-content-center container-class">
            <div className="input-button">
                <input
                    type="number"
                    value={totalCities}
                    onChange={(e) => handleTotalCitiesChange(e.target.value)}
                />
                <Button variant="outline-success" onClick={handleRefresh} className="button-update">Update nodes</Button>
            </div>
            <TravelingSalespersonFinalBox key={refreshKey} totalCities={totalCities} />
        </Container>
    );
}

export default TravelingSalesperson
