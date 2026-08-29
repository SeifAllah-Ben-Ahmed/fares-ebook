

$(function(){
$( "#menu" ).click(function() {
        //goTo (7);
		window.open("http://farescouture.com/fares-boutique/","_self")
        });

 

	var mag = $('#magazine');
 //$("#menu").hide();
 
	$('.dedicase').hide();
	// initiazlie turn.js on the #magazine div
	mag.turn( {  
    turnCorners: "bl,br",
    elevation: 100,gradients: !$.isTouch });

	mag.bind('turned', function(e, page, pageObj) {
	
		if(page == 1 && $(this).data('done')){
			mag.addClass('centerStart').removeClass('centerEnd');
		}
		else if (page == 62 && $(this).data('done')){
			mag.addClass('centerEnd').removeClass('centerStart');
		}
		else {
			mag.removeClass('centerStart centerEnd');
		}
		if(page == 4 || page == 5 && $(this).data('done')){$('.dedicase').fadeTo(500,1);}else{//$('.dedicase').hide();
	}

		  if(page == 1 && $(this).data('done')){
        $("#playerMp3").css( "margin-left", "0" );
		$("#menu").css( "margin-right", "330px" );

      }else{
         $("#playerMp3").css( "margin-left", "50px" );
		 $("#menu").css( "margin-right", "310px" );

        }
	}); 

//$("#magazine").turn("page",32) ;
	/*setTimeout(function(){
		mag.fadeTo(500,1);
	},1000);*/


	$(window).bind('keydown', function(e){
		
		// listen for arrow keys
		
		if (e.keyCode == 37){
			mag.turn('previous');
		}
		else if (e.keyCode==39){
			mag.turn('next');
		}

	});

var html5_audiotypes={ //define list of audio file extensions
"mp3": "audio/mpeg",
"ogg": "audio/ogg",
"wav": "audio/wav",
}
function createsoundbite(sound){
  var html5audio=document.createElement('audio')
  if (html5audio.canPlayType){ //check support for HTML5 audio
  for (var i=0; i<arguments.length; i++)
  {
    var sourceel=document.createElement('source')
    sourceel.setAttribute('src', arguments[i])
    if (arguments[i].match(/.(\w+)$/i))
    sourceel.setAttribute('type', html5_audiotypes[RegExp.$1])
    html5audio.appendChild(sourceel)
  }
  html5audio.load()
  html5audio.playclip=function()
  {
    html5audio.pause()
    html5audio.currentTime=0
    html5audio.play()
  }
  return html5audio
  }
  else{
  return {playclip:function(){throw new Error("Your browser doesn't support HTML5 audio unfortunately")}}
  }
}
var flip=createsoundbite("flip.mp3");
//$("#magazine").turn("page",57) ;

$("#magazine").bind("turning", function(event, page, view) {

  //console.log(view[0]);
  //console.log(view[1]);
var left = view[0];
var right = view[1];
  if(right > 6 ) {
    
      if(right == 7 ) {
      $("#numPageleft").html('');
      $("#numPageright").html(right-6);
      }else{
        $("#numPageleft").html(left-6);
        $("#numPageright").html(right-6);
      }
      if ((right-6) >9) {

        $("#numPageright").css( "margin-right", "222px" );
        
        $("#numPageleft").css( "margin-left", "228px" );
        } 
  }
  else{
    
    $("#numPageleft").html('');
    $("#numPageright").html('');
  }

 if(right > 0 ) {
     $("#menu").show();
      
  }
  else{
    $("#menu").hide();
    
  }
  if(right > 58 ) {
     $("#menu").hide();
      
  }
  

  
 
  if (page == 1 || page == 59 || page == 60 || page == 2 ) {
  
  }else {
    flip.playclip();
  }
  
});
$("#magazine").bind("turning", function(event, page, view) {

  //console.log(view[0]);
  //console.log(view[1]);
var left = view[0];
var right = view[1];
  if(right > 6 ) {
    
      if(right == 7 ) {
      $("#numPageleft").html('');
      $("#numPageright").html(right-6);
      }else{
        $("#numPageleft").html(left-6);
        $("#numPageright").html(right-6);
      }
      if ((right-6) >9) {

        $("#numPageright").css( "margin-right", "122px" );
        
        $("#numPageleft").css( "margin-left", "128px" );
        } 
  }
  else{
    
    $("#numPageleft").html('');
    $("#numPageright").html('');
  }

   if(right > 0 ) {
     $("#menu").show();
  }
  else{
    $("#menu").hide(); 
  }
  if(right > 59 ) {
     $("#menu").hide();  
  }
  

  
 
  if (page == 1 || page == 59 || page == 60 || page == 2 ) {
  
  }else {
    flip.playclip();
  }
  
});


$("#magazine").bind("start", function(event, pageObject, corner) {

$('.jcarousel')
        .jcarousel({
        wrap: 'circular'}
        )
        .jcarouselAutoscroll({
            interval: 2000,
            target: '+=1',
            autostart: true
        });
        $( '.jcarousel').mouseover(function() {
          $('.imageorigine').hide();
          $('.imagehover').show();
          //$('#commande').foundation('reveal', 'open');
         $('.jcarousel').jcarouselAutoscroll('stop');
        });
        $( '.jcarousel').mouseout(function() {
          $('.imageorigine').show();
          $('.imagehover').hide();
          
          $('.jcarousel').jcarouselAutoscroll('start');
        });
        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });
});
       $( "#menu" ).click(function() {
        //goTo (7);
		window.open("http://farescouture.com/fares-boutique/","_self")
        });

