(function() {
    console.log('Skrypt został załadowany i uruchomiony.');

    // ----------------------------------------
    // 1. Funkcja do skalowania elementu #base
    // ----------------------------------------
    (function scaleBaseElement() {
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

    // --------------------------------------------------
    // 2. Funkcja do tworzenia i dodawania struktur HTML
    // --------------------------------------------------
    (function createHTMLStructures() {
        const body = document.querySelector('body');

        // background-overlay-start
        const backgroundOverlayStart = document.createElement('div');
        backgroundOverlayStart.id = 'background-overlay-start';
        backgroundOverlayStart.className = 'background-overlay';
        body.appendChild(backgroundOverlayStart);

        // background-overlay-feedback
        const backgroundOverlayFeedback = document.createElement('div');
        backgroundOverlayFeedback.id = 'background-overlay-feedback';
        backgroundOverlayFeedback.className = 'background-overlay';
        backgroundOverlayFeedback.hidden = true;

        const feedbackContentBox = document.createElement('div');
        feedbackContentBox.className = 'content-box';

        const feedbackLeftColumn = document.createElement('div');
        feedbackLeftColumn.className = 'left-column';

        const feedbackArrow = document.createElement('img');
        feedbackArrow.src = 'https://1236554drs4231112876vccf4-pawel.s3.eu-north-1.amazonaws.com/ux-research_dashed-feedback-arrow.svg';
        feedbackArrow.alt = 'Feedback Arrow';
        feedbackLeftColumn.appendChild(feedbackArrow);

        const feedbackRightColumn = document.createElement('div');
        feedbackRightColumn.className = 'right-column';

        const feedbackIcon = document.createElement('img');
        feedbackIcon.className = 'feedback-icon';
        feedbackIcon.src = 'https://1236554drs4231112876vccf4-pawel.s3.eu-north-1.amazonaws.com/ux-research_task-completed-icon.svg';
        feedbackIcon.alt = 'Task Completed Icon';

        const feedbackAlert = document.createElement('h4');
        feedbackAlert.id = 'feedback-alert';
        feedbackAlert.textContent = 'Feedback Alert';

        const feedbackMessage = document.createElement('p');
        feedbackMessage.textContent = 'This is the feedback message inside the content box.';

        feedbackRightColumn.append(feedbackIcon, feedbackAlert, feedbackMessage);
        feedbackContentBox.append(feedbackLeftColumn, feedbackRightColumn);
        backgroundOverlayFeedback.appendChild(feedbackContentBox);
        body.appendChild(backgroundOverlayFeedback);

        // iframe-container
        const iframeContainer = document.createElement('div');
        iframeContainer.className = 'iframe-container';
        iframeContainer.id = 'iframe-container';
        iframeContainer.setAttribute('data-visible', 'true');

        const iframe = document.createElement('iframe');
        iframe.className = 'iframe';

        const iframeArrow = document.createElement('div');
        iframeArrow.id = 'iframe-arrow';
        iframeArrow.className = 'iframe-arrow';

        const iframeArrowImg = document.createElement('img');
        iframeArrowImg.src = 'https://1236554drs4231112876vccf4-pawel.s3.eu-north-1.amazonaws.com/ux-research_iframe-arrow.svg';
        iframeArrowImg.alt = 'Arrow';

        iframeArrow.appendChild(iframeArrowImg);
        iframeContainer.append(iframe, iframeArrow);
        body.appendChild(iframeContainer);

        // top-overlay
        const topOverlay = document.createElement('div');
        topOverlay.id = 'top-overlay';
        topOverlay.className = 'top-overlay';

        const topContentBox = document.createElement('div');
        topContentBox.className = 'content-box';

        const topLeftColumn = document.createElement('div');
        topLeftColumn.className = 'left-column';

        const dashedArrow = document.createElement('img');
        dashedArrow.src = 'https://1236554drs4231112876vccf4-pawel.s3.eu-north-1.amazonaws.com/ux-research_dashed-home-arrow.svg';
        dashedArrow.alt = 'Dashed Arrow';
        topLeftColumn.appendChild(dashedArrow);

        const topRightColumn = document.createElement('div');
        topRightColumn.className = 'right-column';

        const headerText = document.createElement('h4');
        headerText.textContent = 'Header Text';

        const paragraph = document.createElement('p');
        paragraph.textContent = 'This is a paragraph inside the content box.';

        const startButton = document.createElement('button');
        startButton.id = 'start-button';
        startButton.textContent = 'Click Me';

        topRightColumn.append(headerText, paragraph, startButton);
        topContentBox.append(topLeftColumn, topRightColumn);
        topOverlay.appendChild(topContentBox);
        body.appendChild(topOverlay);

        console.log('Struktury HTML zostały dodane do dokumentu.');
    })();

    // ----------------------------------------
    // 3. Oryginalny skrypt po nowych funkcjach
    // ----------------------------------------

    // Funkcja do pobierania parametrów URL
    function getURLParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Zmienna do przechowywania referencji do manipulowanego iframe
    let targetIframe = null;

    // Funkcja do manipulacji iframe
    function manipulateIframes() {
        console.log('Rozpoczynam manipulację iframe.');

        const trans_id = getURLParameter('trans_id');
        const survey = getURLParameter('survey');

        if (trans_id) {
            console.log('Znaleziono parametr trans_id:', trans_id);
        } else {
            console.log('Nie znaleziono parametru trans_id.');
        }

        if (!survey) {
            console.log('Nie znaleziono parametru survey.');
            return;
        }

        // Selektuj iframe z atrybutem data-label="tally-iframe"
        const iframe = document.querySelector('iframe[data-label="tally-iframe"]');

        if (iframe) {
            console.log('Znaleziono ramkę z data-label="tally-iframe":', iframe);
            const newSrc = survey + (survey.includes('?') ? '&' : '?') + 'user_id=' + encodeURIComponent(trans_id);
            iframe.setAttribute('src', newSrc);
            console.log('Zaktualizowano źródło ramki do:', newSrc);

            // Przechowaj referencję do tego iframe
            targetIframe = iframe;
        } else {
            console.log('Nie znaleziono iframe z data-label="tally-iframe".');
        }
    }

    // Funkcja do nasłuchiwania kliknięć
    function setupClickListener() {
        console.log('Nasłuchiwanie na kliknięcia...');

        // Dodaj nasłuchiwacz na kliknięcia
        document.addEventListener(
            'click',
            function(event) {
                var taskElement = event.target.closest('[data-label="task-completed"]');

                if (taskElement) {
                    console.log('Kliknięto element z data-label="task-completed":', taskElement);

                    if (targetIframe && targetIframe.contentWindow) {
                        // Wyślij wiadomość do iframe
                        targetIframe.contentWindow.postMessage(
                            { typ: 'klikniecie', dane: 'task-completed' }, // Przesyłane dane
                            'https://form.ux-research.eu' // Dokładny adres iframe
                        );
                        console.log('Wysłano wiadomość do iframe:', targetIframe);
                    } else {
                        console.log('Nie znaleziono docelowego iframe lub iframe nie jest dostępny.');
                    }
                } else {
                    console.log('Kliknięto element inny niż task-completed:', event.target);
                }
            },
            { passive: false }
        );
    }

    // Uruchom manipulację iframe natychmiast po załadowaniu skryptu
    manipulateIframes();

    // Uruchom nasłuchiwacza na kliknięcia
    setupClickListener();

})();
