
  // Cargar datos desde el archivo JSON y guardarlos en localStorage
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("cartasData", JSON.stringify(data.data));
      renderTable();
    })
    .catch((error) => console.error("Error al cargar los datos:", error));

  const form = document.querySelector(".form-container"); // Ajustar el selector para el formulario
  const tableBody = document.querySelector("#tablaCartas table tbody"); // Ajustar el selector para la tabla
  const buttons = document.querySelectorAll(".card-container button"); // Ajustar el selector para los botones

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const numeroCarta = this.elements["numCarta"].value; // Ajustar el nombre del campo

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
      const numeroCarta = this.querySelector("img").getAttribute("alt"); // Obtener el número de carta desde el atributo alt de la imagen
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
