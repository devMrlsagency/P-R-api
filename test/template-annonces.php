<?php
/*
 * Template Name: Annonces
 * Template Post Type: page
 */

get_header();  // Récupère l'en-tête du thème
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Annonces Immobilières</title>
    <style>
      
       

        .pricipal-container {
            width: 1256px;
            margin: auto;
        }

        /* formulaire de filtre */
        .form {
            width: 383px;
            float: left;
            background: #224665;
            box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.02), 0px 14px 14px 0px rgba(0, 0, 0, 0.02), 0px 31px 18px 0px rgba(0, 0, 0, 0.01), 0px 55px 22px 0px rgba(0, 0, 0, 0.00), 0px 85px 24px 0px rgba(0, 0, 0, 0.00);
            padding: 20px;
            padding-bottom: 37px;
            position: relative; 
            margin-top: -44px;
        }

        .title-form {
            color: #FFF;
            font-family: Inter;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 28px;
        }

        input::placeholder {
            color: #FFF;
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 28px;
        }

        #localisationFilter {
            width: 328px;
            height: 45px;
            flex-shrink: 0;
            background: rgba(0, 154, 222, 0.20);
            border: none;
            outline: none;
            color:white;
        }
        
       

        .form h3 {
            color: #FFF;
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 28px;
            margin-bottom: 0px;
            margin-top: 22px;
        }
         .form h4 {
            color: #FFF;
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 28px;
            margin-bottom: 7px;
            margin-top: 22px;
        }

        .form span {
            color: #009ADE;
            font-family: Inter;
            font-size: 12px;
            font-style: italic;
            font-weight: 400;
            line-height: 20px;
            padding-bottom: 22px;
            
        }
        input {
            border-radius:0px !important
        }
        
        input[type="number"] {
        color: white;
        }

        input[type="number"]:focus {
        border: none;
        outline: none;
        }

        label {
            color: #FFF !important;
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
        }

        .first-input, .second-input {
            margin-top: 22px;
            margin-bottom: 22px;
        }

        .group {
            display: flex;
            gap: 40px;
            align-items: center;
            margin-bottom: 10px;
        }

        .group input {
            width: 151px;
            height: 29px;
            flex-shrink: 0;
            border: 0,3px solid !important;
            border-color: rgba(255, 255, 255, 0.36);
            background: #1B577D;
        }
        
       
        .group label {
            display: none;
        }

        .recherche {
            padding: 2px 20px;
            border-radius: 10px;
            background: #1C9AD7;
            color: #FFF;
            text-align: center;
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: 28px;
            margin-top: 33px;
            border: none;
        }
        
         .recherche:hover {
            padding: 2px 20px;
            border-radius: 10px;
            background: #1C9AD7;
            color: #FFF;
            text-align: center;
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: 28px;
            margin-top: 33px;
            border: none;
        }
        
        .recherche:focus {
            padding: 2px 20px;
            border-radius: 10px;
            background: #1C9AD7;
            color: #FFF;
            text-align: center;
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: 28px;
            margin-top: 33px;
            border: none;
            outline:none !important;
        }

        #resetFilters {
            color: #FFF;
            text-align: center;
            font-family: Inter;
            font-size: 12px;
            font-style: italic;
            font-weight: 400;
            line-height: 24px;
            text-decoration-line: underline;
            background-color: transparent;
            border: none;
            margin-top: 9px;
        }
        
         #resetFilters:focus {
            color: #FFF;
            text-align: center;
            font-family: Inter;
            font-size: 12px;
            font-style: italic;
            font-weight: 400;
            line-height: 24px;
            text-decoration-line: underline;
            background-color: transparent;
            border: none;
            margin-top: 9px;
            outline:none !important;
        }

        input[type="text"],
        input[type="number"] {
            padding-left: 10px;
        }
        
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
         -webkit-appearance: none;
           margin: 0;
        }
        
          input#minSurface, input#maxSurface {
          background-image: url('https://nota-developpement.com/wp-content/uploads/2023/12/m2.svg'); /* Chemin vers votre fichier SVG */
         background-repeat: no-repeat;
         background-position: 92%; /* ou 'left', selon la position souhaitée */
          background-size: 20px 20px; /* Taille de l'icône */
          padding-right: 25px; /* Ajuster pour éviter que le texte n'écrase l'icône */
        }
        
           input#minPrice, input#maxPrice {
          background-image: url('https://nota-developpement.com/wp-content/uploads/2023/12/E.svg'); /* Chemin vers votre fichier SVG */
         background-repeat: no-repeat;
         background-position: 92%; /* ou 'left', selon la position souhaitée */
          background-size: 10px 24px; /* Taille de l'icône */
          padding-right: 25px; /* Ajuster pour éviter que le texte n'écrase l'icône */
        }
     

         input#localisationFilter {
          background-image: url('https://nota-developpement.com/wp-content/uploads/2023/12/mingcute_search-line.svg'); /* Chemin vers votre fichier SVG */
         background-repeat: no-repeat;
         background-position: 96%; /* ou 'left', selon la position souhaitée */
          background-size: 24px 24px; /* Taille de l'icône */
          padding-right: 25px; /* Ajuster pour éviter que le texte n'écrase l'icône */
        }
     



        /* annonce bloc */
        #annonceCount {
            color: #224665;
            font-family: Playfair Display;
            font-size: 70px;
            font-style: italic;
            font-weight: 600;
            line-height: 50px;
        }

        .container {
            width: 766px;
            margin: 44px  auto;
            float: right;
            padding-top: 44px;
            padding-bottom: 44px;
            border-bottom: 1px solid #009ADE;
            border-top: 1px solid #009ADE;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        .content-row {
            width: 766px;
            margin: 40px auto 0 auto; 
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            float: right;
        }

        .collumn {
            width: 429px;
        }

        .sort-dropdowns {
            width: 260px;
           
        }

        .sort-dropdowns label{
        display: none;
        }
        .custom-select {
         appearance: none;
         background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KICA8cGF0aCBkPSJNNSA2SDIwTTEwIDEySDIwTTE2IDE4SDIwIiBzdHJva2U9IiMxQzlBRDciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==');
        background-repeat: no-repeat;
        background-position: right 10px top 50% ;
        padding-left: 10px;
            
        }

        select {
            padding: 10px;
            border: 1px solid #224665;
            background: #FFF;
             outline:none !important;
             border-radius:0px;
        }
        
      

        .annonce-card {
            margin-bottom: 20px;
            flex: 0 29%;
            margin-top: 20px;
        }
        .annonce-card img {
            width: 224px;
            height: 220px;
            display: block;
        }

        .annonce-card h3 {
            color: #1C9AD7;
            font-family: Inter;
            font-size: 10px;
            font-style: normal;
            font-weight: 700;
            line-height: 28px; /* 280% */
            text-transform: uppercase;
            margin-top: 8px;
            margin-bottom: 0px;
        }
        .annonce-details .prix {
            color: #224665;
            font-family: Inter;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 28px;
            margin-bottom: 8px;
            margin-top: 0px;
        }

        .annonce-details  {
            color: #585858;
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px; /* 142.857% */
        }

        .annonce-card p {
            margin: 0px;
        }
    </style>
