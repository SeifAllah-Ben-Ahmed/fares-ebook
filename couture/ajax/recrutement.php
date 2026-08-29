<?php


	//$emailTo = trim($_REQUEST['address']);
	 /* $emailTo = "becasoft@live.fr";
	  $subject = "message du site";*/

	
	// getting variables from form
	  $type=$_REQUEST['type'];
      $nom=$_REQUEST['nom'];
      $email =$_REQUEST['email'];
      $prenom =$_REQUEST['prenom'];
      $tel =$_REQUEST['tel'];
      $pays =$_REQUEST['pays'];
      $message =$_REQUEST['message'];
      $sujet =$_REQUEST['sujet'];  

		$Body = "Type :  $type \n";
		$Body .= "Nom : $nom \n";
		$Body .= "Prenom : $prenom \n";
		$Body .= "Email : $email \n";
		$Body .= "Tel : $tel \n";
		$Body .= "Pays : $pays \n";
		
		$Body .= "\n";
		$Body .= "\n";
		$Body .="message : $message";

// send prepared message
//$emailTo="faouzi.harrazi@gmail.com";
$emailTo="recrutement@farescouture.com";

$subject=$_REQUEST['sujet'];
//$Body="teste corps";

mail($emailTo, $subject, $Body);

//callback for jQuery AJAX

/*if ($sent){
  echo "envoy&eacute;";
}
else{
	echo "probleme d'envoi"
	}*/

?>