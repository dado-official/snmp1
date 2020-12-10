import React, {Component} from 'react';
import axios from 'axios'
const API_PATH = 'http://localhost:3000/backtest.php'


class Test extends Component {
    componentDidMount() {
        let data = JSON.stringify({"data":"hallo"});

        let config = {
            method: 'post',
            url: 'http://localhost:3000/backtest.php',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
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

