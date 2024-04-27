// Get the installation button element from the document by its ID
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
// Listen for the 'beforeinstallprompt' event which fires when a PWA installation prompt can be shown
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();

    window.deferredPrompt = event;

    // Make the install button visible by removing 'hidden' class
    butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
// Add a click event listener to the installation button
butInstall.addEventListener('click', async () => {
    // Retrieve the stashed event from earlier
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        // If there is no prompt event available, simply return and do nothing
        return;
    }

    // Show the installation prompt
    promptEvent.prompt();

    // Reset the deferred prompt variable, as it can only be used once
    window.deferredPrompt = null;

    // Hide the installation button again
    butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
// Listen for the 'appinstalled' event, which indicates the app was installed
window.addEventListener('appinstalled', (event) => {
    // Clear the deferredPrompt to ensure it can't be used again until it's needed
    window.deferredPrompt = null;

    console.log('PWA has been installed');
});
