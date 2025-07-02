// Fonction qui affiche la partie edit avec le lien "modifier" visible
function showEditLinkIfLoggedIn() {
  const token = localStorage.getItem("token");
  const editLink = document.querySelector(".title-projets a");

  if (token && editLink) {
    editLink.style.display = "inline";
  } else if (editLink) {
    editLink.style.display = "none";
  }
}

showEditLinkIfLoggedIn();

// Fonction qui créé la galerie
function createGallery(listProjects) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  listProjects.forEach((project) => {
    const figure = document.createElement("figure");
    
    const img = document.createElement("img");
    img.src = project.imageUrl;
    img.alt = project.title;
    
    const caption = document.createElement("figcaption");
    caption.innerText = project.title;
    
    figure.appendChild(img);
    figure.appendChild(caption);
    gallery.appendChild(figure);
  });
}

// Récupération des projets pour les afficher dynamiquement avec javascript
function projectsFilter() {
  fetch("http://localhost:5678/api/works")
  .then((listProjects) => {
    return listProjects.json();
  })
  .then(function createLists(listProjects) {

    createGallery(listProjects);

    // Création de la partie filtre
    const categories = new Set();

    categories.add("Tous");

    listProjects.forEach((project) => categories.add(project.category.name));

    const filters = document.querySelector(".filters");
    const listFilters = document.createElement("ul");

    filters.appendChild(listFilters);

    // On boucle et on créé une liste pour chaque catégorie
    for (let category of categories) {
      const listCategory = document.createElement("li");
      listCategory.innerText = category;

      if (category === "Tous") {
        listCategory.classList.add("selected");
      }

      listCategory.addEventListener("click", () => {
        document
          .querySelectorAll(".filters li")
          .forEach((li) => li.classList.remove("selected"));
        listCategory.classList.add("selected");

        if (category === "Tous") {
          createGallery(listProjects);
        } else {
          const filters = listProjects.filter(function (project) {
            return project.category.name === category;
          });
          createGallery(filters);
        }
      });
      listFilters.appendChild(listCategory);
    }
  })

  .catch((error) => {
    console.error("Erreur lors du fetch :", error);
  });
}

// Fonction qui gère la partie filtre
projectsFilter()