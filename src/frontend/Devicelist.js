import React from 'react';
import axios from "axios";
import Device from "./Device";
import "./mainStyle.css"

const API_PATH_get_IPs = 'http://10.42.0.1:3000/areAlive'

class Devicelist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            devices: [],
            list: <li/>
        };
    }


    areAlive(){
        let self = this;
        const HEADERS = {
            mode: 'cors',
            credentials: 'include',
        }

        let config = {
            method: 'get',
            url: API_PATH_get_IPs,
            headers: HEADERS,
            data : "data"
        };


        axios(config)
            .then(function (response) {
                console.log(response.data)
                self.setState({devices: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        console.log("compnent did mount")
        this.areAlive()
    }

    render() {
        let self = this;
        return(<div>
            <p>Device List</p>
            <ul id="devicelist">
                {this.state.devices.map(function(d){
                    if(d.name === '?'){
                        return (<li onClick={() => self.props.parent.setDevicePar(d.name, d.ip, d.mac)} key={d.ip} className="listElement">{d.ip}</li>)
                    } else {
                        return (<li onClick={() => self.props.parent.setDevicePar(d.name, d.ip, d.mac)} key={d.ip} className="listElement">{d.name} (d.ip))</li>)
                    }
                })}
            </ul>
        </div>);
    }
}
export default Devicelist;
