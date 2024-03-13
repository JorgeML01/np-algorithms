import React from "react";
import "./styles.css";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import TravelingSalespersonBox from "./TravelingSalespersonBox";
import TravelingSalespersonMap from "./TravelingSalespersonMap";
import { Container, Row, Col } from "react-bootstrap";

function TravelingSalespersonFinalBox(props) {
    const { totalCities } = props;
    const [totalCitiesMap, setTotalCitiesMap] = useState(1);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleTotalCitiesChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setTotalCitiesMap(value);
    }

    const handleRefresh = () => {
        setRefreshKey(Math.random());
    };

    return (
        <Container className="text-center justify-content-center">
            <div className="d-flex flex-column">
                <Row>
                    <Col>
                        <TravelingSalespersonBox totalCities={totalCities}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input
                            type="number"
                            min={1}
                            max={12}
                            value={totalCitiesMap}
                            onChange={handleTotalCitiesChange}
                            className="input-class"
                        />
                        <Button variant="outline-success" onClick={handleRefresh} className="button-update">Update nodes</Button>
                        <TravelingSalespersonMap key={refreshKey} totalCities={totalCitiesMap} />
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default TravelingSalespersonFinalBox;