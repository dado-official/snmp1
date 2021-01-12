import React from 'react';

class SNMPField extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            snmp: this.props.snmp
        };
    }

    makelist(){

    }

    render() {
        let self = this;
        return(
            <div>
                {<pre>{JSON.stringify(this.props.snmp, null, 2) }</pre>}
            </div>
        );
    }
}
export default SNMPField