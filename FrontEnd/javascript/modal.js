let modal = null

const openModal = function (e) {
    console.log(e.target)
    const modal = document.querySelector(".modal")
    modal.style.display = "flex"
    modal.setAttribute("aria-hidden", "false")
}

const closeModal = function (e) {
    console.log(e.target)
    const modal = document.querySelector(".modal")
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
}

const openModal2 = function (e) {
    console.log(e.target)
    const modal = document.querySelector(".add-photo-view")
    modal.style.display = "flex"
    modal.setAttribute("aria-hidden", "false")
}

document.querySelectorAll(".open-modal").forEach(a => {
    a.addEventListener("click", openModal)
})
document.querySelectorAll(".close-modal").forEach(a => {
    a.addEventListener("click", closeModal)
})
document.querySelectorAll(".btn-add-photo").forEach(a => {
    a.addEventListener("click", openModal2)
})

// Revoir toute la structure pour faire 2 vues dans 1 seule modale