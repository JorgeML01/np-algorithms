import React from "react";
import TravelingSalespersonBox from "./TravelingSalespersonBox";
import TravelingSalespersonBoxApproximation from "./TravelingSalespersonBoxApproximation";
import { Container, Row, Col } from "react-bootstrap";

function TravelingSalespersonFinalBox(props) {
    const { totalCities } = props;
    return (
        <Container className="text-center justify-content-center">
            <div className="d-flex flex-column">
                <Row>
                    <Col>
                        <TravelingSalespersonBox totalCities={totalCities}/>
                    </Col>
                    <Col>
                        <TravelingSalespersonBoxApproximation totalCities={totalCities} />
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default TravelingSalespersonFinalBox;