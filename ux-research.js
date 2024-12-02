document.addEventListener('click', function(event) {
    // Znajdź najbliższy element z atrybutem data-label="task-completed"
    var taskElement = event.target.closest('[data-label="task-completed"]');
    if (taskElement) {
        console.log('Kliknięto element z data-label="task-completed":', taskElement);

        // Znajdź najbliższego rodzica
        var parentElement = taskElement.parentNode;
        if (parentElement) {
            console.log('Najbliższy rodzic elementu to:', parentElement);

            // Opcjonalnie: możesz tutaj wykonać dodatkowe akcje, np. kliknąć rodzica
            parentElement.click();
            console.log('Wywołano kliknięcie na rodzicu.');
        } else {
            console.log('Element nie ma rodzica.');
        }
    } else {
        console.log('Kliknięto element inny niż task-completed.');
    }
});