$('#radioForm input[type=radio]').live('change', function() { 
        var selectedVal = $("#radioForm input:radio:checked").val();
        if (selectedVal=='pro') {
           $("#raisonSocial").show() ;
           $("#selectForm").show() ;
           $("#formNom").hide() ;
           $("#formPrenom").hide() ;
        }else{
          $("#raisonSocial").hide() ;
          $("#selectForm").hide() ;
          $("#formNom").show() ;
           $("#formPrenom").show() ;
        }
   });
 
 $('a[data-reveal-id]').live('click', function(e) {
    e.preventDefault();
    var modalLocation = $(this).attr('data-reveal-id');
    if (modalLocation=='commande') {
      var catalogueProduit = $(this).attr('data-id');
      $("#titleProduit").html(catalogueProduit) ;
      $("#sujetMessage").val('Commande catalogue : '+catalogueProduit) ;
  };
    
    //$('#'+modalLocation).reveal($(this).data());
  });       
  $('#FormSender').live('click', function(e) {
    $("#commandeErreur").html('');
    e.preventDefault();
     
    var commandeNom  = $("#commandeNom").val();
    var commandeEmail = $("#commandeEmail").val();
    var commandePrenom = $("#commandePrenom").val();
    var commandeTel = $("#commandeTel").val();
    var commandeMessage = $("#commandeMessage").val();
    var sujetMessage = $("#sujetMessage").val();
    var sujet =" Commande de "+commandeNom ;
    var finalMessage = sujetMessage +'<br><hr>'+commandeMessage ;
    
    if( !isValidEmailAddress( commandeEmail ) ) { 
     $("#commandeErreur").html('<br>Adresse EMAIL non valid');
        e.preventDefault();
     }
     else{
        $.post( "ajax/commande.php",{ 
         commandeNom: commandeNom,
         commandeEmail: commandeEmail,
         commandePrenom: commandePrenom,
         commandeTel: commandeTel,
         commandeMessage: finalMessage,
         sujetMessage: sujet},
         function( data ) {
          $("#commandeErreur").html('');
          $("#commandeErreur").html('<br><span style="color:green">Message envoy&eacute; </span>');
         }
        );

        //console.log(' valid');
     }
    
  }); 
    $('#FormSenderRecrutement').live('click', function(e) {
       e.preventDefault();
     $("#recrutementErreur").html('');
      var type  = $('input[type=radio][name=type]:checked').attr('value');
      var nom  = $("#nom").val();
      var email  = $("#email").val();
      var prenom  = $("#prenom").val();
      var tel  = $("#tel").val();
      var pays  = $("#pays").val();
      var message  = $("#message").val();
      var sujet =" Recrutement nouvelle condidature " ;

   if( !isValidEmailAddress( email ) ) { 
      $("#recrutementErreur").html('<br><span style="color:red">Adresse EMAIL non valid</span>');
     e.preventDefault();
  }
  else{
     $.post( "ajax/recrutement.php",{ 
      type: type,
      nom: nom,
      email: email,
      prenom: prenom,
      tel: tel,
      pays: pays,
      message: message,
      sujet: sujet
    },
      function( data ) {
         $("#recrutementErreur").html('');
         $("#recrutementErreur").html('<br><span style="color:green">Message envoy&eacute; </span>');
      }
     );
  }
    
  });  

