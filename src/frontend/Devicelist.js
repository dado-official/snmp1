import React from 'react';
import axios from "axios";
import "./mainStyle.css"

const API_PATH_get_IPs = 'http://192.168.178.67:3000/isAlive'

class Devicelist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            devices: [],
            list: <li/>
        };
    }


    isalive(address, state){
        let self = this;
        //let data = );
        //console.log(data)
        const HEADERS = {
            mode: 'cors',
            credentials: 'include',
            contentType: 'application/json'
        }

        const data = {
            addr: address
        };

        let config = {
            method: 'post',
            url: API_PATH_get_IPs,
            headers: HEADERS,
            data : data
        };



        axios(config)
            .then(function (response) {
                console.log(response.data)
                if(response.data){
                    let joined = self.state.devices.push(address);
                    console.log(joined)
                    self.setState({list: joined})
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async alldevices(){
        let pre = "192.168.178."
        let dev = [];
        for(let i = 1; i < 254; i++){
            let addr = pre + i;
            await this.isalive(addr);
        }
    }

    async componentDidMount() {
        await this.alldevices()
    }


    render() {
        return(<div>
            <p>Device List</p>
            <ul id="devicelist">
                {this.state.devices.map(function(item) {
                    return <li className="listElement" key={item}>{item}</li>;
                })}
            </ul>
        </div>);
    }
}
export default Devicelist;
