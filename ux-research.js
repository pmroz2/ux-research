(function() {
    // Funkcja główna, inicjuje skrypt
    console.log('Skrypt został załadowany i uruchomiony.');

    let targetIframe = null;
    let iframeOrigin = null;

    // Funkcja dodająca modal z informacjami prawnymi na samej górze HTML-a
    function createLegalModal() {
        // Wrapper modala – tło modala
        const legalModalWrapper = document.createElement('div');
        legalModalWrapper.id = "legal-modal-wrapper";
        // Ustawienie początkowych właściwości do animacji
        legalModalWrapper.style.display = "none";
        legalModalWrapper.style.opacity = "0";
        legalModalWrapper.style.transition = "opacity 300ms ease";
        
        // Główny kontener modala (treść)
        const legalModal = document.createElement('div');
        legalModal.id = "legal-modal";

        // Nagłówek modala – dodajemy dwa nagłówki h1
        const legalModalHeader = document.createElement('div');
        legalModalHeader.id = "legal-modal-header";

        const rodoHeading = document.createElement('h1');
        rodoHeading.id = "legal-modal-rodo-heading";
        rodoHeading.textContent = "Obowiązek informacyjny RODO";
        legalModalHeader.appendChild(rodoHeading);

        const otherHeading = document.createElement('h1');
        otherHeading.id = "legal-modal-other-heading";
        otherHeading.textContent = "Informacje prawne";
        legalModalHeader.appendChild(otherHeading);

        // Przycisk zamknięcia modala
        const legalModalCloseButton = document.createElement('div');
        legalModalCloseButton.id = "legal-modal-close-button";
        const closeImg = document.createElement('img');
        closeImg.src = 'https://1236554drs4231112876vccf4-pawel.s3.eu-north-1.amazonaws.com/ux-research_close-icon.svg';
        closeImg.alt = 'Close';
        legalModalCloseButton.appendChild(closeImg);
        legalModalHeader.appendChild(legalModalCloseButton);

        // Treść modala
        const legalModalContent = document.createElement('div');
        legalModalContent.id = "legal-modal-content";

        // Sekcja RODO
        const legalModalContentRodo = document.createElement('div');
        legalModalContentRodo.id = "legal-modal-content-rodo";

        const rodoList = document.createElement('ul');

        const li1 = document.createElement('li');
        li1.textContent = "Prezentowane treści mają charakter testowy, co oznacza, że wyniki z wykonywanych przez Ciebie zadań – testów służą nam w celu poprawy określonych funkcjonalności, obszarów lub usług w ramach Platformy.";
        rodoList.appendChild(li1);

        const li2 = document.createElement('li');
        li2.textContent = "Wykonywanie testów na udostępnionym prototypie nie wiąże się dla Ciebie z wystąpieniem skutków cywilnoprawnych względem innych użytkowników Platformy.";
        rodoList.appendChild(li2);

        const li3 = document.createElement('li');
        li3.textContent = "Wykonywanie testów nie wiąże się ze świadczeniem usług na naszą rzecz, w związku z czym ma ono charakter bezpłatny. Zastrzegamy sobie możliwość kierowania określonych funkcjonalności lub usług do testów przez wybranych użytkowników Platformy.";
        rodoList.appendChild(li3);

        const li4 = document.createElement('li');
        li4.textContent = "Udostępniane prototypy i treści mają charakter poufny, a wszelkie autorskie prawa majątkowe do prezentowanych treści przysługują Trans.eu Group S.A. Zabronione jest ich wykorzystywanie, upublicznianie, rozpowszechnianie, kopiowanie.";
        rodoList.appendChild(li4);

        const li5 = document.createElement('li');
        li5.textContent = "Nie ponosimy odpowiedzialności za jakiekolwiek błędy komputerowe, programowe, internetowe, telefoniczne, techniczne, sprzętowe, w tym w szczególności zakłócenia na łączach telekomunikacyjnych, błędy transmisji danych, zakłócenia systemów, inne nieprawidłowości, które mogą wystąpić w trakcie testów.";
        rodoList.appendChild(li5);

        legalModalContentRodo.appendChild(rodoList);

        // Sekcja informacje prawne
        const legalModalContentOther = document.createElement('div');
        legalModalContentOther.id = "legal-modal-content-other";

        const otherParagraph = document.createElement('p');
        otherParagraph.innerHTML = 'Administratorem danych osobowych jest Trans.eu Group S.A., ul. Racławicka 2-4, 53-146 Wrocław (dalej jako: "Administrator"). Dane wskazane w ramach formularza makiet testowych będą przetwarzane w celach niezbędnych dla udziału i realizacji badań testowych. Podanie danych jest dobrowolne, ale niezbędne dla udziału w testach użyteczności przeprowadzanych przez Trans.eu. Podstawa prawna, cel, okres przetwarzania danych osobowych oraz uprawnienia przysługujące, a także inne ważne informacje dotyczące zasad przetwarzania danych osobowych są szczegółowo określone w <a href="https://www.trans.eu/pl/polityka-prywatnosci" target="_blank">Polityce prywatnosci</a>, kontakt: <a href="mailto:iod@trans.eu">iod@trans.eu</a>.';
        legalModalContentOther.appendChild(otherParagraph);

        legalModalContent.appendChild(legalModalContentRodo);
        legalModalContent.appendChild(legalModalContentOther);

        legalModal.appendChild(legalModalHeader);
        legalModal.appendChild(legalModalContent);
        legalModalWrapper.appendChild(legalModal);

        // Wstawienie na samej górze body
        document.body.insertBefore(legalModalWrapper, document.body.firstChild);
    }

    // Nowa funkcja dodająca logikę obsługi modala
    function setupLegalModalListeners() {
        // Elementy wywołujące otwarcie modala (span'y utworzone w createHTMLStructures)
        const legalRodoSpan = document.getElementById('legal-rodo');
        const legalOtherSpan = document.getElementById('legal-other');
        // Elementy modala
        const modalWrapper = document.getElementById('legal-modal-wrapper');
        const modal = document.getElementById('legal-modal');
        const rodoHeading = document.getElementById('legal-modal-rodo-heading');
        const otherHeading = document.getElementById('legal-modal-other-heading');
        const contentRodo = document.getElementById('legal-modal-content-rodo');
        const contentOther = document.getElementById('legal-modal-content-other');
        const modalCloseButton = document.getElementById('legal-modal-close-button');

        // Funkcja do otwierania modala z fade in
        function showModal() {
            modalWrapper.style.display = "flex";
            // Początkowo ustawiamy opacity na 0
            modalWrapper.style.opacity = "0";
            // W kolejnym cyklu animujemy opacity do 1
            requestAnimationFrame(() => {
                modalWrapper.style.opacity = "1";
            });
        }

        // Funkcja do zamykania modala z fade out
        function closeModal() {
            modalWrapper.style.opacity = "0";
            // Po zakończeniu animacji (300ms) ukrywamy modal
            setTimeout(() => {
                modalWrapper.style.display = "none";
            }, 300);
        }

        if (legalRodoSpan) {
            legalRodoSpan.addEventListener('click', function(event) {
                rodoHeading.style.display = "block";
                otherHeading.style.display = "none";
                contentRodo.style.display = "block";
                contentOther.style.display = "none";
                showModal();
                event.stopPropagation();
            });
        }

        if (legalOtherSpan) {
            legalOtherSpan.addEventListener('click', function(event) {
                otherHeading.style.display = "block";
                rodoHeading.style.display = "none";
                contentOther.style.display = "block";
                contentRodo.style.display = "none";
                showModal();
                event.stopPropagation();
            });
        }

        // Kliknięcie w tło modala – tylko poza głównym kontenerem (legal-modal)
        modalWrapper.addEventListener('click', function(event) {
            if (!event.target.closest('#legal-modal')) {
                closeModal();
            }
        });

        // Kliknięcie przycisku zamknięcia modala
        modalCloseButton.addEventListener('click', function(event) {
            closeModal();
            event.stopPropagation();
        });
    }

    // Funkcja ustawia pozycję "floatingWrapper" względem kursora
    function positionWrapper(x, y) {
        const offset = 60;
        const floatingWrapper = document.getElementById("floatingWrapper");
        if (floatingWrapper) {
            floatingWrapper.style.top = `${y - offset}px`;
            floatingWrapper.style.left = `${x}px`;
        }
    }

    // Funkcja śledzi położenie kursora i pozycjonuje "floatingWrapper"
    function followCursor(e) {
        positionWrapper(e.clientX, e.clientY);
    }

    // Funkcja nasłuchuje na zmianę rozmiaru okna i odświeża stronę po 1s od ustabilizowania rozmiaru
    function setupResizeListener() {
        let resizeTimeout;
        window.addEventListener('resize', function() {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(() => {
                console.log('Zmieniono rozmiar okna - przeładowanie strony.');
                window.location.reload();
            }, 1000);
        });
    }
    setupResizeListener();

    // Funkcja sprawdza minimalną szerokość okna i jeśli jest za mała, wyświetla komunikat
    function checkWindowWidth() {
        const MIN_WIDTH = 1280;
        const currentWidth = window.innerWidth;

        if (currentWidth >= MIN_WIDTH) {
            console.log(`Okno ma wystarczającą szerokość (${currentWidth}px) - kontynuuję inicjalizację.`);
            initializeScript();
        } else {
            console.log(`Zbyt mała szerokość okna (${currentWidth}px) - wyświetlam komunikat dla użytkownika.`);
            document.body.innerHTML = '';
            document.body.style.width = '100%';
            document.body.style.backgroundColor = 'white';

            const body = document.querySelector('body');
            const alertContainer = document.createElement('div');
            alertContainer.className = 'window-size-alert-container';

            const alertIcon = document.createElement('img');
            alertIcon.src = 'https://1236554drs4231112876vccf4-pawel.s3.eu-north-1.amazonaws.com/ux-research_resize-icon.svg';
            alertIcon.alt = 'Alert Icon';
            alertIcon.className = 'window-size-alert-icon';
            alertContainer.appendChild(alertIcon);

            const alertHeading = document.createElement('h2');
            alertHeading.className = 'window-size-alert-h2';
            alertHeading.textContent = 'Treść niedostępna';
            alertContainer.appendChild(alertHeading);

            const alertText = document.createElement('p');
            alertText.textContent = `Minimalna szerokość okna to 1280 px (obecnie ${currentWidth}px). Powiększ okno lub zmień urządzenie na większe, aby kontynuować.`;
            alertText.className = 'window-size-alert-txt';
            alertContainer.appendChild(alertText);

            body.appendChild(alertContainer);
        }
    }
    checkWindowWidth();

    // Funkcja skaluje element #base jeżeli jest zbyt wysoki w stosunku do wysokości body
    function scaleBaseElement() {
        let maxBottom = 0;
        let lowestElement = null;
        const elements = document.querySelectorAll("*");

        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementBottom = rect.bottom + window.scrollY;
            if (elementBottom > maxBottom) {
                maxBottom = elementBottom;
                lowestElement = element;
            }
        });

        const bodyHeight = document.body.offsetHeight;
        const bodyWidth = document.body.offsetWidth;

        if (maxBottom > bodyHeight) {
            const scale = bodyHeight / maxBottom;
            const baseElement = document.getElementById("base");
            if (baseElement) {
                baseElement.style.transformOrigin = "center top";
                baseElement.style.transform = `scale(${scale})`;
                const newBodyWidth = bodyWidth * scale;
                document.body.style.width = `${newBodyWidth}px`;
                baseElement.classList.add("scale");
                console.log(`Zastosowano skalowanie (${scale}) na elemencie #base.`);
            }
        } else {
            console.log("Skalowanie nie jest wymagane - cała zawartość mieści się na stronie.");
        }
    }

    // Funkcja tworzy struktury HTML potrzebne do działania skryptu
    function createHTMLStructures() {
        const body = document.querySelector('body');

        const checkOverlay = document.createElement('div');
        checkOverlay.id = 'checkOverlay';

        const floatingWrapper = document.createElement('div');
        floatingWrapper.id = 'floatingWrapper';

        const successCheckmark = document.createElement('div');
        successCheckmark.className = 'success-checkmark';

        const checkIcon = document.createElement('div');
        checkIcon.className = 'check-icon';

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
        backgroundOverlayStart.className = 'background-overlay fade fade-visible';
        body.appendChild(backgroundOverlayStart);

        const backgroundOverlayFeedback = document.createElement('div');
        backgroundOverlayFeedback.id = 'background-overlay-feedback';
        backgroundOverlayFeedback.className = 'background-overlay fade fade-hidden';
        backgroundOverlayFeedback.style.display = 'none';
        body.appendChild(backgroundOverlayFeedback);

        const feedbackContentBox = document.createElement('div');
        feedbackContentBox.className = 'content-box';

        const feedbackLeftColumn = document.createElement('div');
        feedbackLeftColumn.className = 'left-column';

        const feedbackArrow = document.createElement('img');
        feedbackArrow.src = 'https://1236554drs4231112876vccf4-pawel.s3.eu-north-1.amazonaws.com/ux-research_dashed-task-feedback-arrow.svg';
        feedbackArrow.alt = 'Feedback Arrow';
        feedbackLeftColumn.appendChild(feedbackArrow);

        const feedbackRightColumn = document.createElement('div');
        feedbackRightColumn.className = 'right-column';

        const feedbackIcon = document.createElement('img');
        feedbackIcon.className = 'feedback-icon';
        feedbackIcon.src = 'https://1236554drs4231112876vccf4-pawel.s3.eu-north-1.amazonaws.com/ux-research_check-icon.svg';
        feedbackIcon.alt = 'Task Completed Icon';

        const feedbackAlert = document.createElement('h4');
        feedbackAlert.id = 'feedback-alert';
        feedbackAlert.textContent = 'Zadanie wykonane';

        const feedbackMessage = document.createElement('p');
        feedbackMessage.textContent = 'Chętnie poznamy Twoją opinię na jego temat.';

        feedbackRightColumn.append(feedbackIcon, feedbackAlert, feedbackMessage);
        feedbackContentBox.append(feedbackLeftColumn, feedbackRightColumn);
        backgroundOverlayFeedback.appendChild(feedbackContentBox);

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

        iframeContainer.style.transition = 'transform 300ms ease-out, width 400ms ease-out';

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
        headerText.textContent = 'Warto wiedzieć';

        const paragraph = document.createElement('p');
        paragraph.textContent = 'Na czas wykonywania zadania możesz schować panel po lewej stronie.';

        const startButton = document.createElement('button');
        startButton.id = 'start-button';
        startButton.textContent = 'Rozpocznij';

        // Dodanie nowego elementu "legal-information" pod przyciskiem startButton
        const legalInformation = document.createElement('div');
        legalInformation.id = 'legal-information';

        const legalRodo = document.createElement('p');
        legalRodo.innerHTML = 'Obowiązek informacyjny RODO - <span id="legal-rodo">więcej</span>';

        const legalOther = document.createElement('p');
        legalOther.innerHTML = 'Informacje prawne - <span id="legal-other">więcej</span>';

        legalInformation.appendChild(legalRodo);
        legalInformation.appendChild(legalOther);

        topRightColumn.append(headerText, paragraph, startButton, legalInformation);
        topContentBox.append(topLeftColumn, topRightColumn);
        topOverlay.appendChild(topContentBox);
        body.appendChild(topOverlay);
    }

    // Funkcja ustawia dodatkowe nasłuchiwacze zdarzeń, np. kliknięcia startButton, iframeArrow itp.
    function setupAdditionalEventListeners() {
        const startButton = document.getElementById('start-button');
        const topOverlay = document.getElementById('top-overlay');
        const iframeArrow = document.getElementById('iframe-arrow');
        const iframeArrowImg = iframeArrow ? iframeArrow.querySelector('img') : null;
        const iframeContainer = document.getElementById('iframe-container');
        const backgroundOverlayStart = document.getElementById('background-overlay-start');
        const backgroundOverlayFeedback = document.getElementById('background-overlay-feedback');

        if (!startButton || !topOverlay || !iframeArrow || !iframeArrowImg || !iframeContainer || !backgroundOverlayStart || !backgroundOverlayFeedback) {
            return;
        }

        function triggerShake() {
            startButton.classList.add('shake');
            setTimeout(() => {
                startButton.classList.remove('shake');
            }, 500);
        }

        function hideIframeArrow() {
            iframeArrow.classList.add('hidden-fade');
        }

        function showIframeArrow() {
            iframeArrow.classList.remove('hidden-fade');
        }

        startButton.addEventListener('click', () => {
            console.log('Rozpoczęto zadanie (kliknięcie startButton).');
            topOverlay.style.display = 'none';
            backgroundOverlayStart.style.display = 'none';
            if (targetIframe && targetIframe.contentWindow && iframeOrigin) {
                const message = { typ: 'startButtonClicked', dane: 'start-button' };
                targetIframe.contentWindow.postMessage(message, iframeOrigin);
            }
        });

        iframeArrow.addEventListener('click', () => {
            const isVisible = iframeContainer.getAttribute('data-visible') === 'true';
            if (isVisible) {
                iframeContainer.classList.add('hidden');
                iframeArrowImg.classList.add('rotated');
                iframeContainer.setAttribute('data-visible', 'false');
                console.log('Ukryto panel z ramką.');
            } else {
                iframeContainer.classList.remove('hidden');
                iframeArrowImg.classList.remove('rotated');
                iframeContainer.setAttribute('data-visible', 'true');
                console.log('Pokazano panel z ramką.');
            }
        });

        topOverlay.addEventListener('click', (event) => {
            // Kliknięcia w spanach legal-rodo i legal-other nie wywołują efektu shake
            if (!event.target.closest('#start-button') &&
                !event.target.closest('#legal-rodo') &&
                !event.target.closest('#legal-other')) {
                triggerShake();
            }
        });

        function showFeedbackOverlay() {
            backgroundOverlayFeedback.style.display = 'block';
            requestAnimationFrame(() => {
                backgroundOverlayFeedback.classList.remove('fade-hidden');
                backgroundOverlayFeedback.classList.add('fade-visible');
                hideIframeArrow();
                const isIframeVisible = iframeContainer.getAttribute('data-visible') === 'true';
                if (!isIframeVisible) {
                    setTimeout(() => {
                        iframeArrow.click();
                    }, 200);
                }
            });
        }

        function hideFeedbackOverlay() {
            backgroundOverlayFeedback.classList.remove('fade-visible');
            backgroundOverlayFeedback.classList.add('fade-hidden');
        }

        backgroundOverlayFeedback.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'opacity' && backgroundOverlayFeedback.classList.contains('fade-hidden')) {
                backgroundOverlayFeedback.style.display = 'none';
                showIframeArrow();
            }
        });

        window.showFeedbackOverlay = showFeedbackOverlay;
        window.hideFeedbackOverlay = hideFeedbackOverlay;
    }

    // Funkcja pobiera wartość parametru z URL
    function getURLParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Funkcja ustawia src dla iframe bazując na parametrach URL
    function manipulateIframes() {
        const id = getURLParameter('id');
        const survey = getURLParameter('survey');

        if (!survey) {
            console.log('Brak parametru survey - pomijam ładowanie ankiety.');
            return;
        }

        const iframe = document.getElementById('survey-iframe');
        if (iframe) {
            const newSrc = survey + (survey.includes('?') ? '&' : '?') + 'user_id=' + encodeURIComponent(id);
            iframe.setAttribute('src', newSrc);
            try {
                const surveyURL = new URL(newSrc);
                iframeOrigin = surveyURL.origin;
            } catch (error) {
                console.error('Błąd przy parsowaniu URL ankiety:', error);
            }
            targetIframe = iframe;
            console.log('Załadowano ankietę do iframe.');
        }
    }

    // Funkcja nasłuchuje kliknięcia w dokument i reaguje na elementy "task-completed"
    function setupClickListener() {
        document.addEventListener('click', function(event) {
            const taskElement = event.target.closest('[data-label="task-completed"]');
            if (taskElement) {
                console.log('Wykonano zadanie oznaczone jako "task-completed".');
                const checkOverlay = document.getElementById("checkOverlay");
                const floatingWrapper = document.getElementById("floatingWrapper");
                const loaderBox = document.getElementById("loaderBox");
                const iframeContainer = document.getElementById('iframe-container');

                if (checkOverlay && floatingWrapper && loaderBox && iframeContainer) {
                    checkOverlay.style.display = "flex";
                    positionWrapper(event.clientX, event.clientY);
                    floatingWrapper.classList.remove("floating-wrapper-hide");
                    floatingWrapper.style.display = "flex";
                    floatingWrapper.classList.add("floating-wrapper-show");

                    const isIframeVisible = iframeContainer.getAttribute('data-visible') === 'true';

                    if (isIframeVisible) {
                        loaderBox.classList.remove("loader-box-hide");
                        loaderBox.classList.add("loader-box-show");
                    } else {
                        loaderBox.classList.remove("loader-box-show");
                        loaderBox.classList.add("loader-box-hide");
                    }

                    document.addEventListener("mousemove", followCursor);
                }

                setTimeout(() => {
                    if (targetIframe && targetIframe.contentWindow && iframeOrigin) {
                        targetIframe.contentWindow.postMessage({ typ: 'klikniecie', dane: 'task-completed' }, iframeOrigin);
                    }
                }, 1000);
            }
        }, { passive: false });
    }

    // Funkcja nasłuchuje wiadomości przychodzące z iframe i reaguje na nie
    function setupMessageListener() {
        const backgroundOverlayFeedback = document.getElementById('background-overlay-feedback');
        const checkOverlay = document.getElementById("checkOverlay");
        const floatingWrapper = document.getElementById("floatingWrapper");
        const loaderBox = document.getElementById("loaderBox");

        window.addEventListener('message', function(event) {
            if (event.origin !== iframeOrigin) {
                return;
            }

            if (event.data.typ === 'nextButton') {
                if (backgroundOverlayFeedback && backgroundOverlayFeedback.classList.contains('fade-visible')) {
                    window.hideFeedbackOverlay();
                }
            } else if (event.data.typ === 'showFeedbackOverlay') {
                setTimeout(() => {
                    if (checkOverlay && floatingWrapper && loaderBox) {
                        floatingWrapper.classList.remove("floating-wrapper-show");
                        floatingWrapper.classList.add("floating-wrapper-hide");
                        loaderBox.classList.remove("loader-box-show");
                        loaderBox.classList.add("loader-box-hide");

                        setTimeout(() => {
                            floatingWrapper.style.display = "none";
                            floatingWrapper.classList.remove("floating-wrapper-hide");
                            checkOverlay.style.display = "none";
                            document.removeEventListener("mousemove", followCursor);
                            window.showFeedbackOverlay();
                        }, 200);
                    }
                }, 2000);
            } else if (event.data.typ === 'pageLoaded') {
                setTimeout(() => {
                    const initialLoader = document.getElementById('initial-loader');
                    if (initialLoader) {
                        initialLoader.style.opacity = '0';
                        setTimeout(() => {
                            initialLoader.style.display = 'none';
                        }, 200);
                    }
                }, 1000);
            } else if (event.data.typ === 'flowFinished') {
                const iframeContainers = document.querySelectorAll('.iframe-container');
                iframeContainers.forEach(container => {
                    container.style.width = '100%';
                });
            } else if (event.data.typ === 'taskProblem') {
                const iframeContainers = document.querySelectorAll('.iframe-container');
                iframeContainers.forEach(container => {
                    function handleTransitionEnd(e) {
                        if (e.propertyName === 'width') {
                            if (targetIframe && targetIframe.contentWindow && iframeOrigin) {
                                const message = { typ: 'hideLoader' };
                                targetIframe.contentWindow.postMessage(message, iframeOrigin);
                            }
                            container.removeEventListener('transitionend', handleTransitionEnd);
                        }
                    }
                    container.addEventListener('transitionend', handleTransitionEnd, { once: true });
                    container.style.width = '100%';
                });
            }
        });
    }

    // Funkcja inicjalizująca skrypt
    function initializeScript() {
        // Najpierw tworzymy modal i wszystkie struktury HTML
        createLegalModal();
        createHTMLStructures();
        // Następnie dodajemy logikę obsługi modala
        setupLegalModalListeners();
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
