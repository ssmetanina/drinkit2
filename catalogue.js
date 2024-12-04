async function getResponse() {
    let originalContent = []; // Оригинальные данные
    let content = []; // Копия данных для работы

    // Загружаем данные
    const response = await fetch("catalogue.json");
    if (!response.ok) return;  // Возвращаемся, если ошибка

    originalContent = await response.json();
    content = [...originalContent];

    // Отображаем элементы по умолчанию
    displayContent(content);

    // Добавляем обработчик на выбор сортировки
    document.getElementById("sort-select").addEventListener("change", (event) => {
        const sortOrder = event.target.value;

        if (sortOrder === "default") {
            displayContent(originalContent);
        } else if (sortOrder === "asc") {
            displayContent([...originalContent].sort((a, b) => a.price - b.price));
        } else if (sortOrder === "desc") {
            displayContent([...originalContent].sort((a, b) => b.price - a.price));
        }
    });
}

// Функция для отображения данных
function displayContent(content) {
    const container = document.getElementById("node_for_insert");
    container.innerHTML = ""; // Очищаем контейнер

    let row = null;
    content.forEach((item, index) => {
        if (index % 3 === 0) {
            row = document.createElement("div");
            row.className = "row mb-4";
            container.appendChild(row);
        }

        const col = document.createElement("div");
        col.className = "col-lg-4 col-md-6 col-sm-12 mb-4";
        col.innerHTML = `
            <div class="card h-100">
                <img class="card-img-top" src="${item.img}" alt="${item.title}">
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

// Вызов функции
getResponse();
