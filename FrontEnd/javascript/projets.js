function postGallery(listProjects) {
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = ""

    listProjects.forEach(project => {
    const figure = document.createElement("figure")

    const img = document.createElement("img")
    img.src = project.imageUrl
    img.alt = project.title

    const caption = document.createElement("figcaption")
    caption.innerText = project.title

    figure.appendChild(img)
    figure.appendChild(caption)
    gallery.appendChild(figure)
    })
}

// Récupération des projets pour les afficher dynamiquement avec javascript

fetch("http://localhost:5678/api/works")
    .then(listProjects => {
        return listProjects.json()
    })
    .then(function createFunction1(listProjects) {
        console.log(listProjects)

    postGallery(listProjects)

    // Création de la partie filtre

    const categories = new Set()

    categories.add("Tous")

    listProjects.forEach(project => categories.add(project.category.name))
        console.log(categories)

    const filters = document.querySelector(".filters")
    const listFilters = document.createElement("ul")

    filters.appendChild(listFilters)

    for (let item of categories) {
        const listCat = document.createElement("li")
        listCat.innerText = item

        if (item === "Tous") {
            listCat.classList.add("selected")
        }

        listCat.addEventListener("click", () => {

            document.querySelectorAll(".filters li").forEach(li => li.classList.remove("selected"))
            listCat.classList.add("selected")

            if (item === "Tous") {
                postGallery(listProjects)
            } else {
                const objects = listProjects.filter(function (project) {
                    return project.category.name === item
                });
                postGallery(objects)
            }
        })
        listFilters.appendChild(listCat)
    }
    })

    .catch(error => {
        console.error("Erreur lors du fetch :", error)
    });


