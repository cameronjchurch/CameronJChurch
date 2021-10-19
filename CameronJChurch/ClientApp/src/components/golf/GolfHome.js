import React, { useState } from 'react';
import { createWorker, OEM, PSM } from 'tesseract.js';
import { Progress, Row, Col, Button } from 'reactstrap';
import Select from 'react-select';

import scorecard from '../../images/scorecardJaxBeach.jpg';
import scorecardWindsorParke from '../../images/scorecardWindsorParke.jpg';

const GolfHome = (props) => {

    const workerProgress = (p) => {
        console.log(p);
        setStatus(p.status);
        if (p.status === 'recognizing text')
            setProgress(p.progress * 100);
    }

    const clearStatus = () => {
        setProgress(0);
        setStatus('');
        setText('');
    }

    const doOCR = async (image) => {
        clearStatus();
        const worker = createWorker({
            logger: m => {
                workerProgress(m);
            }
        });

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        await worker.setParameters({
            tessedit_ocr_engine_mode: selectedOem.value,
            tessedit_pageseg_mode: selectedPsm.value
        });

        const results = await worker.recognize(image);
        setText(results.data.text);
        await worker.terminate();
        console.log('complete!');
    };

    const [scorecardText, setText] = useState('');
    const [statusText, setStatus] = useState('');
    const [progressVlaue, setProgress] = useState(0);
    const [selectedPsm, setPsm] = useState({ value: '3', label: 'AUTO' });
    const [selectedOem, setOem] = useState({ value: '3', label: 'DEFAULT' });

    const psmValues = Object.keys(PSM).map(key => ({ value: PSM[key], label: key }));
    const oemValues = Object.keys(OEM).map(key => ({ value: OEM[key], label: key }));

    return (
        <div>
            <h3>Golf</h3>
            <hr />
            <Row>
                <Col>
                    <div>{statusText}</div>{progressVlaue > 0 && <Progress value={progressVlaue} />}
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>{scorecardText}</div>
                </Col>
            </Row>
            <hr />
            <img src={scorecard} alt="scorecard" />
            <Row style={{ margin: 7 }}>
                <Col>
                    PSM <Select options={psmValues} value={selectedPsm} onChange={setPsm} />
                </Col>
                <Col>
                    OEM <Select options={oemValues} value={selectedOem} onChange={setOem} />
                </Col>
            </Row>
            <Row style={{ margin: 7 }}>
                <Col><div className="center"><Button onClick={() => doOCR(scorecard)}>Scan Image</Button></div></Col>
            </Row>
            <hr />
            <img src={scorecardWindsorParke} alt="windsor" />
            <Row style={{ margin: 7 }}>
                <Col>
                    PSM <Select options={psmValues} value={selectedPsm} onChange={setPsm} />
                </Col>
                <Col>
                    OEM <Select options={oemValues} value={selectedOem} onChange={setOem} />
                </Col>
            </Row>
            <Row style={{ margin: 7 }}>
                <Col><div className="center"><Button onClick={() => doOCR(scorecardWindsorParke)} >Scan Image</Button></div></Col>
            </Row>
        </div>
    );
}

export default GolfHome;