/*$('#FormSenderContact').live('click', function(e) {
       e.preventDefault();
    // $("#recrutementErreur").html('');
      var typeContact  = $('input[type=radio][name=typeContact]:checked').attr('value');
      var typePro  = $("#typePro").val();
      var raison  = $("#raison").val();
      var nomContact  = $("#nomContact").val();
      var prenomContact  = $("#prenomContact").val();
      var emailContact  = $("#emailContact").val();
      var telContact  = $("#telContact").val();
      var adresseContact  = $("#adresseContact").val();
      var paysContact  = $("#paysContact").val();
      var messageContact  = $("#messageContact").val();
      
      var sujet =" Message de contact " ;

   if( !isValidEmailAddress( emailContact ) ) { 
    alert('Adresse email invalide');
     $("#contactErreur").html('<br><span style="color:red">Adresse EMAIL non valid</span>');
     e.preventDefault();
  }
  else{
     $.post( "ajax/contact.php",{ 
      typeContact: typeContact,
      typePro: typePro,
      raison: raison,
      nomContact: nomContact,
      prenomContact: prenomContact,
      emailContact: emailContact,
      telContact: telContact,
      adresseContact: adresseContact,
      paysContact: paysContact,
      messageContact: messageContact

    },
      function( data ) {
        console.log(data);
        $("#contactErreur").html('');
        $("#contactErreur").html('<br><span style="color:green">Message envoy&eacute; </span>');
      }
     );
  }
    
  });*/
 $('#FormSenderContact').live('click', function(e) {
                
           //data to be sent to server        
            var m_data = new FormData();   
            m_data.append( 'typeContact', $('input[type=radio][name=typeContact]:checked').attr('value'));
            m_data.append( 'typePro', $("#typePro").val());
			 m_data.append( 'raison', $("#raison").val());
            m_data.append( 'nomContact', $("#nomContact").val());
			 m_data.append( 'prenomContact', $("#prenomContact").val());
            m_data.append( 'emailContact', $("#emailContact").val());
			 m_data.append( 'telContact', $("#telContact").val());
            m_data.append( 'adresseContact', $("#adresseContact").val());
			 m_data.append( 'paysContact', $("#paysContact").val());
            m_data.append( 'messageContact', $("#messageContact").val());
            m_data.append( 'file_attach', $('input[name=file_attach]')[0].files[0]);
              
            //instead of $.post() we are using $.ajax()
            //that's because $.ajax() has more options and flexibly.
  /*if( !isValidEmailAddress($("#emailContact").val()) ) { 
     $("#contactErreur").html('<br><span style="color:red">Adresse EMAIL non valid</span>');
     e.preventDefault();
  }*/
            $.ajax({
              url: 'ajax/contact.php',
              data: m_data,
              processData: false,
              contentType: false,
              type: 'POST',
              dataType:'json',
              success: function(response){
                 //load json data from server and output message    
                if(response.type == 'error'){ //load json data from server and output message    
                    output = '<br><span style="color:red">erreur</span>';
                }else{
                    output = '<br><span style="color:green">Message envoy&eacute; </span>';
                }
                $("#contactErreur").hide().html(output).slideDown();
              }
            });
 
           });

});

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};
function initCallbackFx(carousel, obejctli,liindex,listate){
 
    $(".jcarousel li").mouseenter(function(){
        carousel.stopAuto();
    }).mouseleave(function(){
        carousel.startAuto();
    });
}
function goTo (num) {
  event.preventDefault();
	$("#magazine").turn("page",num) ;
  //$('.jcarousel').jcarouselAutoscroll('start');	
}

$(window).load(function(){
    //console.log('charged');
//
$("#jquery_jplayer_1").jPlayer("play");
    var loading = $('.loading');
     var mag = $('#magazine');
    var way = 1;
      loading.fadeOut( 2000, function() {
       setInterval(function() {
          mag.fadeTo(500,1);
          if (way==1) {
              
              if($("#magazine").turn("page") == 14 ){
                  way = 2;
            $("#magazine").turn("options", {turnCorners: "tl,tr"});
          }
              
          } else {
              
                if ($("#magazine").turn("page")==1) {
                  way = 1;
                  $("#magazine").turn("options", {turnCorners: "bl,br"}); 
              }
          }
          
      }, 100);
      });
   

});
   $('#sur-rendez-vousbtn').live('click', function(e) {
       e.preventDefault();
     $("#rendez-vousErreur").html('');
      var nom  = $("#rendeznom").val();
      var email  = $("#rendezemail").val();
      var prenom  = $("#rendezprenom").val();
      var tel  = $("#rendeztel").val();
     
      var message  = $("#rendezmessage").val();
      var sujet =" prise de rendez-vous " ;

   if( !isValidEmailAddress( email ) ) { 
      $("#rendez-vousErreur").html('<br><span style="color:red">Adresse EMAIL non valid</span>');
     e.preventDefault();
  }
  else{
     $.post( "ajax/prise-rendez-vous.php",{ 
      
      nom: nom,
      email: email,
      prenom: prenom,
      tel: tel,
      message: message,
      sujet: sujet
    },
      function( data ) {
         $("#rendez-vousErreur").html('');
         $("#rendez-vousErreur").html('<br><span style="color:green">Message envoy&eacute; </span>');
      }
     );
  }
    
  });  