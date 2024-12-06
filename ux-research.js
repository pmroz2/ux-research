// Skrypt 2
window.addEventListener('message', (event) => {
  // Sprawdzamy, czy wiadomość pochodzi od dozwolonego nadawcy
  if (event.origin.endsWith('.axshare.com') || event.origin === 'https://form.ux-research.eu') { // Dodano dozwoloną domenę rodzica
    console.log('Otrzymano wiadomość z dozwolonego źródła:', event.data);

    // Sprawdzamy, czy wiadomość to nasza określona wiadomość
    if (event.data.typ === 'klikniecie' && event.data.dane === 'task-completed') {
      console.log('Wiadomość potwierdzona: kliknięto task-completed');

      // Znajdź element <label> z tekstem "TAK"
      const labelElement = Array.from(document.querySelectorAll('label')).find(
        (label) => label.textContent.trim() === 'TAK'
      );

      if (labelElement) {
        console.log('Znaleziono element <label> z tekstem "TAK":', labelElement);

        // Znajdź bezpośredniego rodzica i wyzwól kliknięcie
        const parentElement = labelElement.parentElement;
        if (parentElement) {
          console.log('Wyzwalam kliknięcie na rodzicu:', parentElement);
          parentElement.click();
        } else {
          console.info('Nie znaleziono rodzica dla elementu <label> z tekstem "TAK".');
        }
      } else {
        console.info('Nie znaleziono elementu <label> z tekstem "TAK" na stronie.');
      }
    }

    // Obsługa nowej wiadomości: startButtonClicked
    if (event.data.typ === 'startButtonClicked' && event.data.dane === 'start-button') {
      console.log('Wiadomość potwierdzona: start-button został kliknięty');

      // Znajdź pierwszy przycisk <button> z atrybutem value="hide"
      const hideButton = document.querySelector('button[value="hide"]');
      if (hideButton) {
        console.log('Znaleziono przycisk <button> z atrybutem value="hide":', hideButton);
        hideButton.click();
        console.log('Kliknięto przycisk <button> z atrybutem value="hide".');
      } else {
        console.info('Nie znaleziono przycisku <button> z atrybutem value="hide" na stronie.');
      }
    }
  } else {
    console.info('Nieautoryzowany nadawca:', event.origin);
  }
});
