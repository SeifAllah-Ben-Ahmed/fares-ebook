<?php

 $to_email       = "faouzi.harrazi@gmail.com";
 
    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        $output = json_encode(array( //create JSON data
            'type'=>'error',
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); //exit script outputting json data
    }
 
    //Sanitize input data using PHP filter_var().
    $typeContact      = filter_var($_POST["typeContact"], FILTER_SANITIZE_STRING);
    $typePro      = filter_var($_POST["typePro"], FILTER_SANITIZE_STRING);
    $raison      = filter_var($_POST["raison"], FILTER_SANITIZE_STRING);
    $nomContact      = filter_var($_POST["nomContact"], FILTER_SANITIZE_STRING);
    $prenomContact      = filter_var($_POST["prenomContact"], FILTER_SANITIZE_STRING);
    $telContact      = filter_var($_POST["telContact"], FILTER_SANITIZE_STRING);
    $adresseContact      = filter_var($_POST["adresseContact"], FILTER_SANITIZE_STRING);
    $paysContact      = filter_var($_POST["paysContact"], FILTER_SANITIZE_STRING);
    $messageContact      = filter_var($_POST["messageContact"], FILTER_SANITIZE_STRING);
    $emailContact   = filter_var($_POST["emailContact"], FILTER_SANITIZE_EMAIL);
    $subject         = "contact fares couture livre";

     
    //Textbox Validation 
    if(strlen($prenomContact)<4){ // If length is less than 4 it will output JSON error.
        $output = json_encode(array('type'=>'error', 'text' => 'nom est trop court!'));
        die($output);
    }
     if(strlen($prenomContact)<4){ // If length is less than 4 it will output JSON error.
        $output = json_encode(array('type'=>'error', 'text' => 'nom est trop court!'));
        die($output);
    }
 
 
    $message = '<html><body>';
    $message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
    $message .= "<tr style='background: #eee;'><td><strong>Type de contact:</strong> </td><td>" . strip_tags($_POST['typeContact']) . "</td></tr>";
    $message .= "<tr style='background: #eee;'><td><strong>typePro:</strong> </td><td>" . strip_tags($_POST['typePro']) . "</td></tr>";
    $message .= "<tr style='background: #eee;'><td><strong>raison :</strong> </td><td>" . strip_tags($_POST['raison']) . "</td></tr>";
    $message .= "<tr style='background: #eee;'><td><strong>nom :</strong> </td><td>" . strip_tags($_POST['nomContact']) . "</td></tr>";
    $message .= "<tr style='background: #eee;'><td><strong>prenom :</strong> </td><td>" . strip_tags($_POST['prenomContact']) . "</td></tr>";
    $message .= "<tr style='background: #eee;'><td><strong>tel :</strong> </td><td>" . strip_tags($_POST['telContact']) . "</td></tr>";
    $message .= "<tr style='background: #eee;'><td><strong>adresse:</strong> </td><td>" . strip_tags($_POST['adresseContact']) . "</td></tr>";
    $message .= "<tr style='background: #eee;'><td><strong>pays :</strong> </td><td>" . strip_tags($_POST['paysContact']) . "</td></tr>";
    $message .= "<tr style='background: #eee;'><td><strong>message :</strong> </td><td>" . strip_tags($_POST['messageContact']) . "</td></tr>";
    $message .= "<tr><td><strong>adresse email :</strong> </td><td>" . strip_tags($_POST['emailContact']) . "</td></tr>";
    $message .= "</table>";
    $message .= "</body></html>";
 
 
    $file_attached = false;
    if(isset($_FILES['file_attach'])) //check uploaded file
    {
        //get file details we need
        $file_tmp_name    = $_FILES['file_attach']['tmp_name'];
        $file_name        = $_FILES['file_attach']['name'];
        $file_size        = $_FILES['file_attach']['size'];
        $file_type        = $_FILES['file_attach']['type'];
        $file_error       = $_FILES['file_attach']['error'];
 
 
 
        //exit script and output error if we encounter any
        if($file_error>0)
        {
            $mymsg = array(
            1=>"le fichier est volumineux",
            2=>"le fichier est grand",
            3=>"le fichier manquant",
            4=>"aucun fichier ajouté",
            6=>"problème chargement" );
             
            $output = json_encode(array('type'=>'error', 'text' => $mymsg[$file_error]));
            die($output);
        }
         
        //read from the uploaded file & base64_encode content for the mail
        $handle = fopen($file_tmp_name, "r");
        $content = fread($handle, $file_size);
        fclose($handle);
        $encoded_content = chunk_split(base64_encode($content));
        //now we know we have the file for attachment, set $file_attached to true
        $file_attached = true;
 
 
 
        
    }
 
 
     
    if($file_attached) //continue if we have the file
    {
       
    // a random hash will be necessary to send mixed content
    $separator = md5(time());
 
    // carriage return type (RFC)
    $eol = "\r\n";
 
    // main header (multipart mandatory)
    $headers = "de:fares couture <contact@farescouture.com>" . $eol;
    $headers .= "MIME-Version: 1.0" . $eol;
    $headers .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"" . $eol;
    $headers .= "Content-Transfer-Encoding: 7bit" . $eol;
    $headers .= "MIME." . $eol;
 
    // message
    $body .= "--" . $separator . $eol;
    $body .= "Content-type:text/html; charset=utf-8\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $message . $eol;
 
    // attachment
    $body .= "--" . $separator . $eol;
    $body  .= "Content-Type:".$file_type." ";
    $body .= "Content-Type: application/octet-stream; name=\"" . $file_name . "\"" . $eol;
    $body .= "Content-Transfer-Encoding: base64" . $eol;
    $body .= "Content-Disposition: attachment; filename=\"".$file_name."\"". $eol;
    $body .= $encoded_content . $eol;
    $body .= "--" . $separator . "--";
        
    }
    else
    {
        
        $eol = "\r\n";
        
        $headers = "de: farescouture.com <contact@farescouture.com>" . $eol;
        $headers .= "Reply-To: ". strip_tags($email_address) . "\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        $body .= $message . $eol;
 
    }
 
 
    $send_mail = mail($to_email, $subject, $body, $headers);
 
    if(!$send_mail)
    {
        //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
        $output = json_encode(array('type'=>'error', 'text' => 'erreur lors envoi .'));
        die($output);
    }else{
        $output = json_encode(array('type'=>'message', 'text' => 'Hi '.$first_name .' message transmis'));
        die($output);
    }

?>