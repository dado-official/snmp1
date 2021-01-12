import React from 'react';

class SNMPField extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            snmp: this.props.snmp
        };
    }

    makelist(){
        let allOIDVALUES = [];
        if(this.props.snmp.SNMPWalk === undefined){
            return <p> No SNMP here</p>
        } else {
            this.props.snmp.SNMPWalk.map(
                function(d){
                    console.log(d.oid + d.value)
                    allOIDVALUES.push(<li>
                        OID: {d.oid}: VALUE: {d.value}
                    </li>);
                })
        }
        console.log(allOIDVALUES)
        return allOIDVALUES
    }

    render() {
        let self = this
        return(
            <ul>
                {this.makelist()}
            </ul>
        );
    }
}
export default SNMPField