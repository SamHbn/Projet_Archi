let modal = null;

const openModal = function () {
  const modal = document.querySelector(".modal");
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  // La modale s'ouvre automatiquement sur la vue gallery
  const galleryView = document.querySelector(".gallery-view");
  const addPhotoView = document.querySelector(".add-photo-view");
  galleryView.style.display = "flex";
  addPhotoView.style.display = "none";
};

const closeModal = function () {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
};

const openModalBis = function () {
  const galleryView = document.querySelector(".gallery-view");
  const addPhotoView = document.querySelector(".add-photo-view");
  galleryView.style.display = "none";
  addPhotoView.style.display = "flex";
};

const backToGallery = function () {
  document.querySelector(".gallery-view").style.display = "flex";
  document.querySelector(".add-photo-view").style.display = "none";
};

// Ouvrir et revenir en arrière dans la modale
document.querySelector(".open-modal").addEventListener("click", openModal);
document
  .querySelector(".btn-add-photo")
  .addEventListener("click", openModalBis);
document
  .querySelector(".back-to-gallery")
  .addEventListener("click", backToGallery);
// Les différents moyens de fermer la modale
document.querySelector(".close-modal").addEventListener("click", closeModal);
document
  .querySelector(".btns .close-modal")
  .addEventListener("click", closeModal);
document.querySelector(".modal").addEventListener("click", function (e) {
  const modalWrapper = document.querySelector(".modal-wrapper");
  if (!modalWrapper.contains(e.target)) {
    closeModal();
  }
});

// Récuperation de la gallerie pour l'afficher dans la modale
function modalGallery(listProjects) {
  const modifGallery = document.querySelector(".modif-gallery");
  modifGallery.innerHTML = "";

  listProjects.forEach((project) => {
    const figure = document.createElement("figure");
    figure.classList.add("modal-figure");

    const img = document.createElement("img");
    img.src = project.imageUrl;
    img.alt = project.title;

    figure.appendChild(img);
    modifGallery.appendChild(figure);

    // Gestion de la suppréssion des projets
    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");
    trash.dataset.id = project.id;

    trash.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const token = localStorage.getItem("token");

      fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erreur ${response.status}`);
          }
          if (response.status === 204) {
            e.target.closest("figure").remove();
            return;
          }

          return response.json();
        })
        .catch((err) => {
          console.error("Échec :", err.message);
        });
    });

    figure.appendChild(trash);
  });
}

fetch("http://localhost:5678/api/works")
  .then((listProjects) => {
    return listProjects.json();
  })
  .then(function createFunction1(listProjects) {
    modalGallery(listProjects);
  });

// Upload de l'image et changement d'affichage
document.getElementById("file-upload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const previewImg = document.querySelector(".image-preview");
      previewImg.src = event.target.result;
      previewImg.style.display = "block";

      // Masquer les autres éléments dans upload-container
      document.querySelector(".contain-icon").style.display = "none";
      document.querySelector(".upload-button").style.display = "none";
      document.querySelector(".upload-info").style.display = "none";
    };
    reader.readAsDataURL(file);
  }
});

// Menu déroulant des catégories
fetch("http://localhost:5678/api/categories")
  .then((reponse) => reponse.json())
  .then((categories) => {
    const menuCategory = document.querySelector(".menu-category");

    // Option vide par défault
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.hidden = true;

    menuCategory.appendChild(defaultOption);

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.textContent = category.name;
      option.value = category.id;
      menuCategory.appendChild(option);
    });
  });

// Gestion du bouton du formulaire
const form = document.querySelector("form");
const button = document.querySelector(".valid-add");

form.addEventListener("input", () => {
  const image = document.querySelector("#file-upload").files[0];
  const title = document.querySelector("#title").value.trim();
  const category = document.querySelector("#category").value;

  if (image && title !== "" && category !== "") {
    button.classList.add("enable");
  } else {
    button.classList.remove("enable");
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const image = document.querySelector("#file-upload").files[0];
  const title = document.querySelector("#title").value.trim();
  const category = document.querySelector("#category").value;
  const token = localStorage.getItem("token");

  const errorMsg = document.querySelector(".form-error");

  if (!image || !title || !category) {
    errorMsg.style.display = "block";
    return;
  } else {
    errorMsg.style.display = "none";
  }

  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", category);

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi : " + response.status);
    }
  } catch (error) {
    console.error("Erreur lors de l’envoi :", error);
    alert("Erreur lors de l’ajout du projet.");
  }
});
