async function getResponse() {
    let content = []; //массив данных из JSON

    try {
        let response = await fetch("catalogue.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        content = await response.json();
        console.log("Original content:\n", content);

        //по умолчанию: отображаем первые 9 элементов без сортировки
        updateDisplay(content);
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }

    //обработчик для изменения сортировки
    document.getElementById("sort-select").addEventListener("change", (event) => {
        const sortOrder = event.target.value; //получаем выбранное значение
        sortAndDisplay(content, sortOrder);
    });
}

//функция сортировки и обновления отображения
function sortAndDisplay(content, sortOrder) {
    //сортировка массива
    content.sort((a, b) => {
        if (sortOrder === "asc") {
            return a.price - b.price; //от меньшей к большей
        } else if (sortOrder === "desc") {
            return b.price - a.price; //от большей к меньшей
        }
        return 0; //без изменений
    });

    //отображаем первые 9 элементов
    updateDisplay(content.slice(0, 9));
}

//функция для отображения данных
function updateDisplay(content) {
    const node_for_insert = document.getElementById("node_for_insert");
    node_for_insert.innerHTML = ""; //очищаем содержимое

    let row = null;
    content.forEach((item, index) => {
        if (index % 3 === 0) {
            row = document.createElement("div");
            row.className = "row mb-4";
            node_for_insert.appendChild(row);
        }

        const col = document.createElement("div");
        col.className = "col-lg-4 col-md-6 col-sm-12 mb-4";
        col.innerHTML = `
            <div class="card h-100">
                <img class="card-img-top fluid" src="${item.img}" alt="${item.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text price-text">
                        <span>Цена:</span>
                        <strong>${item.price} р.</strong>
                    </p>
                    <input type="hidden" name="vendor_code" value="${item.vendor_code}">
                    <input class="form-control w-50 d-inline-block" type="number" name="amount" value="0">
                </div>
            </div>
        `;
        row.appendChild(col);
    });
}

//вызов функции
getResponse();