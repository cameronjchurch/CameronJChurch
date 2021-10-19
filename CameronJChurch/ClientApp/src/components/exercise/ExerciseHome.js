import React, { Component } from 'react';
import { Row, Col, Button, Label, Form, FormGroup, Card, CardTitle, Spinner, Input } from 'reactstrap';
import Select from 'react-select';
import AppTable from '../common/AppTable';
import moment from 'moment';
import axios from 'axios';

export class ExerciseHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchingData: true,
            today: moment().toString(),
            newExerciseName: '',
            newExerciseUnit: '',
            newExerciseAmount: 0,
            selectedExercise: null,
            exerciseViewModel: {
                activities: [],
                exercises: []
            }
        }
    }

    componentDidMount() { this.getExercises(); }

    getExercises = async (e) => {
        await axios.get('api/Exercise?userName=' + this.props.userName).then(response => {
            this.setState({ fetchingData: false, exerciseViewModel: response.data });
        });
    }

    newExercise = async (e) => {
        e.preventDefault();
        const exercise = {
            exerciseActivityName: this.state.newExerciseName,
            exerciseActivityUnit: this.state.newExerciseUnit,
            count: this.state.newExerciseAmount,
            userName: this.props.userName
        }

        await axios.post('api/Exercise', exercise).then(response => {
            this.setState({ newExerciseName: '', newExerciseUnit: '', newExerciseAmount: 0 });
            this.getExercises();
        });
    }

    saveExercises = async (e) => {
        e.preventDefault();

    }

    handleNewExerciseNameChange = ({ target: { value } }) => {
        this.setState({ newExerciseName: value });
    }
    handleNewExerciseUnitChange = ({ target: { value } }) => {
        this.setState({ newExerciseUnit: value });
    }
    handleNewExerciseAmountChange = ({ target: { value } }) => {
        this.setState({ newExerciseAmount: value });
    }
    handleSelectedExerciseChange = (selectedExercise) => {
        this.setState({ selectedExercise: selectedExercise });
    }

    addExercise = () => {
        if (this.state.selectedExercise) {
            const selectedExercise = this.state.exerciseViewModel.exercises.find(e => e.exerciseActivityId == this.state.selectedExercise.value);
            var viewModel = this.state.exerciseViewModel;

            const index = viewModel.exercises.indexOf(selectedExercise);
            viewModel.exercises.splice(index, 1);

            const newActivity = {
                exerciseActivity: selectedExercise,
                count: 0,
                userName: this.props.userName
            }
            viewModel.activities.push(newActivity);

            this.setState({ selectedExercise: null, exerciseViewModel: viewModel });
        }
    }

    renderNameCell = (props) => {
        const data = props.cell.row.original;
        return (
            <span>{data.exerciseActivity.exerciseActivityName}</span>
        );
    }
    renderAmountCell = (props) => {
        return (<span></span>);
    }
    renderCountCell = (props) => {
        return (<span></span>);
    }
    renderTotalCell = (props) => {
        return (<span></span>);
    }
    renderAddCell = (props) => {
        return (<span></span>);
    }

    render() {
        const availableExercises = this.state.exerciseViewModel.exercises.map(a => ({ value: a.exerciseActivityId, label: a.exerciseActivityName }));
        const columns =
            [
                { Header: 'Exercise', Cell: this.renderNameCell },
                { Header: 'Amount', Cell: this.renderAmountCell },
                { Header: 'Count', Cell: this.renderCountCell },
                { Header: 'Total', Cell: this.renderTotalCell },
                { Header: 'Add', Cell: this.renderAddCell }
            ];
        return (
            <div>
                <h3>Exercise</h3>
                <h5>{this.state.today}</h5>
                <Row>
                    <Col>
                        <Select options={availableExercises} onChange={this.handleSelectedExerciseChange} value={this.state.selectedExercise} />
                    </Col>
                    <Col>
                        <Button className="btn btn-success btn-rounded btn-sm" onClick={this.addExercise} > Add</Button>
                    </Col>
                </Row>
                <hr />
                <AppTable columns={columns} data={this.state.exerciseViewModel.activities} />
                <hr />
                <Card outline color="secondary" style={{ margin: "17px", padding: "17px" }}>
                    <CardTitle tag="h5">New Exercise</CardTitle>
                    {this.state.fetchingData ? <div className="center"><Spinner /></div> :
                        <Form onSubmit={this.newExercise}>
                            <FormGroup>
                                <Label for="name">Exercise</Label>
                                <Input type="text" name="exerciseName" id="exerciseName" onChange={this.handleNewExerciseNameChange} placeholder="Exercise Name" value={this.state.newExerciseName} />
                                <Label for="day">Unit</Label>
                                <Input type="text" name="exerciseUnit" id="exerciseUnit" onChange={this.handleNewExerciseUnitChange} placeholder="Unit" value={this.state.newExerciseUnit} />
                                <Label for="amount">Amount</Label>
                                <Input type="text" name="exerciseAmount" id="exerciseAmount" onChange={this.handleNewExerciseAmountChange} placeholder="Amount" value={this.state.newExerciseAmount} />
                            </FormGroup>
                            <FormGroup>
                                <Button>Save</Button>
                            </FormGroup>
                        </Form>}
                </Card>
            </div>
        );
    }
}