import React from 'react';
import DatePicker from "react-datepicker";
import { Container, Row, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./Dashboard.css";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { propTypes } from 'react-bootstrap/esm/Image';

interface DashboardProps {
}
interface DashboardState {
    startDate: Date;
    endDate: Date;
    data: Array<{
        "Active": number,
        "City": string,
        "CityCode": string,
        "Confirmed": number,
        "Country": string,
        "Date": string,
        "Deaths": number,
        "ID": string,
        "Lat": string,
        "Lon": string,
        "Province": string,
        "Recovered": number
    }>;
}
class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            data: []
        };
    }

    fetchAPIData(startDate: Date, endDate: Date) {
        const url = "https://api.covid19api.com/country/singapore?from=" + startDate.toISOString() + "&to=" + endDate.toISOString();
        console.log(url)
        axios
        .get(url)
        .then((res) => {
            this.setState({
                startDate: startDate,
                endDate: endDate,
                data: res.data
            })
        })
        .catch(error => {
            console.log(error)        
        });
    }

    componentDidMount() {
        this.fetchAPIData(this.state.startDate, this.state.endDate);
    }

    setStartDate(date: Date) {
        const currentState = this.state
        this.fetchAPIData(date, currentState.endDate)
    }
    setEndDate(date: Date) {
        const currentState = this.state
        this.fetchAPIData(currentState.startDate, date)
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>COVID Cases In Singapore Visualization</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="datepicker">
                            <label>Start Date: </label>
                            <DatePicker
                                selectsStart
                                dateFormat="dd/MM/yyyy"
                                showTimeInput
                                selected={this.state.startDate}
                                onChange={this.setStartDate.bind(this)}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="datepicker">
                            <label>End Date: </label>
                            <DatePicker
                                selectsEnd
                                dateFormat="dd/MM/yyyy"
                                showTimeInput
                                selected={this.state.endDate}
                                onChange={this.setEndDate.bind(this)}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Visualization
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        data={this.state.data}
                    />
                </Row>
            </Container>
        );
    }
}

interface VisualizationProps {
    startDate: Date;
    endDate: Date;
    data: Array<{
        "Active": number,
        "City": string,
        "CityCode": string,
        "Confirmed": number,
        "Country": string,
        "Date": string,
        "Deaths": number,
        "ID": string,
        "Lat": string,
        "Lon": string,
        "Province": string,
        "Recovered": number
    }>;
}
class Visualization extends React.Component<VisualizationProps> {
    render() {
        return (
            <Col>
                <div className="graph-wrapper">
                    <ResponsiveContainer>
                        <LineChart 
                            data={this.props.data}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="Date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                                type="monotone"
                                dataKey="Confirmed"
                                stroke="#000000" 
                                activeDot={{ r: 8 }}
                            />
                            <Line 
                                type="monotone"
                                dataKey="Recovered"
                                stroke="#008000"
                            />
                            <Line 
                                type="monotone"
                                dataKey="Deaths"
                                stroke="#000090"
                            />
                            <Line 
                                type="monotone"
                                dataKey="Active"
                                stroke="#800000"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Col>
        );
    }
}

export default Dashboard