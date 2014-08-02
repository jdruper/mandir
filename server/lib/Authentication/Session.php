<?php
    session_start();

    function logged_on()
    {
        return isset($_SESSION['userid']);
    }

     function check_token(){
        $token = '';
        foreach($_SERVER as $key => $value) {
            //if (substr($key, 0, 5) <> 'HTTP_') {
            //    continue;
            //}            
            //$header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
            if($key == 'Authorization'){                
                $token = $value;                
                break;
            }        
        }        
        if($token != ''){        
            //var_dump($_SESSION['userid']['token']);
            if(isset($_SESSION['userid']) && ($_SESSION['userid']['token']==$token)){                
                return true;
            }         
            else{
                session_unset();
                return false;
            }
        }
        else{            
            session_unset();
            return false;
        }
    }

    function get_user_data(){
        if(isset($_SESSION['userid'])){
            return get_object_vars(JWT::decode($_SESSION['userid']['token'], $_SESSION['userid']['key']));
        }                
    }

    function confirm_is_admin() {
        if (!logged_on())
        {
            header ("Location: logon.php");
        }

        if (!is_admin())
        {
            header ("Location: index.php");
        }
    }

    function is_admin()
    {
        global $databaseConnection;
        $query = "SELECT user_id FROM users_in_roles UIR INNER JOIN roles R on UIR.role_id = R.id WHERE R.name = 'admin' AND UIR.user_id = ? LIMIT 1";
        $statement = $databaseConnection->prepare($query);
        $statement->bind_param('d', $_SESSION['userid']);
        $statement->execute();
        $statement->store_result();
        return $statement->num_rows == 1;
    }
?>