// Cargar datos desde el archivo JSON y guardarlos en localStorage
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem("cartasData", JSON.stringify(data.data));
    renderTable();
  })
  .catch((error) => console.error("Error al cargar los datos:", error));

const form = document.getElementById("dataForm");
const tableBody = document.querySelector(".table tbody");
const buttons = document.querySelectorAll(".card-container button");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const numeroCarta = this.elements["numero_carta"].value;

  const cartasData = JSON.parse(localStorage.getItem("cartasData"));
  const existingCard = cartasData.find((card) => card.numero === numeroCarta);
  if (existingCard) {
    existingCard.cantidad++;
  }

  localStorage.setItem("cartasData", JSON.stringify(cartasData));
  renderTable();
});

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const numeroCarta = this.getAttribute("data-numero");
    const cartasData = JSON.parse(localStorage.getItem("cartasData"));
    const existingCard = cartasData.find((card) => card.numero === numeroCarta);
    if (existingCard) {
      existingCard.cantidad++;
      localStorage.setItem("cartasData", JSON.stringify(cartasData));
      renderTable();
    }
  });
});

function renderTable() {
  tableBody.innerHTML = "";

  const cartasData = JSON.parse(localStorage.getItem("cartasData")) || [];

  // Ordenar de mayor a menor por la cantidad de cartas
  cartasData.sort((a, b) => b.cantidad - a.cantidad);

  cartasData.forEach((card) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${card.numero}</td>
    <td>${card.carta}</td>
    <td>${card.cantidad}</td>
  `;
    tableBody.appendChild(row);
  });
}