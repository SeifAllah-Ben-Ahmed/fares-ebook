<?php


	//$emailTo = trim($_REQUEST['address']);
	 /* $emailTo = "becasoft@live.fr";
	  $subject = "message du site";*/

		 
	// getting variables from form
	  $commandeNom=$_REQUEST['commandeNom'];
      $commandeEmail=$_REQUEST['commandeEmail'];
      $commandePrenom =$_REQUEST['commandePrenom'];
      $commandeTel =$_REQUEST['commandeTel'];
      $commandeMessage =$_REQUEST['commandeMessage'];
      $sujetMessage =$_REQUEST['sujetMessage'];


		$Body = "Commande Nom :  $commandeNom \n";
		$Body .= "commande Email : $commandeEmail \n";
		$Body .= "commande Prenom : $commandePrenom \n";
		$Body .= "commandeTel : $commandeTel \n";
		
		$Body .= "\n";
		$Body .= "\n";
		$Body .="message : $commandeMessage";

// send prepared message
$emailTo="commande@farescouture.com";
$subject="$sujetMessage";
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