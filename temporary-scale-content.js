(() => {
    let maxBottom = 0; // Największa dolna granica
    let lowestElement = null; // Element, który jest najniżej

    // Pobieramy wszystkie elementy na stronie
    const elements = document.querySelectorAll("*");

    elements.forEach(element => {
        // Pobieramy pozycję elementu w przestrzeni widoku
        const rect = element.getBoundingClientRect();

        // Obliczamy dolną pozycję elementu w odniesieniu do dokumentu
        const elementBottom = rect.bottom + window.scrollY;

        // Jeśli element jest niżej niż dotychczasowy rekord, aktualizujemy
        if (elementBottom > maxBottom) {
            maxBottom = elementBottom;
            lowestElement = element;
        }
    });

    // Pobieramy wysokość i szerokość body
    const bodyHeight = document.body.offsetHeight;
    const bodyWidth = document.body.offsetWidth;

    console.log(`Najniższa dolna granica elementu: ${maxBottom}px`);
    console.log(`Wysokość body: ${bodyHeight}px`);
    console.log(`Szerokość body: ${bodyWidth}px`);

    if (maxBottom > bodyHeight) {
        // Obliczamy wymagany współczynnik skalowania
        const scale = bodyHeight / maxBottom;

        console.log(`Skalowanie wymagane: ${scale}`);

        // Dodajemy skalowanie do elementu o id 'base'
        const baseElement = document.getElementById("base");

        if (baseElement) {
            // Ustawienie punktu transformacji na środek w poziomie i góra w pionie
            baseElement.style.transformOrigin = "center top";
            baseElement.style.transform = `scale(${scale})`;

            // Obliczamy nową szerokość body po skalowaniu
            const newBodyWidth = bodyWidth * scale;

            // Dodajemy styl wymuszający nową szerokość body
            const styleTag = document.createElement("style");
            styleTag.innerHTML = `
                body {
                    width: ${newBodyWidth}px !important;
                }
            `;
            document.head.appendChild(styleTag);

            // Dodanie klasy (jeśli potrzebne)
            baseElement.classList.add("scale");

            console.log(`Dodano skalowanie do elementu #base z wartością ${scale}`);
            console.log(`Nowa szerokość body: ${newBodyWidth}px`);
        } else {
            console.warn("Nie znaleziono elementu o id 'base'.");
        }
    } else {
        console.log("Nie trzeba skalować strony, najniższy element mieści się w body.");
    }
})();
