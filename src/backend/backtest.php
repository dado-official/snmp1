<?php
    function cors() {

        // Allow from any origin
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
            // you want to allow, and if so:
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');    // cache for 1 day
        }

        // Access-Control headers are received during OPTIONS requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                // may also be using PUT, PATCH, HEAD etc
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

            exit(0);
        }
    }
    function utf8ize($d) {
        if (is_array($d)) {
            foreach ($d as $k => $v) {
                $d[$k] = utf8ize($v);
            }
        } else if (is_string ($d)) {
            return utf8_encode($d);
        }
        return $d;
    }

    function parseTOJSON($data){

    }
    cors();

    if($_POST) {
        http_response_code(200);

        $session = new SNMP(SNMP::VERSION_1, "192.168.178.140", "public");
        $session->valueretrieval = SNMP_VALUE_PLAIN;
        $result = $session->walk("", TRUE);

        $object = (object) utf8ize($result);
        print_r(json_encode($object));


        $headers = "MIME-Version: 1.0\r\n";
        $headers.= "Content-type: text/html; charset=UTF-8\r\n";
        $headers.= "Access-Control-Allow-Origin: *\r\n";
    }
?>
