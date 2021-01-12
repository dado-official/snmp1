import React, {Component} from 'react';
import axios from "axios";

let API_PATH = 'http://10.42.0.1:3000/'
class Device extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            ip: this.props.ip,
            mac: this.props.mac,
            snmpwalk: JSON,
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    SNMPwalk(ip){
        console.log("start SNMP walk")
        let data = {addr:ip};
        let self = this;

        const HEADERS = {
            mode: 'cors',
            credentials: 'include'
        }

        let config = {
            method: 'post',
            url: API_PATH + 'snmpWalk',
            headers: HEADERS,
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                self.props.parent.setSNMPwalk(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChange(event){
        this.setState({value: event.target.value})
    }

    SNMPget(ip){
        console.log("start SNMP get")
        let self = this;
        let oid = [];
        oid.push(this.state.value)
        let data = {
            addr: ip,
            oid: oid
        };
        console.log(data)

        const HEADERS = {
            mode: 'cors',
            credentials: 'include'
        }

        let config = {
            method: 'post',
            url: API_PATH + 'snmpGet',
            headers: HEADERS,
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                self.props.parent.setSNMPget(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return(
            <div>
                <div>
                    <p>Device name: '{this.props.name}'</p>
                    <p>Device ip: '{this.props.ip}'</p>
                    <p>Device mac: '{this.props.mac}'</p>
                </div>
                <div>
                    <div id="oid">
                        <p>OID:</p>
                        <input type="text" value={this.state.value} onChange={this.handleChange} /><br/>
                        <div id="buttonsDev">
                            <button className="buttonDevice" onClick={() => this.SNMPget(this.props.ip)}>SNMP get</button>
                            <button className="buttonDevice" onClick={() => this.SNMPwalk(this.props.ip)}>SNMP walk</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Device;
