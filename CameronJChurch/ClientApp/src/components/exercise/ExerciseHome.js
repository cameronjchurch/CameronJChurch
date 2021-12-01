import React, { Component } from 'react';
import { Row, Col, Button, Label, Form, FormGroup, Card, CardTitle, Spinner, Input } from 'reactstrap';
import Select from 'react-select';
import AppTable from '../common/AppTable';
import ExerciseChart from './ExerciseChart';
import moment from 'moment';
import axios from 'axios';

export class ExerciseHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchingData: true,
            today: moment(),
            newExerciseName: '',
            newExerciseUnit: '',
            newExerciseAmount: 0,
            selectedExercise: null,
            exerciseViewModel: {
                allActivities: [],
                todaysActivities: [],
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
            const selectedExercise = this.state.exerciseViewModel.exercises.find(e => e.exerciseActivityId === this.state.selectedExercise.value);
            var viewModel = this.state.exerciseViewModel;

            const index = viewModel.exercises.indexOf(selectedExercise);
            viewModel.exercises.splice(index, 1);

            const newActivity = {
                exerciseActivity: selectedExercise,
                count: 0,
                userName: this.props.userName,
                date: this.state.today
            }
            viewModel.todaysActivities.push(newActivity);

            this.setState({ selectedExercise: null, exerciseViewModel: viewModel });
        }
    }

    addRep = async (exerciseActivityId) => {
        this.setState({ fetchingData: true });
        var viewModel = this.state.exerciseViewModel;
        var currentActivity = viewModel.todaysActivities.find(a => a.exerciseActivity.exerciseActivityId === exerciseActivityId);
        currentActivity.count++;

        await axios.post('api/Exercise/activity', currentActivity).then(response => {
            this.getExercises();
        });
    }

    renderNameCell = (props) => {
        const data = props.cell.row.original;
        return (
            <span>{data.exerciseActivity.exerciseActivityName}</span>
        );
    }
    renderAmountCell = (props) => {
        const data = props.cell.row.original;
        const amount = data.exerciseActivity.count;
        return (<span>{amount}</span>);
    }
    renderCountCell = (props) => {
        const data = props.cell.row.original;
        const count = data.count;
        return (<span>{count}</span>);
    }
    renderTotalCell = (props) => {
        const data = props.cell.row.original;
        const total = data.count * data.exerciseActivity.count;
        const unit = data.exerciseActivity.exerciseActivityUnit;
        return (<span>{total + ' (' + unit + ')'}</span>);
    }
    renderAddCell = (props) => {
        const data = props.cell.row.original;
        return (<div>{this.state.fetchingData ? <Spinner /> : <Button onClick={() => this.addRep(data.exerciseActivity.exerciseActivityId)} className="btn btn-success btn-rounded btn-sm">Add</Button>}</div >);
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
        const showChart = this.state.exerciseViewModel.allActivities.length > 0;

        return (
            <div>
                <h3>Exercise</h3>
                <h5>{this.state.today.format("LLLL")}</h5>
                <hr />
                {showChart && <div>
                    < ExerciseChart chartData={this.state.exerciseViewModel.allActivities} />
                    <hr /></div>}
                <Row>
                    <Col><Label style={{ float: "right" }}> Available Exercises</Label></Col>
                    <Col>
                        <Select options={availableExercises} onChange={this.handleSelectedExerciseChange} value={this.state.selectedExercise} />
                    </Col>
                    <Col>
                        <Button className="btn btn-success btn-rounded btn-sm" onClick={this.addExercise} > Add</Button>
                    </Col>
                </Row>
                <hr />
                <AppTable columns={columns} data={this.state.exerciseViewModel.todaysActivities} />
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