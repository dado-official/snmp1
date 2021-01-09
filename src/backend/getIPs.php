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

cors();

    if($_POST) {
        http_response_code(200);
        //$jsonobj = '{';
        //for ($i = 0; $i < 255; $i++) {
        //    for ($j = 0; $j < 255; $j++) {
        //        for ($g = 0; $g < 255; $g++) {
                   // for ($h = 1; $h < 10; $h++) {
                   //     $i = 10;
                   //     $j = 171;
                   //     $g = 154;
                   //     $ip = strval($i) . "." . strval($j) . "." . strval($g) . "." . strval($h);
                   //     //VERSION1
                   //     //$hostname = gethostbyaddr($ip);
                   //     //if($hostname != $ip){
                   //     //    echo $hostname . "\n";
                   //     //    $jsonobj .= $hostname . ":";
                   //     //    $jsonobj .= $ip . ",";
                   //     //}
//
                   //     //VERSION2
                   //     $str = exec("ping -c 1 " . $ip);
                   //     if ($str!= null){
                   //         $jsonobj .= gethostbyaddr($ip) . ":";
                   //         $jsonobj .= $ip . ",";
                   //         echo $ip . "ping succeeded\n";
                   //     }else{
                   //         //echo $ip . "ping failed\n";
               //         }
               //     }
        //        }
        //    }
        //}
        //$jsonobj = rtrim($jsonobj, ", ");
        //$jsonobj .= '}';
        //echo $jsonobj;
        echo "1\n";
        sleep(1);
        echo "2\n";


        $headers = "MIME-Version: 1.0\r\n";
        $headers.= "Content-type: text/html; charset=UTF-8\r\n";
        $headers.= "Access-Control-Allow-Origin: *\r\n";
    }
?>
