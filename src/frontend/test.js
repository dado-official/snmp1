import React, {Component} from 'react';
import axios from 'axios'
import "./mainStyle.css"
import Devicelist from "./Devicelist";
const API_PATH_SNMP_walk = 'http://10.171.154.141:8080/SNMPwalk.php'



class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state_devices: JSON
        };
    }

    getSNMP(ip){
        console.log("start SNMP walk")
        let data = JSON.stringify({"address":ip});

        const HEADERS = {
            mode: 'cors',
            credentials: 'include'
        }

        let config = {
            method: 'post',
            url: API_PATH_SNMP_walk,
            headers: HEADERS,
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                //this.setState({devices: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    componentDidMount() {

    }

    render() {
        return(
            <div id="main">
                <div id="nav">
                    <p>SNMP TOOL</p>
                </div>
                <div id="top">
                    <button className="button" onClick={() => this.getSNMP("10.42.0.41")}>Start SNMP</button>
                </div>
                <div id="contaiermain">
                    <div id="left" className="container">
                        <Devicelist/>
                    </div>
                    <div id="middle" className="container">
                        <p>test</p>
                    </div>
                    <div id="right" className="container">
                        <p>test</p>
                    </div>
                </div>

            </div>
        );
    }
}
export  default Test;