</head>

<body>
    <?php
    // Boucle WordPress pour afficher le contenu de la page
    while ( have_posts() ) : the_post();
        the_content();
    endwhile;
    ?>
    <div class="principal-container" style="max-width: 1256px; margin: auto;">
        <div class="form">
            <h2 class="title-form">Affiner votre recherche</h2>
            <form id="filterForm">
                <input type="text" id="localisationFilter" name="localisation" placeholder="Ville ou code postal"> <br>
                <h3>Transactions</h3>
                <span>Sélectionner un type de transaction</span><br>
                <div class="first-input">
                    <input type="checkbox" id="vente" name="transactionType" value="VENTE">
                    <label for="vente">Vente</label><br>
                    <input type="checkbox" id="location" name="transactionType" value="LOCATION">
                    <label for="location">Location</label><br>
                    <input type="checkbox" id="immoInteractif" name="transactionType" value="Immo-interactif">
                    <label for="immoInteractif">Immo-interactif</label><br>
                    <input type="checkbox" id="venteEncheres" name="transactionType" value="Vente aux enchères">
                    <label for="venteEncheres">Vente aux enchères</label><br>
                    <input type="checkbox" id="viager" name="transactionType" value="Viager">
                    <label for="viager">Viager</label><br>
                </div>
                <h3>Type de biens :</h3>
                <span>Sélectionner un type de bien</span><br>
                <div class="second-input">
                    <div id="typeBienContainer" style="display: flex;">
                        <div style="flex: 1;">
                            <label><input type="checkbox" name="typeBien" value="Tous"> Tous</label><br>
                            <label><input type="checkbox" name="typeBien" value="Appartement"> Appartement</label><br>
                            <label><input type="checkbox" name="typeBien" value="Maison / villa"> Maison</label><br>
                            <label><input type="checkbox" name="typeBien" value="Immeuble"> Immeuble</label><br>
                            <label><input type="checkbox" name="typeBien" value="Garage"> Garage</label><br>
                            <label><input type="checkbox" name="typeBien" value="Local divers"> Local divers</label><br>
                        </div>
                        <div style="flex: 1;">
                            <label><input type="checkbox" name="typeBien" value="Local d’activité"> Local d’activité</label><br>
                            <label><input type="checkbox" name="typeBien" value="Fonds de commerce"> Fonds de commerce</label><br>
                            <label><input type="checkbox" name="typeBien" value="Bien agricole"> Bien agricole</label><br>
                            <label><input type="checkbox" name="typeBien" value="Bien viticole"> Bien viticole</label><br>
                            <label><input type="checkbox" name="typeBien" value="Terrain"> Terrain</label><br>
                        </div>
                    </div>
                </div>
                <h4>Prix</h4>
                <div class="group">
                    <div>
                        <label for="minPrice">Prix minimum :</label>
                        <input type="number" id="minPrice" name="minPrice" placeholder="Minimum">
                    </div>
                    <div>
                        <label for="maxPrice">Prix maximum :</label>
                        <input type="number" id="maxPrice" name="maxPrice" placeholder="Maximum">
                    </div>
                </div>
                <h4>Surface</h4>
                <div class="group">
                    <div>
                        <label for="minSurface">Surface minimale (m²) :</label>
                        <input type="number" id="minSurface" name="minSurface" placeholder="Minimum">
                    </div>
                    <div>
                        <label for="maxSurface">Surface maximale (m²) :</label>
                        <input type="number" id="maxSurface" name="maxSurface" placeholder="Maximum">
                    </div>
                </div>
                <h4>Nombre de pièces</h4>
                <div class="group">
                    <div>
                        <label for="minPieces">Nombre de pièces minimum :</label>
                        <input type="number" id="minPieces" name="minPieces" placeholder="Minimum">
                    </div>
                    <div>
                        <label for="maxPieces">Nombre de pièces maximum :</label>
                        <input type="number" id="maxPieces" name="maxPieces" placeholder="Maximum">
                    </div>
                </div>
                <div style="text-align: center;">
                    <button type="submit" class="recherche">Rechercher</button><br>
                </div>
                <div style="text-align: center;">
                    <button type="button" id="resetFilters">Réinitialiser votre recherche</button>
                </div>
            </form>
        </div>
        <div class="col-annonce">
            <div class="content-row">
                <div class="collumn">
                    <h2 id="annonceCount">0 résultats</h2>
                </div>
                <div class="sort-dropdowns">
                    <label for="sortSelect">Trier par : </label>
                    <select id="sortSelect" class="custom-select">
                        <option value="recent">Trier par date la plus récente</option>
                        <option value="oldest">Trier par date la moins récente</option>
                        <option value="priceAsc"> Trier par prix croissant</option>
                        <option value="priceDesc">Trier par prix décroissant</option>
                    </select>
                </div>
            </div>
            <div class="container" id="annonces-container"></div>
        </div>
    </div>
