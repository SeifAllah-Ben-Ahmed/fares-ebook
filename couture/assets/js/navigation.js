// Variables globales pour la navigation

let currentPage = 1;

let totalPages = 62; // Basé sur le nombre de pages dans votre HTML



// Fonction pour aller aux 2 pages précédentes

function prevPage() {

    if (currentPage > 2) {

        currentPage -= 2;

        goToPage(currentPage);

        updatePageIndicator();

        updateNavigationButtons();

    } else if (currentPage > 1) {

        // Si on ne peut pas reculer de 2 pages complètes mais qu'on peut aller à la page 1

        currentPage = 1;

        goToPage(currentPage);

        updatePageIndicator();

        updateNavigationButtons();

    }

}



// Fonction pour aller aux 2 pages suivantes

function nextPage() {

    if (currentPage + 2 <= totalPages) {

        currentPage += 2;

        goToPage(currentPage);

        updatePageIndicator();

        updateNavigationButtons();

    } else if (currentPage < totalPages) {

        // Si on ne peut pas avancer de 2 pages complètes mais qu'on peut aller à la dernière page

        currentPage = totalPages;

        goToPage(currentPage);

        updatePageIndicator();

        updateNavigationButtons();

    }

}



// Fonction pour aller à une page spécifique

function goToPage(pageNumber) {

    if (pageNumber >= 1 && pageNumber <= totalPages) {

        currentPage = pageNumber;

        

        // Si vous utilisez la bibliothèque turn.js (qui semble être le cas)

        if (typeof $('#magazine').turn === 'function') {

            $('#magazine').turn('page', pageNumber);

        }

        

        updatePageIndicator();

        updateNavigationButtons();

    }

}



function updatePageIndicator() {

    // Définir les pages gauche et droite à afficher

    let leftPage = currentPage - 5;

    let rightPage = currentPage - 6;



    // Créer le conteneur d'indicateurs s'il n'existe pas

    if ($('.page-indicator-container').length === 0) {

        // Insertion au début du body

        $('body').prepend(`

            <div class="page-indicator-container">

                <div class="numPageleft"></div>

                <div class="numPageright"></div>

            </div>

        `);

    }



    // Mettre à jour le contenu des indicateurs

    if (leftPage > 1) {

        $('.numPageright').text(`${leftPage}`);



    } else {

        $('.numPageright').text('');

    }



    if (rightPage > 1 && rightPage <= totalPages) {

        $('.numPageleft').text(`${rightPage}`);



    } else {

        $('.numPageleft').text('');

    }

}







// Fonction pour mettre à jour l'état des boutons de navigation

function updateNavigationButtons() {

    const prevBtn = $('#prevPageBtn');

    const nextBtn = $('#nextPageBtn');

    

    // Désactiver le bouton précédent si on est à la première page ou page 2

    if (currentPage <= 2) {

        prevBtn.prop('disabled', true);

    } else {

        prevBtn.prop('disabled', false);

    }

    

    // Désactiver le bouton suivant si on est à la dernière page ou avant-dernière page

    if (currentPage >= totalPages - 1) {

        nextBtn.prop('disabled', true);

    } else {

        nextBtn.prop('disabled', false);

    }

}



// Initialisation quand le document est prêt

$(document).ready(function() {

    // Initialiser l'état des boutons et de l'indicateur

    updatePageIndicator();

    updateNavigationButtons();

    

    // Si turn.js est utilisé, écouter les événements de changement de page

    if (typeof $('#magazine').turn === 'function') {

        $('#magazine').bind('turned', function(event, page, view) {

            currentPage = page;

            updatePageIndicator();

            updateNavigationButtons();

        });

    }

    

    // Optionnel : Navigation au clavier

    $(document).keydown(function(e) {

        if (e.keyCode === 37) { // Flèche gauche

            prevPage();

        } else if (e.keyCode === 39) { // Flèche droite

            nextPage();

        }

    });

});



// Fonction goTo existante modifiée pour être compatible

function goTo(pageId) {

    const pageNumber = parseInt(pageId);

    if (!isNaN(pageNumber)) {

        goToPage(pageNumber);

    }

}