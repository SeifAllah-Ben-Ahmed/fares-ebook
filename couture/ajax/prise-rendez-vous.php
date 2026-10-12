<?php


	// getting variables from form
	  $Nom=$_REQUEST['nom'];
      $Email=$_REQUEST['email'];
      $Prenom =$_REQUEST['prenom'];
      $Tel =$_REQUEST['tel'];
      $Message =$_REQUEST['message'];
      $sujet =$_REQUEST['sujet'];


		$Body = "Nom :  $Nom \n";
		$Body .= "Email : $Email \n";
		$Body .= "Prenom : $Prenom \n";
		$Body .= "Tel : $Tel \n";
		
		$Body .= "\n";
		$Body .= "\n";
		$Body .="message : $Message";

// send prepared message
$emailTo="faouzi.harrazi@gmail.com";
$subject="$sujet";
//$Body="teste corps";

mail($emailTo, $subject, $Body);


?>