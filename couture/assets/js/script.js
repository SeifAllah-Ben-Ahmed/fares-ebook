/* -------------------------------------------------------------
   Mise a l'echelle du livre sur petits ecrans.

   #magazine a une geometrie figee (926x650, pages de 463x650)
   imposee par turn.js et par les images de pages (463x650 elles
   aussi). Plutot que de casser cette geometrie avec des offsets
   en dur, on met #book-stage (livre + pagination) a l'echelle
   avec un transform: scale() calcule depuis le viewport, et on
   reduit les commandes (#test) uniquement si l'ecran est trop
   court -- typiquement un mobile en paysage.

   window.__bookScale est relu par turn.js (cf. le patch
   "book scale" dans assets/js/turn.js) : les coordonnees
   pointeur arrivent en pixels ecran, il faut les diviser par
   l'echelle pour retomber sur les coordonnees internes du livre,
   sinon la detection des coins et le glisser-tourner tombent a
   cote.
------------------------------------------------------------- */
var BOOK_WIDTH = 926;         // largeur figee de #magazine
var CONTROLS_MIN_SCALE = 0.7; // en dessous, les fleches ne sont plus cliquables

window.__bookScale = 1;

// Applique (ou retire) un transform: scale() et rattrape la hauteur
// occupee dans le flux, qu'un transform ne modifie pas.
function scaleBlock(el, scale, naturalHeight) {

  if (scale >= 1) {
    el.style.webkitTransform = '';
    el.style.transform = '';
    el.style.marginBottom = '';
    return;
  }

  el.style.webkitTransform = 'scale(' + scale + ')';
  el.style.transform = 'scale(' + scale + ')';
  el.style.marginBottom = -Math.round(naturalHeight * (1 - scale)) + 'px';
}

function bookFit() {

  var stage = document.getElementById('book-stage');
  var controls = document.getElementById('test');
  if (!stage) { return; }

  // On repart de la mise en page naturelle pour mesurer : offsetTop et
  // offsetHeight ignorent le transform, mais pas les marges negatives
  // posees au passage precedent.
  stage.style.marginTop = '';
  stage.style.marginBottom = '';
  if (controls) { controls.style.marginBottom = ''; }

  var stageHeight = stage.offsetHeight;
  if (!stageHeight) { return; }

  var controlsHeight = controls ? controls.offsetHeight : 0;
  // Espace entre le bas du livre et les commandes : c'est une marge, elle
  // n'est donc pas mise a l'echelle et doit etre comptee telle quelle.
  var gap = controls
    ? Math.max(0, controls.offsetTop - stage.offsetTop - stageHeight)
    : 0;

  var bodyStyle = window.getComputedStyle(document.body);
  var availHeight = window.innerHeight
    - (parseFloat(bodyStyle.paddingTop) || 0)
    - (parseFloat(bodyStyle.paddingBottom) || 0);

  // 1. La largeur commande : le livre doit tenir dans le viewport.
  var bookScale = Math.min(1, document.documentElement.clientWidth / BOOK_WIDTH);
  var controlsScale = 1;

  // 2. Si la hauteur ne suit pas (mobile en paysage), on reduit d'abord les
  //    commandes -- sans les rendre intouchables -- puis le livre.
  if (stageHeight * bookScale + gap + controlsHeight > availHeight) {
    if (controlsHeight) {
      controlsScale = Math.max(
        CONTROLS_MIN_SCALE,
        Math.min(1, (availHeight - gap - stageHeight * bookScale) / controlsHeight)
      );
    }
    bookScale = Math.min(
      bookScale,
      (availHeight - gap - controlsHeight * controlsScale) / stageHeight
    );
  }
  if (!(bookScale > 0)) { bookScale = 1; }

  window.__bookScale = bookScale;

  scaleBlock(stage, bookScale, stageHeight);
  if (controls) { scaleBlock(controls, controlsScale, controlsHeight); }

  // 3. Centrage vertical de l'ensemble livre + commandes s'il reste de la place.
  var slack = availHeight
    - (stageHeight * bookScale + gap + controlsHeight * controlsScale);
  if (bookScale < 1 && slack > 0) {
    stage.style.marginTop = Math.round(slack / 2) + 'px';
  }
}

$(bookFit);
$(window).on('resize orientationchange', bookFit);



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
		else if (page == 60 && $(this).data('done')){
			mag.addClass('centerEnd').removeClass('centerStart');
		}
		else {
			mag.removeClass('centerStart centerEnd');
		}
		if(page == 2 || page == 3 && $(this).data('done')){$('.dedicase').fadeTo(500,1);}else{//$('.dedicase').hide();
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

// --- Numerotation des pages -------------------------------------------------
// La page 1 affichee est le Sommaire, soit la page 5 de turn.js : ecart de 4.
var PAGE_OFFSET = 4;

function renderPageNumbers(view) {

  if (!view) { return; }

  var left  = view[0] - PAGE_OFFSET;
  var right = view[1] - PAGE_OFFSET;

  $("#numPageleft").html(left   >= 1 ? left  : '');
  $("#numPageright").html(right >= 1 ? right : '');

  // Un nombre a deux chiffres est plus large : on reduit la marge pour le
  // garder aligne, et on retablit la valeur d'origine en dessous de 10.
  $("#numPageleft").css("margin-left",   left  >= 10 ? "128px" : "130px");
  $("#numPageright").css("margin-right", right >= 10 ? "122px" : "126px");
}

$("#magazine").bind("turning", function(event, page, view) {

  renderPageNumbers(view);

  // Le menu e-boutique est masque sur la couverture et sur les pages de fin.
  var right = view[1];
  if (right > 0 && right <= 57) {
    $("#menu").show();
  }
  else {
    $("#menu").hide();
  }

  if (page == 1 || page == 2 || page == 57 || page == 58) {
    // pas de son sur la couverture ni sur la fin
  }
  else {
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
       // le loader quitte le flux : la place disponible change.
       bookFit();
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