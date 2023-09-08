if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/serviceWorker.js')
        .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch((error) => {
        console.log('Erro ao registrar o Service Worker:', error);
        });
}