</body>

</html>



<script>
    document.addEventListener('DOMContentLoaded', async () => {
        const container = document.getElementById('annonces-container');
        const filterForm = document.getElementById('filterForm');
        const resetButton = document.getElementById('resetFilters');
        const annonceCount = document.getElementById('annonceCount');
        const sortSelect = document.getElementById('sortSelect');

        resetButton.addEventListener('click', () => {
            resetForm();
            applyFilters(); // Pour réappliquer les filtres après réinitialisation
        });

        async function loadAnnonces() {
            try {
                const response = await fetch(`https://api-immo-notaires.onrender.com/annonces`);
                let annonces = await response.json();

                const sortOrder = sortSelect.value; // Récupère la valeur de tri

                if (sortOrder === 'oldest') {
                    // Inverse l'ordre des annonces pour "plus ancien"
                    annonces = annonces.reverse();
                }

                container.innerHTML = ''; // Efface les annonces actuelles
                annonces.forEach(annonce => {
                    const card = createAnnonceCard(annonce);
                    container.appendChild(card);
                });
                updateAnnonceCount(); // Mise à jour du compteur après le chargement

            } catch (error) {
                console.error('Erreur lors de la récupération des annonces:', error);
            }
        }

        function createAnnonceCard(annonce) {
            const card = document.createElement('div');
            card.className = 'annonce-card';
            card.setAttribute('data-transaction', annonce.transaction);
            card.setAttribute('data-price', annonce.price);
            card.setAttribute('data-location', annonce.localisation);
            card.setAttribute('data-surface', annonce.surface);
            card.setAttribute('data-pieces', annonce.piece);
            card.setAttribute('data-title', annonce.title);

            card.innerHTML = `
                <a href="${annonce.link}" target="_blank">
                    <img src="${annonce.img}" alt="Image de l'annonce">
                </a>
                <div class="annonce-details">
                    <h3>${annonce.title}</h3>
                    <p class="prix">${annonce.price}</p>
                    <p>${annonce.localisation}</p>
                    <p class="nbPiece">${annonce.piece ? `${annonce.piece} pièces` : ''}</p>
                    <p class="Surface">${annonce.surface}</p>
                </div>
            `;
            return card;
        }

        function resetForm() {
            document.getElementById('filterForm').reset();
            // Autres réinitialisations si nécessaire
        }

        filterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            applyFilters();
        });

        function applyFilters() {
            const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
            const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
            const minSurface = parseFloat(document.getElementById('minSurface').value) || 0;
            const maxSurface = parseFloat(document.getElementById('maxSurface').value) || Infinity;
            const minPieces = parseInt(document.getElementById('minPieces').value) || 0;
            const maxPieces = parseInt(document.getElementById('maxPieces').value) || Infinity;
            const selectedTypeBiens = Array.from(document.querySelectorAll('input[name="typeBien"]:checked')).map(cb => cb.value);
            const localisationFilter = document.getElementById('localisationFilter').value.trim().toLowerCase();
            const selectedTransactions = Array.from(document.querySelectorAll('input[name="transactionType"]:checked')).map(el => el.value);

            const cards = document.querySelectorAll('.annonce-card');
            cards.forEach(card => {
                const price = parseFloat(card.getAttribute('data-price').replace(/\D/g, '')) || 0;
                const transaction = card.getAttribute('data-transaction');
                const surface = parseFloat(card.getAttribute('data-surface')) || 0;
                const pieces = parseInt(card.getAttribute('data-pieces')) || 0;
                const location = card.getAttribute('data-location').toLowerCase();

                const matchesPrice = price >= minPrice && price <= maxPrice;
                const matchesSurface = surface >= minSurface && surface <= maxSurface;
                const matchesPieces = pieces >= minPieces && pieces <= maxPieces;
                const matchesTypeBien = selectedTypeBiens.length === 0 || selectedTypeBiens.includes('Tous') || selectedTypeBiens.includes(card.getAttribute('data-title'));
                const matchesTransaction = selectedTransactions.length === 0 || selectedTransactions.includes(transaction);
                const matchesLocation = localisationFilter === '' || location.includes(localisationFilter);

                card.style.display = (matchesPrice && matchesSurface && matchesPieces && matchesTypeBien && matchesTransaction && matchesLocation) ? '' : 'none';
            });
            updateAnnonceCount(); // Mise à jour du compteur après application des filtres
        }

        function updateAnnonceCount() {
            const visibleCards = Array.from(container.querySelectorAll('.annonce-card')).filter(card => card.style.display !== 'none');
            annonceCount.textContent = visibleCards.length + ' résultats';
        }

        function sortAnnonces() {
    const sortOrder = sortSelect.value;
    if (sortOrder === 'oldest') {
        // Inverse l'ordre des annonces pour "plus ancien"
        const cards = Array.from(container.querySelectorAll('.annonce-card'));
        cards.reverse();
        container.innerHTML = ''; // Supprimez les annonces actuelles du conteneur
        cards.forEach(card => {
            container.appendChild(card);
        });
    } else if (sortOrder === 'priceAsc') {
        // Tri par prix croissant
        const cards = Array.from(container.querySelectorAll('.annonce-card'));
        cards.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price').replace(/\D/g, '')) || 0;
            const priceB = parseFloat(b.getAttribute('data-price').replace(/\D/g, '')) || 0;
            return priceA - priceB;
        });
        container.innerHTML = ''; // Supprimez les annonces actuelles du conteneur
        cards.forEach(card => {
            container.appendChild(card);
        });
    } else if (sortOrder === 'priceDesc') {
        // Tri par prix décroissant
        const cards = Array.from(container.querySelectorAll('.annonce-card'));
        cards.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price').replace(/\D/g, '')) || 0;
            const priceB = parseFloat(b.getAttribute('data-price').replace(/\D/g, '')) || 0;
            return priceB - priceA;
        });
        container.innerHTML = ''; // Supprimez les annonces actuelles du conteneur
        cards.forEach(card => {
            container.appendChild(card);
        });
    } else {
        // Tri par défaut (plus récent)
        loadAnnonces(); // Recharge les annonces pour restaurer l'ordre par défaut
    }
    updateAnnonceCount();
}


        sortSelect.addEventListener('change', sortAnnonces);

        loadAnnonces();
    });
</script>


</body>
</html>

<?php
get_footer();  // Récupère le pied de page du thème
?>
