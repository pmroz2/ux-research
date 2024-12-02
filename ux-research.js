window.addEventListener('DOMContentLoaded', function() {
    console.log('Strona A została załadowana.');

    setTimeout(function() {
        function getURLParameter(name) {
            // Funkcja do wyodrębnienia parametru z adresu URL
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            const results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        }

        const trans_id = getURLParameter('trans_id');
        const survey = getURLParameter('survey');

        if (trans_id) {
            console.log('Znaleziono parametr trans_id w adresie URL strony A:', trans_id);
        } else {
            console.log('Nie znaleziono parametru trans_id w adresie URL strony A.');
        }

        if (!survey) {
            console.log('Nie znaleziono parametru survey w adresie URL strony A.');
            return; // Jeśli parametr "survey" nie zostanie znaleziony, przerywamy dalsze działanie skryptu
        }

        // Szukamy wszystkich ramek na stronie
        const iframes = document.querySelectorAll('iframe');

        for (let iframe of iframes) {
            const iframeSrc = iframe.getAttribute('src');
            if (iframeSrc && iframeSrc.includes('https://nieruszactegolinku123.com')) {
                console.log('Znaleziono ramkę o żądanym źródle:', iframe);

                // Modyfikowanie źródła ramki, dodając parametr user_id
                const newSrc = survey + (survey.includes('?') ? '&' : '?') + 'user_id=' + encodeURIComponent(trans_id);
                iframe.setAttribute('src', newSrc);
                console.log('Zaktualizowano źródło ramki do:', newSrc);
            }
        }
    }, 1000); // Opóźnienie 1 sekunda
});
