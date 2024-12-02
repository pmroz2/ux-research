(function() {
    console.log('Skrypt został załadowany i uruchomiony.');

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

        const iframes = document.querySelectorAll('iframe');

        for (let iframe of iframes) {
            const iframeSrc = iframe.getAttribute('src');
            if (iframeSrc && iframeSrc.includes('https://nieruszactegolinku123.com')) {
                console.log('Znaleziono ramkę o żądanym źródle:', iframe);
                const newSrc = survey + (survey.includes('?') ? '&' : '?') + 'user_id=' + encodeURIComponent(trans_id);
                iframe.setAttribute('src', newSrc);
                console.log('Zaktualizowano źródło ramki do:', newSrc);

                // Przechowaj referencję do tego iframe
                targetIframe = iframe;
                break; // Jeśli chcesz manipulować tylko pierwszym znalezionym iframe
            }
        }

        if (!targetIframe) {
            console.log('Nie znaleziono iframe do manipulacji.');
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
