<?php
    header("Access-Control-Allow-Origin: *");
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);

    if($_POST){
        echo("API");
        http_response_code(200);
        //$session = new SNMP(SNMP::VERSION_1, "192.168.178.140", "public");
        //$fulltree = $session->walk(".");
        //$session->close();
        //echo $fulltree;
        //foreach ($fulltree as $val) {
        //    echo "Hallo$val\n";
        //}


        $ipaddress = '192.168.178.140';
        $session = new SNMP(SNMP::VERSION_1, $ipaddress, "public");
        $session->oid_output_format = SNMP_OID_OUTPUT_FULL;
        $session->
        $result = $session->walk("");
        print_r($result);

        //$a = snmpwalkoid("192.168.178.140", "public", "");
//
        //foreach ($a as $val) {
        //    echo "$val\n";
        //}

        $headers = "MIME-Version: 1.0\r\n";
        $headers.= "Content-type: text/html; charset=UTF-8\r\n";
        $headers.= "Access-Control-Allow-Origin: *\r\n";
        //$headers.= "From: <" . $fulltree . ">";

        echo json_encode(array(
            "sent" => true
        ));

    } else {
        echo json_encode(["sent" => false, "Message" => "Etwas ist schief gelaufen"]);
    }
?>
