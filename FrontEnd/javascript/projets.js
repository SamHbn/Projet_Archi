// Récupération des projets pour les afficher dynamiquement avec javascript

fetch("http://localhost:5678/api/works")
    .then(listProjects => {
        return listProjects.json()
    })
    .then(function createFunction1(listProjects) {
        console.log(listProjects)

    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = ""

    const categories = new Set()

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
    });

    // Création de la partie filtre

    listProjects.forEach(project => categories.add(project.category.name))
        console.log(categories)

    const filters = document.querySelector(".filters")
    const listFilters = document.createElement("ul")

    filters.appendChild(listFilters)

    for (let item of categories) { console.log(item)
        const liCat = document.createElement("li")
        liCat.innerText = item
        listFilters.appendChild(liCat)
    }
    })


    .catch(error => {
        console.error("Erreur lors du fetch :", error)
    });



    // const filters = document.querySelector(".filters")
    // const catAll = 
    // filters = `
    //     <ul>
    //         <li>${catAll}</li>
    //         <li>${cat1}</li>
    //         <li>${cat2}</li>
    //         <li>${cat3}</li>
    //     </ul>
    //     `