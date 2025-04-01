function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.showModal();
    } else {
        console.error("Modal não encontrado: " + id);
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.close();
    } else {
        console.error("Modal não encontrado: " + id);
    }
}

