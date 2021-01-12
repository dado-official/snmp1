import React from 'react';
import BJSON from 'buffer-json'

class SNMPField extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            snmp: this.props.snmp
        };
    }

    uint8arrayToStringMethod(myUint8Arr){
        return String.fromCharCode.apply(null, myUint8Arr);
    }

    makelist(){
        console.log("makelist")
        let self = this;
        console.log(this.state.snmp.snmpGet)
        if(Object.keys(this.props.snmp.snmpGet).length !== 0 && typeof(this.props.snmp.snmpGet.value) === "object"){

            return (<li>
                {this.props.snmp.snmpGet.oid} --> {this.uint8arrayToStringMethod(Buffer.from(this.props.snmp.snmpGet.value))}
            </li>)
        } else if (Object.keys(this.props.snmp.snmpGet).length !== 0){
            return (<li>
                {this.props.snmp.snmpGet.oid} --> {this.state.snmp.snmpGet.value}
            </li>)
        } else if(Object.keys(this.props.snmp.snmpWalk).length !== 0){
            let list = []
            this.props.snmp.snmpWalk.SNMPWalk.map(function (d){
                if(typeof(d.value) === "object"){
                    list.push(<li>
                        {d.oid} --> {self.uint8arrayToStringMethod(Buffer.from(d.value))}
                    </li>)
                } else {
                    list.push(<li>
                        {d.oid} --> {d.value}
                    </li>)
                }
            })
            return list
        } else {
            return <li>noch nichts da</li>
        }
    }

    render() {
        let self = this
        return(
            <div id="snmpOut">
                <ul>
                    {this.makelist()}
                </ul>
            </div>
        );
    }
}
export default SNMPField