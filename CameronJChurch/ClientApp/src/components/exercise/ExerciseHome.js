import React, { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';

const ExerciseHome = (props) => {
    const [pushups, setPushups] = useState(0);
    const [run, setRun] = useState(0);

    const resetCount = () => {
        setPushups(0);
        setRun(0);
    }

    return (
        <div>
            <h3>Exercise</h3>
            <Row style={{ margin: 11 }}>
                <Col>
                    <div className="center">Pushups: {pushups} </div>
                </Col>
                <Col>
                    <Button onClick={() => setPushups(pushups + 1)} className="btn btn-success btn-rounded btn-sm">Add</Button>
                </Col>
            </Row>
            <Row style={{ margin: 11 }}>
                <Col>
                    <div className="center">Runs: {run} </div>
                </Col>
                <Col>
                    <Button onClick={() => setRun(run + 1)} className="btn btn-success btn-rounded btn-sm">Add</Button>
                </Col>
            </Row>
            <Row>
                <Col><div className="center"><Button onClick={() => resetCount()}>Reset</Button></div></Col>
            </Row>
        </div>
    );
}

export default ExerciseHome;