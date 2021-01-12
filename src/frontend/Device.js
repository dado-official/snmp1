import React, {Component} from 'react';
import axios from "axios";

let API_PATH_SNMP_walk = 'http://10.10.30.239:3000/snmpWalk'
class Device extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            ip: this.props.ip,
            mac: this.props.mac,
            snmpwalk: JSON
        };
    }

    getSNMP(ip){
        console.log("start SNMP walk")
        let data = {addr:ip};
        let self = this;

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
                self.props.parent.setSNMP(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        console.log(this.props.ip)
        return(
            <div>
                <div>
                    <p>Device name: '{this.props.name}'</p>
                    <p>Device ip: '{this.props.ip}'</p>
                    <p>Device mac: '{this.props.mac}'</p>
                </div>
                <div>
                    <button className="button"
                            onClick={() => this.getSNMP(this.props.ip)}
                    >Start SNMP walk</button>
                </div>
            </div>
        );
    }
}

export default Device;
