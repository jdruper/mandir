<?php
    require_once (dirname(__FILE__)."/simplecms-config.php");    

    static $databaseConnection = null;
    function getDB() {    
        if (is_null($databaseConnection)) {
            $databaseConnection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
            if ($databaseConnection->connect_error)
            {
                die("Database selection failed: " . $databaseConnection->connect_error);
            }
        }
        return $databaseConnection;
    }

    function closeDB($db){
        mysqli_close($db);
    }

?>