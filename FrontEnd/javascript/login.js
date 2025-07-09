const formLogin = document.querySelector(".form-login");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector(".error");

formLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        errorMessage.style.display = "block";
        throw new Error("Identifiants incorrects");
      }
      return response.json();
    })

    .then((data) => {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    })

    .catch((error) => {
      console.error("Erreur:", error);
    });
});
