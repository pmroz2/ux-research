(function() {
    console.log('Skrypt został załadowany i uruchomiony.');

    let targetIframe = null;
    let iframeOrigin = null;

    function positionWrapper(x, y) {
        const offset = 60;
        const floatingWrapper = document.getElementById("floatingWrapper");
        if (floatingWrapper) {
            floatingWrapper.style.top = `${y - offset}px`;
            floatingWrapper.style.left = `${x}px`;
        }
    }

    function followCursor(e) {
        positionWrapper(e.clientX, e.clientY);
    }

    function setupResizeListener() {
        let resizeTimeout;
        window.addEventListener('resize', function() {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
                console.log('Resetowanie timeoutu resize.');
            }
            resizeTimeout = setTimeout(() => {
                console.log('Wykryto zmianę rozmiaru okna. Reloadowanie strony.');
                window.location.reload();
            }, 1000);
        });

        console.log('Nasłuchiwacz resize z debouncingiem 1000 ms został dodany.');
    }

    setupResizeListener();

    function checkWindowWidth() {
        const MIN_WIDTH = 1280;
        const currentWidth = window.innerWidth;

        console.log(`Sprawdzanie szerokości okna: ${currentWidth}px`);

        if (currentWidth >= MIN_WIDTH) {
            console.log(`Szerokość okna (${currentWidth}px) jest większa lub równa ${MIN_WIDTH}px.`);
            initializeScript();
        } else {
            console.log(`Szerokość okna (${currentWidth}px) jest mniejsza niż ${MIN_WIDTH}px.`);

            document.body.innerHTML = '';
            const body = document.querySelector('body');
            const alertContainer = document.createElement('div');
            alertContainer.className = 'window-size-alert-container';

            const alertIcon = document.createElement('img');
            alertIcon.src = 'https://1236554drs4231112876vccf4-pawel.s3.eu-north-1.amazonaws.com/ux-research_window-size-alert-icon.svg';
            alertIcon.alt = 'Alert Icon';
            alertIcon.className = 'window-size-alert-icon';
            alertContainer.appendChild(alertIcon);

            const alertText = document.createElement('p');
            const difference = MIN_WIDTH - currentWidth;
            alertText.textContent = `Rozdzielczość okna musi wynosić minimum 1280 px na szerokość. Zmień urządzenie na większe lub rozszerz to okno o ${difference}px.`;
            alertText.className = 'window-size-alert-txt';
            alertContainer.appendChild(alertText);

            body.appendChild(alertContainer);

            console.log('Dodaj odpowiednie style do pliku CSS dla klas .window-size-alert-txt i .window-size-alert-icon.');
        }
    }

    checkWindowWidth();

    function scaleBaseElement() {
        let maxBottom = 0; 
        let lowestElement = null; 
        const elements = document.querySelectorAll("*");

        console.log(`Znaleziono ${elements.length} elementów do analizy skalowania.`);

        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementBottom = rect.bottom + window.scrollY;
            if (elementBottom > maxBottom) {
                maxBottom = elementBottom;
                lowestElement = element;
                console.log(`Nowy najniższy element: ${element.tagName} z dolną pozycją ${elementBottom}px`);
            }
        });

        const bodyHeight = document.body.offsetHeight;
        const bodyWidth = document.body.offsetWidth;

        console.log(`Najniższa dolna granica elementu: ${maxBottom}px`);
        console.log(`Wysokość body: ${bodyHeight}px`);
        console.log(`Szerokość body: ${bodyWidth}px`);

        if (maxBottom > bodyHeight) {
            const scale = bodyHeight / maxBottom;
            console.log(`Skalowanie wymagane: ${scale}`);
            const baseElement = document.getElementById("base");

            if (baseElement) {
                baseElement.style.transformOrigin = "center top";
                baseElement.style.transform = `scale(${scale})`;

                const newBodyWidth = bodyWidth * scale;
                document.body.style.width = `${newBodyWidth}px`;
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

    function createHTMLStructures() {
        const body = document.querySelector('body');
        console.log('Tworzenie struktur HTML.');

        const checkOverlay = document.createElement('div');
        checkOverlay.id = 'checkOverlay';
        console.log('Tworzenie #checkOverlay.');

        const floatingWrapper = document.createElement('div');
        floatingWrapper.id = 'floatingWrapper';
        console.log('Tworzenie #floatingWrapper.');

        const successCheckmark = document.createElement('div');
        successCheckmark.className = 'success-checkmark';
        console.log('Tworzenie .success-checkmark.');

        const checkIcon = document.createElement('div');
        checkIcon.className = 'check-icon';
        console.log('Tworzenie .check-icon.');

        const iconLineTip = document.createElement('span');
        iconLineTip.className = 'icon-line line-tip';
        checkIcon.appendChild(iconLineTip);

        const iconLineLong = document.createElement('span');
        iconLineLong.className = 'icon-line line-long';
        checkIcon.appendChild(iconLineLong);

        const iconCircle = document.createElement('div');
        iconCircle.className = 'icon-circle';
        checkIcon.appendChild(iconCircle);

        const iconFix = document.createElement('div');
        iconFix.className = 'icon-fix';
        checkIcon.appendChild(iconFix);

        successCheckmark.appendChild(checkIcon);
        floatingWrapper.appendChild(successCheckmark);
        checkOverlay.appendChild(floatingWrapper);

        const loaderBox = document.createElement('div');
        loaderBox.id = 'loaderBox';
        loaderBox.className = 'loader-box-hide';

        const loaderImg = document.createElement('img');
        loaderImg.src = 'https://1236554drs4231112876vccf4-pawel.s3.eu-north-1.amazonaws.com/trans-loader.gif';
        loaderImg.alt = 'Loading';
        loaderBox.appendChild(loaderImg);

        checkOverlay.appendChild(loaderBox);
        body.appendChild(checkOverlay);

        const backgroundOverlayStart = document.createElement('div');
        backgroundOverlayStart.id = 'background-overlay-start';
        backgroundOverlayStart.className = 'background-overlay'; 
        // Domyślnie widoczny (opacity:1; display:block w CSS)
        body.appendChild(backgroundOverlayStart);

        const backgroundOverlayFeedback = document.createElement('div');
        backgroundOverlayFeedback.id = 'background-overlay-feedback';
        backgroundOverlayFeedback.className = 'background-overlay hidden';
        // Ukrywamy go na starcie:
        backgroundOverlayFeedback.style.display = 'none'; 

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

        const iframeContainer = document.createElement('div');
        iframeContainer.className = 'iframe-container';
        iframeContainer.id = 'iframe-container';
        iframeContainer.setAttribute('data-visible', 'true');

        const iframe = document.createElement('iframe');
        iframe.className = 'iframe';
        iframe.id = 'survey-iframe';

        const iframeArrow = document.createElement('div');
        iframeArrow.id = 'iframe-arrow';
        iframeArrow.className = 'iframe-arrow';

        const iframeArrowImg = document.createElement('img');
        iframeArrowImg.src = 'https://1236554drs4231112876vccf4-pawel.s3.eu-north-1.amazonaws.com/ux-research_iframe-arrow.svg';
        iframeArrowImg.alt = 'Arrow';
        iframeArrow.appendChild(iframeArrowImg);

        iframeContainer.append(iframe, iframeArrow);
        body.appendChild(iframeContainer);

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

    function hideOverlay(overlay) {
        if (!overlay) return;
        overlay.classList.add('hidden');
        // Po zakończeniu animacji:
        const onTransitionEnd = function() {
            overlay.removeEventListener('transitionend', onTransitionEnd);
            if (overlay.classList.contains('hidden')) {
                overlay.style.display = 'none';
            }
        };
        overlay.addEventListener('transitionend', onTransitionEnd);
    }

    function showOverlay(overlay) {
        if (!overlay) return;
        // Pokazywanie - najpierw display:block, a potem usuwamy hidden, by animować opacity:
        overlay.style.display = 'block';
        requestAnimationFrame(() => {
            overlay.classList.remove('hidden');
        });
    }

    function setupAdditionalEventListeners() {
        console.log('Konfiguracja dodatkowych nasłuchiwaczy.');

        const startButton = document.getElementById('start-button');
        const topOverlay = document.getElementById('top-overlay');
        const iframeArrow = document.getElementById('iframe-arrow');
        const iframeArrowImg = iframeArrow ? iframeArrow.querySelector('img') : null;
        const iframeContainer = document.getElementById('iframe-container');
        const backgroundOverlayStart = document.getElementById('background-overlay-start');
        const backgroundOverlayFeedback = document.getElementById('background-overlay-feedback');

        if (!startButton || !topOverlay || !iframeArrow || !iframeArrowImg || !iframeContainer || !backgroundOverlayStart || !backgroundOverlayFeedback) {
            console.warn('Niektóre elementy wymagane do nasłuchiwaczy nie zostały znalezione.');
            return;
        }

        function triggerShake() {
            console.log('Wywołanie animacji shake na startButton.');
            startButton.classList.add('shake');
            setTimeout(() => {
                startButton.classList.remove('shake');
            }, 500);
        }

        function hideIframeArrow() {
            console.log('Ukrywanie iframe-arrow z animacją fade.');
            iframeArrow.classList.add('hidden-fade');
        }

        function showIframeArrow() {
            console.log('Pokazywanie iframe-arrow z animacją fade.');
            iframeArrow.classList.remove('hidden-fade');
        }

        startButton.addEventListener('click', () => {
            console.log('Kliknięto startButton.');
            topOverlay.style.display = 'none';
            // Ukryj backgroundOverlayStart
            hideOverlay(backgroundOverlayStart);
            if (targetIframe && targetIframe.contentWindow && iframeOrigin) {
                const message = { typ: 'startButtonClicked', dane: 'start-button' };
                targetIframe.contentWindow.postMessage(message, iframeOrigin);
                console.log('Wysłano wiadomość do iframe:', message);
            } else {
                console.warn('Nie znaleziono docelowego iframe lub brak origin.');
            }
        });

        iframeArrow.addEventListener('click', () => {
            console.log('Kliknięto iframe-arrow.');
            const isVisible = iframeContainer.getAttribute('data-visible') === 'true';
            console.log(`Aktualna widoczność iframeContainer: ${isVisible}`);
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

        topOverlay.addEventListener('click', (event) => {
            if (!event.target.closest('#start-button')) {
                console.log('Kliknięto poza start-button.');
                triggerShake();
            } else {
                console.log('Kliknięto start-button w top-overlay.');
            }
        });

        backgroundOverlayFeedback.addEventListener('transitionend', () => {
            const isHidden = backgroundOverlayFeedback.classList.contains('hidden');
            console.log(`background-overlay-feedback jest teraz ${isHidden ? 'niewidoczny' : 'widoczny'}.`);
            if (!isHidden) {
                // feedback stał się widoczny
                hideIframeArrow();
                const isIframeHidden = iframeContainer.classList.contains('hidden') || iframeContainer.getAttribute('data-visible') === 'false';
                if (isIframeHidden) {
                    setTimeout(() => {
                        console.log('Wywołano kliknięcie na iframe-arrow z setTimeout.');
                        iframeArrow.click();
                    }, 200);
                }
            } else {
                // feedback stał się niewidoczny
                showIframeArrow();
            }
        });
    }

    function getURLParameter(name) {
        console.log(`Pobieranie parametru URL: ${name}`);
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        const param = results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        console.log(`Znaleziony parametr ${name}: ${param}`);
        return param;
    }

    function manipulateIframes() {
        console.log('Rozpoczynam manipulację iframe.');

        const id = getURLParameter('id');
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

        const iframe = document.getElementById('survey-iframe');
        if (iframe) {
            console.log('Znaleziono ramkę z id="survey-iframe":', iframe);
            const newSrc = survey + (survey.includes('?') ? '&' : '?') + 'user_id=' + encodeURIComponent(id);
            iframe.setAttribute('src', newSrc);
            console.log('Zaktualizowano źródło ramki do:', newSrc);

            targetIframe = iframe;
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

    function setupClickListener() {
        console.log('Nasłuchiwanie na kliknięcia...');
        document.addEventListener(
            'click',
            function(event) {
                console.log('Wykryto kliknięcie:', event.target);
                var taskElement = event.target.closest('[data-label="task-completed"]');

                if (taskElement) {
                    console.log('Kliknięto element z data-label="task-completed":', taskElement);

                    const checkOverlay = document.getElementById("checkOverlay");
                    const floatingWrapper = document.getElementById("floatingWrapper");
                    const loaderBox = document.getElementById("loaderBox");
                    const iframeContainer = document.getElementById('iframe-container');

                    if (checkOverlay && floatingWrapper && loaderBox && iframeContainer) {
                        // Wyświetl checkOverlay
                        checkOverlay.style.display = "flex";

                        // Pozycjonowanie wrappera względem aktualnego kliknięcia
                        positionWrapper(event.clientX, event.clientY);

                        // Pokaż floatingWrapper z animacją
                        floatingWrapper.classList.remove("floating-wrapper-hide");
                        floatingWrapper.style.display = "flex";
                        floatingWrapper.classList.add("floating-wrapper-show");

                        // Sprawdź widoczność iframeContainer
                        const isIframeVisible = iframeContainer.getAttribute('data-visible') === 'true';

                        if (isIframeVisible) {
                            loaderBox.classList.remove("loader-box-hide");
                            loaderBox.classList.add("loader-box-show");
                        } else {
                            loaderBox.classList.remove("loader-box-show");
                            loaderBox.classList.add("loader-box-hide");
                        }

                        document.addEventListener("mousemove", followCursor);
                    } else {
                        console.warn("Brak elementów do wyświetlenia (checkOverlay, floatingWrapper, loaderBox, iframeContainer).");
                    }

                    setTimeout(() => {
                        if (targetIframe && targetIframe.contentWindow && iframeOrigin) {
                            targetIframe.contentWindow.postMessage(
                                { typ: 'klikniecie', dane: 'task-completed' },
                                iframeOrigin
                            );
                            console.log('Wysłano wiadomość do iframe (po 1s):', { typ: 'klikniecie', dane: 'task-completed' });
                        } else {
                            console.log('Nie znaleziono docelowego iframe lub brak origin.');
                        }
                    }, 1000);
                } else {
                    console.log('Kliknięto element inny niż task-completed:', event.target);
                }
            },
            { passive: false }
        );

        console.log('Nasłuchiwacz na kliknięcia został dodany.');
    }

    function setupMessageListener() {
        console.log('Dodawanie nasłuchiwacza wiadomości od iframe.');

        window.addEventListener('message', function(event) {
            console.log('Otrzymano wiadomość:', event.data);
            console.log('event.origin:', event.origin);
            console.log('Oczekiwany iframeOrigin:', iframeOrigin);

            if (event.origin !== iframeOrigin) {
                console.info('Nieautoryzowany nadawca:', event.origin);
                return;
            }

            console.log('Wiadomość pochodzi z zaufanego origin.');

            const backgroundOverlayFeedback = document.getElementById('background-overlay-feedback');
            const checkOverlay = document.getElementById("checkOverlay");
            const floatingWrapper = document.getElementById("floatingWrapper");
            const loaderBox = document.getElementById("loaderBox");

            if (event.data.typ === 'nextButton') {
                console.log('Otrzymano wiadomość typu "nextButton"');
                if (backgroundOverlayFeedback && !backgroundOverlayFeedback.classList.contains('hidden')) {
                    // Schowaj overlay feedback
                    hideOverlay(backgroundOverlayFeedback);
                } else {
                    console.log('#background-overlay-feedback jest już ukryty lub nie znaleziony.');
                }

            } else if (event.data.typ === 'showFeedbackOverlay') {
                console.log('Otrzymano wiadomość typu "showFeedbackOverlay"');
                
                setTimeout(() => {
                    if (checkOverlay && floatingWrapper && loaderBox) {
                        // Ukrywanie floatingWrapper
                        floatingWrapper.classList.remove("floating-wrapper-show");
                        floatingWrapper.classList.add("floating-wrapper-hide");

                        // Ukrywanie loaderBox
                        loaderBox.classList.remove("loader-box-show");
                        loaderBox.classList.add("loader-box-hide");

                        setTimeout(() => {
                            floatingWrapper.style.display = "none";
                            floatingWrapper.classList.remove("floating-wrapper-hide");
                            checkOverlay.style.display = "none";

                            document.removeEventListener("mousemove", followCursor);

                            // Pokaż feedback overlay
                            if (backgroundOverlayFeedback) {
                                showOverlay(backgroundOverlayFeedback);
                                console.log('Pokazano #background-overlay-feedback po ukryciu elementów.');
                            }
                        }, 200);
                    } else {
                        console.warn("Brak niezbędnych elementów do ukrycia (checkOverlay, floatingWrapper, loaderBox).");
                    }
                }, 2000);
            } else {
                console.log('Otrzymano wiadomość innego typu:', event.data.typ);
            }
        });

        console.log('Nasłuchiwacz wiadomości od iframe został dodany.');
    }

    function initializeScript() {
        console.log('Inicjalizacja skryptu.');
        createHTMLStructures();

        const checkOverlay = document.getElementById('checkOverlay');
        if (checkOverlay) {
            checkOverlay.style.display = "none";
        }

        scaleBaseElement();
        setupAdditionalEventListeners();
        manipulateIframes();
        setupClickListener();
        setupMessageListener();
        console.log('Skrypt został zainicjalizowany.');
    }

})();
