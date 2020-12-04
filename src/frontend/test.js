import React, {Component} from 'react';
import get from '../backend/getDevices'
import trap from '../backend/getDevices'

class Test extends Component {
    componentDidMount() {
        let get = test()
        console.log(get)
    }
    render() {
        return(
            <div>
                <h1>ha</h1>
            </div>
        );
    }
}

function test(){
    return get;
}
export  default Test;


