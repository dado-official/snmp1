import React, {Component} from 'react';
import axios from 'axios'
import Device from "./Device";
import SNMPField from "./SNMPField";
import "./mainStyle.css"
import Devicelist from "./Devicelist";

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state_devices: JSON,
            name: '',
            ip: '',
            mac: '',
            snmp: JSON
        };
    }

    componentDidMount() {

    }

    setDevicePar(name, ip, mac){
        this.setState({name: name});
        this.setState({ip: ip});
        this.setState({mac: mac});
    }

    setSNMP(snmp){
        this.setState({snmp: snmp});
    }

    render() {
        return(
            <div id="wrapper">
                <div id="nav">
                    <p>SNMP TOOL</p>
                </div>
                <div id="contaiermain">
                    <div id="Devicelist" className="container">
                        <Devicelist  parent={this}/>
                    </div>
                    <div id="right">
                        <div id="Device" className="container">
                            <Device
                                parent={this}
                                name={this.state.name}
                                ip={this.state.ip}
                                mac={this.state.mac}
                            />
                        </div>
                        <div id="SNMPField" className="container">
                            <SNMPField
                                snmp={this.state.snmp}
                            />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export  default Test;

