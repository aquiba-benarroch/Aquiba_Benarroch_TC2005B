document.addEventListener("DOMContentLoaded", () => {
    // ====================== EJERCICIO 1 ======================
    const mousePositionParagraph = document.getElementById("mousePosition");
    if (mousePositionParagraph) {
        document.addEventListener("mousemove", (event) => {
            const x = event.pageX;
            const y = event.pageY;
            mousePositionParagraph.textContent = `Posición del mouse: X=${x}, Y=${y}`;
        });
    }

    // ====================== EJERCICIO 2 ======================
    const form1 = document.getElementById("form1");
    if (form1) {
        form1.addEventListener("submit", (event) => {
            event.preventDefault();
            const fname = document.getElementById("form-fname").value;
            const lname = document.getElementById("form-lname").value;

            const fullNameParagraph = document.createElement("p");
            fullNameParagraph.textContent = `Nombre completo: ${fname} ${lname}`;

            const submitButton = document.getElementById("form1-submit");
            submitButton.insertAdjacentElement("afterend", fullNameParagraph);
        });
    }

    // ====================== EJERCICIO 3 ======================
    const btnInsertRow = document.getElementById("btn-insert-r");
    const btnInsertCol = document.getElementById("btn-insert-c");
    const sampleTable = document.getElementById("sampleTable");

    if (btnInsertRow && sampleTable) {
        btnInsertRow.addEventListener("click", () => {
            const rowCount = sampleTable.rows.length;
            const colCount = sampleTable.rows[0].cells.length;
            const newRow = sampleTable.insertRow();
            for (let i = 0; i < colCount; i++) {
                const newCell = newRow.insertCell(i);
                newCell.textContent = `Row ${rowCount + 1} column ${i + 1}`;
            }
        });
    }

    if (btnInsertCol && sampleTable) {
        btnInsertCol.addEventListener("click", () => {
            for (let row of sampleTable.rows) {
                const newCell = row.insertCell();
                newCell.textContent = `Row ${row.rowIndex + 1} column ${row.cells.length}`;
            }
        });
    }

    // ====================== EJERCICIO 4 ======================
    const btnChange = document.getElementById("btn-change");
    const myTable = document.getElementById("myTable");

    if (btnChange && myTable) {
        btnChange.addEventListener("click", () => {
            const rowIndex = parseInt(document.getElementById("rowIndex").value);
            const colIndex = parseInt(document.getElementById("colIndex").value);
            const newValue = document.getElementById("newValue").value;

            const row = myTable.rows[rowIndex];
            if (row && row.cells[colIndex]) {
                row.cells[colIndex].textContent = newValue;
            } else {
                alert("Fila o columna inválida.");
            }
        });
    }

    // ====================== EJERCICIO 5 ======================
    const colorSelect = document.getElementById("colorSelect");
    const btnAddColor = document.getElementById("btn-add-color");
    const btnRmvColor = document.getElementById("btn-rmv-color");

    function randomHexColor() {
        return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
    }

    if (colorSelect && btnAddColor) {
        btnAddColor.addEventListener("click", () => {
            const newColor = randomHexColor();
            const option = document.createElement("option");
            option.text = newColor;
            colorSelect.add(option);
        });
    }

    if (colorSelect && btnRmvColor) {
        btnRmvColor.addEventListener("click", () => {
            if (colorSelect.selectedIndex >= 0) {
                colorSelect.remove(colorSelect.selectedIndex);
            }
        });
    }

    // ====================== EJERCICIO 6 ======================
    const imagenGato = document.getElementById("imagenGato");

    if (imagenGato) {
        imagenGato.addEventListener("mouseenter", () => {
            const randomWidth = Math.floor(Math.random() * 301) + 300;
            const randomHeight = Math.floor(Math.random() * 301) + 300;
            imagenGato.src = `http://placekitten.com/${randomWidth}/${randomHeight}`;
        });
    }

    console.log("Script cargado correctamente. Todos los ejercicios están habilitados si los elementos existen.");
});