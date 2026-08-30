// Variables globales pour la navigation

let currentPage = 1;

let totalPages = 60; // Basé sur le nombre de pages dans votre HTML



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

    if (typeof renderPageNumbers !== 'function') { return; }

    // Une seule source de verite : le renderer de script.js, alimente par la
    // vue reelle de turn.js (page gauche + page droite). turn.js n'est pas
    // encore initialise lors du premier appel (ready), d'ou le try/catch.
    try {
        renderPageNumbers($('#magazine').turn('view'));
    } catch (e) {
        /* pas encore initialise : le premier 'turning' fera le rendu */
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