console.log('Skrypt został załadowany z Github yee2.');

document.addEventListener('click', function(event) {
    var taskElement = event.target.closest('[data-label="task-completed"]');
    if (taskElement) {
        console.log('Kliknięto element z data-label="task-completed":', taskElement);
    } else {
        console.log('Kliknięto inny element:', event.target);
    }
}, { passive: false });
