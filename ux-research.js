console.log('Skrypt został załadowany z Github.1');

document.addEventListener('click', function(event) {
    var taskElement = event.target.closest('[data-label="task-completed"]');
    if (taskElement) {
        console.log('Kliknięto element 3 z data-label="task-completed":', taskElement);
    } else {
        console.log('Kliknięto inny element:', event.target);
    }
}, { passive: false });
