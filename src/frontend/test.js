import React, {Component} from 'react';
import axios from 'axios'
const API_PATH = 'http://localhost:3000/backtest.php'


class Test extends Component {
    componentDidMount() {
        let data = JSON.stringify({"data":"hallo"});

        const HEADERS = {
            mode: 'cors',
            credentials: 'include'
        }

        let config = {
            method: 'post',
            url: API_PATH,
            headers: HEADERS,
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return(
            <div>
                <h1>ha</h1>
            </div>
        );
    }
}
export  default Test;

