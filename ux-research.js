(function() {
    console.log('Skrypt został załadowany i uruchomiony.');

    // ----------------------------------------
    // Zmienna do przechowywania referencji do manipulowanego iframe
    // ----------------------------------------
    let targetIframe = null;
    let iframeOrigin = null; // Zmienna do przechowywania origin iframe

    // ----------------------------------------
    // 5. Dodanie nasłuchiwacza na resize z debouncingiem 1000 ms
    // ----------------------------------------
    function setupResizeListener() {
        let resizeTimeout;

        window.addEventListener('resize', function() {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(() => {
                console.log('Wykryto zmianę rozmiaru okna. Reloadowanie strony.');
                window.location.reload();
            }, 1000); // Debounce 1000 ms
        });

        console.log('Nasłuchiwacz resize z debouncingiem 1000 ms został dodany.');
    }

    // Uruchom nasłuchiwacza na resize
    setupResizeListener();

    // ----------------------------------------
    // 0. Sprawdzenie szerokości okna
    // ----------------------------------------
    function checkWindowWidth() {
        const MIN_WIDTH = 1280;
        const currentWidth = window.innerWidth;

        if (currentWidth >= MIN_WIDTH) {
            console.log(`Szerokość okna (${currentWidth}px) jest większa lub równa ${MIN_WIDTH}px. Kontynuuję działanie skryptu.`);
            // Kontynuuj z istniejącą logiką skryptu
            initializeScript();
        } else {
            console.log(`Szerokość okna (${currentWidth}px) jest mniejsza niż ${MIN_WIDTH}px. Wyświetlam komunikat ostrzegawczy.`);
            // Usuwanie zawartości DOM tylko z body
            document.body.innerHTML = '';

            // Tworzenie kontenera na komunikat
            const body = document.querySelector('body');
            const alertContainer = document.createElement('div');
            alertContainer.className = 'window-size-alert-container'; // Opcjonalna klasa kontenera

            // Dodanie ikony
            const alertIcon = document.createElement('img');
            alertIcon.src = 'https://1236554drs4231112876vccf4-pawel.s3.eu-north-1.amazonaws.com/ux-research_window-size-alert-icon.svg';
            alertIcon.alt = 'Alert Icon';
            alertIcon.className = 'window-size-alert-icon';
            alertContainer.appendChild(alertIcon);

            // Dodanie komunikatu tekstowego
            const alertText = document.createElement('p');
            const difference = MIN_WIDTH - currentWidth;
            alertText.textContent = `Rozdzielczość okna musi wynosić minimum 1280 px na szerokość. Zmień urządzenie na większe lub rozszerz to okno o ${difference}px.`;
            alertText.className = 'window-size-alert-txt';
            alertContainer.appendChild(alertText);

            // Dodanie kontenera do body
            body.appendChild(alertContainer);

            // Informacja o dodaniu stylów w CSS
            console.log('Dodaj odpowiednie style do pliku CSS dla klas .window-size-alert-txt i .window-size-alert-icon.');
        }
    }

    // Uruchom sprawdzenie szerokości okna
    checkWindowWidth();

    // ----------------------------------------
    // 1. Funkcja do skalowania elementu #base
    // ----------------------------------------
    function scaleBaseElement() {
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

                // Ustawianie nowej szerokości body
                document.body.style.width = `${newBodyWidth}px`;

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
    }

    // --------------------------------------------------
    // 2. Funkcja do tworzenia i dodawania struktur HTML
    // --------------------------------------------------
    function createHTMLStructures() {
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
        iframe.id = 'survey-iframe'; // Dodano id "survey-iframe"

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
        dashedArrow.src = 'https://1236554drs4231112876vccf4-pawel.s3.eu-north-1.amazonaws.com/ux-research_dashed-start-arrow.svg';
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
    }

    // ------------------------------------------------------------------------
    // 3. Funkcja do dodawania nasłuchiwaczy i logiki zależnej od struktur
    // ------------------------------------------------------------------------
    function setupAdditionalEventListeners() {
        // Pobieranie elementów
        const startButton = document.getElementById('start-button');
        const topOverlay = document.getElementById('top-overlay');
        const iframeArrow = document.getElementById('iframe-arrow');
        const iframeArrowImg = iframeArrow ? iframeArrow.querySelector('img') : null;
        const iframeContainer = document.getElementById('iframe-container');
        const backgroundOverlayStart = document.getElementById('background-overlay-start');
        const backgroundOverlayFeedback = document.getElementById('background-overlay-feedback');

        // Sprawdzenie, czy wszystkie elementy zostały poprawnie znalezione
        if (!startButton || !topOverlay || !iframeArrow || !iframeArrowImg || !iframeContainer || !backgroundOverlayStart || !backgroundOverlayFeedback) {
            console.warn('Niektóre elementy wymagane do nasłuchiwaczy nie zostały znalezione.');
            return;
        }

        // Funkcja uruchamiająca animację shake
        function triggerShake() {
            startButton.classList.add('shake');
            setTimeout(() => {
                startButton.classList.remove('shake');
            }, 500);
        }

        // Funkcja do ukrywania iframe-arrow z animacją fade
        function hideIframeArrow() {
            iframeArrow.classList.add('hidden-fade');
        }

        // Funkcja do pokazywania iframe-arrow z animacją fade
        function showIframeArrow() {
            iframeArrow.classList.remove('hidden-fade');
        }

        // Ukrycie top-overlay po kliknięciu w button i ukrycie background-overlay-start
        startButton.addEventListener('click', () => {
            topOverlay.style.display = 'none';
            backgroundOverlayStart.setAttribute('hidden', 'true');
            console.log('Top overlay i background-overlay-start zostały ukryte.');

            // 1. Zmiana opacity elementów z klasą .iframe na 100%
            const iframes = document.querySelectorAll('.iframe');
            iframes.forEach(iframe => {
                iframe.style.opacity = '1'; // Ustawienie opacity na 100%
                console.log(`Ustawiono opacity na 100% dla iframe:`, iframe);
            });

            // 2. Wysłanie wiadomości do iframe o kliknięciu start-button
            if (targetIframe && targetIframe.contentWindow && iframeOrigin) {
                const message = { typ: 'startButtonClicked', dane: 'start-button' };
                targetIframe.contentWindow.postMessage(message, iframeOrigin); // Użycie przechowywanego origin
                console.log('Wysłano wiadomość do iframe:', message);
            } else {
                console.warn('Nie znaleziono docelowego iframe, iframe nie jest dostępny lub origin nie jest znane.');
            }
        });

        // Obsługa kliknięcia na iframe-arrow
        iframeArrow.addEventListener('click', () => {
            const isVisible = iframeContainer.getAttribute('data-visible') === 'true';

            if (isVisible) {
                iframeContainer.classList.add('hidden');
                iframeArrowImg.classList.add('rotated');
                iframeContainer.setAttribute('data-visible', 'false');
                console.log('Iframe container został ukryty.');
            } else {
                iframeContainer.classList.remove('hidden');
                iframeArrowImg.classList.remove('rotated');
                iframeContainer.setAttribute('data-visible', 'true');
                console.log('Iframe container został pokazany.');
            }
        });

        // Nasłuch kliknięcia na top-overlay
        topOverlay.addEventListener('click', (event) => {
            if (!event.target.closest('#start-button')) {
                triggerShake();
                console.log('Kliknięto poza start-button, wywołano animację shake.');
            }
        });

        // Funkcja obsługująca zmiany atrybutu hidden na background-overlay-feedback
        function handleBackgroundOverlayFeedbackChange(mutationsList) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'hidden') {
                    const isHidden = backgroundOverlayFeedback.hasAttribute('hidden');

                    if (!isHidden) {
                        // background-overlay-feedback stało się widoczne
                        hideIframeArrow();
                        console.log('background-overlay-feedback stało się widoczne, ukryto iframe-arrow.');

                        // Sprawdzenie, czy iframe-container jest schowany
                        const isIframeHidden = iframeContainer.classList.contains('hidden') || iframeContainer.getAttribute('data-visible') === 'false';

                        if (isIframeHidden) {
                            // Wyzwalanie kliknięcia na iframe-arrow, aby pokazać iframe-container
                            // Używamy setTimeout, aby upewnić się, że fade-out animacja się wykona
                            setTimeout(() => {
                                iframeArrow.click();
                                console.log('Wywołano kliknięcie na iframe-arrow, aby pokazać iframe-container.');
                            }, 200); // Czas trwania fade-out w CSS
                        }
                    } else {
                        // background-overlay-feedback zostało ukryte
                        showIframeArrow();
                        console.log('background-overlay-feedback zostało ukryte, pokazano iframe-arrow.');
                    }
                }
            }
        }

        // Inicjalizacja MutationObserver
        const observer = new MutationObserver(handleBackgroundOverlayFeedbackChange);

        // Konfiguracja obserwatora do monitorowania atrybutów
        observer.observe(backgroundOverlayFeedback, { attributes: true });

        console.log('Dodatkowe nasłuchiwacze i logika zostały skonfigurowane.');
    }

    // ----------------------------------------
    // 4. Oryginalny skrypt po nowych funkcjach
    // ----------------------------------------

    // Funkcja do pobierania parametrów URL
    function getURLParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Funkcja do manipulacji iframe
    function manipulateIframes() {
        console.log('Rozpoczynam manipulację iframe.');

        const id = getURLParameter('id'); // Zmieniono 'trans_id' na 'id'
        const survey = getURLParameter('survey');

        if (id) {
            console.log('Znaleziono parametr id:', id);
        } else {
            console.log('Nie znaleziono parametru id.');
        }

        if (!survey) {
            console.log('Nie znaleziono parametru survey.');
            return;
        }

        // Zmieniono selektor iframe na id "survey-iframe"
        const iframe = document.getElementById('survey-iframe');

        if (iframe) {
            console.log('Znaleziono ramkę z id="survey-iframe":', iframe);
            const newSrc = survey + (survey.includes('?') ? '&' : '?') + 'user_id=' + encodeURIComponent(id);
            iframe.setAttribute('src', newSrc);
            console.log('Zaktualizowano źródło ramki do:', newSrc);

            // Przechowaj referencję do tego iframe
            targetIframe = iframe;

            // Ustal origin iframe na podstawie nowego src
            try {
                const surveyURL = new URL(newSrc);
                iframeOrigin = surveyURL.origin;
                console.log('Zdefiniowano origin iframe jako:', iframeOrigin);
            } catch (error) {
                console.error('Błąd podczas parsowania URL survey:', error);
            }
        } else {
            console.log('Nie znaleziono iframe z id="survey-iframe".');
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

                    if (targetIframe && targetIframe.contentWindow && iframeOrigin) {
                        // Dodatkowa logika - usunięcie atrybutu 'hidden' z 'background-overlay-feedback'
                        const backgroundOverlayFeedback = document.getElementById('background-overlay-feedback');
                        if (backgroundOverlayFeedback) {
                            backgroundOverlayFeedback.removeAttribute('hidden');
                            console.log('Usunięto atrybut "hidden" z elementu #background-overlay-feedback.');
                        } else {
                            console.warn('Nie znaleziono elementu #background-overlay-feedback.');
                        }

                        // Wyślij wiadomość do iframe
                        targetIframe.contentWindow.postMessage(
                            { typ: 'klikniecie', dane: 'task-completed' }, // Przesyłane dane
                            iframeOrigin // Dokładny adres iframe
                        );
                        console.log('Wysłano wiadomość do iframe:', { typ: 'klikniecie', dane: 'task-completed' });
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

    // ----------------------------------------
    // 6. Dodanie nasłuchiwacza wiadomości od iframe
    // ----------------------------------------
    function setupMessageListener() {
        window.addEventListener('message', function(event) {
            // Sprawdzenie, czy wiadomość pochodzi z zaufanego origin
            if (event.origin !== iframeOrigin) {
                console.info('Nieautoryzowany nadawca:', event.origin);
                return;
            }

            console.log('Otrzymano wiadomość z iframe:', event.data);

            // Sprawdzenie typu wiadomości
            if (event.data.typ === 'nextButtonClicked') {
                console.log('Otrzymano wiadomość typu "nextButtonClicked"');

                const backgroundOverlayFeedback = document.getElementById('background-overlay-feedback');
                if (backgroundOverlayFeedback) {
                    if (!backgroundOverlayFeedback.hasAttribute('hidden')) {
                        backgroundOverlayFeedback.setAttribute('hidden', 'true');
                        console.log('Dodano atrybut "hidden" do #background-overlay-feedback.');
                    } else {
                        console.log('#background-overlay-feedback już posiada atrybut "hidden".');
                    }
                } else {
                    console.warn('Nie znaleziono elementu #background-overlay-feedback.');
                }
            }

            // Możesz dodać więcej warunków obsługi innych typów wiadomości tutaj
        });
    }

    // ----------------------------------------
    // Inicjalizacja całego skryptu
    // ----------------------------------------
    function initializeScript() {
        // Tworzenie struktur HTML
        createHTMLStructures();

        // Skalowanie elementu #base
        scaleBaseElement();

        // Dodawanie nasłuchiwaczy i logiki zależnej od struktur
        setupAdditionalEventListeners();

        // Uruchom manipulację iframe natychmiast po załadowaniu skryptu
        manipulateIframes();

        // Uruchom nasłuchiwacza na kliknięcia
        setupClickListener();

        // Dodaj nasłuchiwacza wiadomości od iframe
        setupMessageListener();
    }

})();
