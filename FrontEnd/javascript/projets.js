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

function editPage() {
  const token = localStorage.getItem("token")
  const logout = document.getElementById("logout")

  if (token) {
    logout.textContent = "logout"
    logout.href = "#"
    logout.addEventListener("click", (e) => {
      e.preventDefault()
      localStorage.removeItem("token")
      window.location.reload()
    })
  } else {
    logout.textContent = "login"
    logout.href = "login.html"
  }
}

function editMod() {
  const token = localStorage.getItem("token");
  const listFilters = document.querySelector(".filters");

  if (token) {
    // Crée le bandeau uniquement s'il n'existe pas déjà
    if (!document.querySelector(".edit-banner")) {
      const banner = document.createElement("div");
      banner.className = "edit-banner";
      banner.innerHTML = '<i class="fa-regular fa-pen-to-square" style="margin-right: 8px;"></i> Mode édition';
      document.body.prepend(banner);

      // Décale le reste du contenu vers le bas
      document.body.style.paddingTop = "50px";
    }

    listFilters.style.display = "none";
  } else {
    // Supprime le bandeau et réinitialise le style
    const banner = document.querySelector(".edit-banner");
    if (banner) {
      banner.remove();
      document.body.style.paddingTop = "0px";
    }

    listFilters.style.display = "block";
  }
}

editPage()
editMod()
showEditLinkIfLoggedIn()

// Création la galerie
export function createGallery(listProjects) {
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
projectsFilter();
