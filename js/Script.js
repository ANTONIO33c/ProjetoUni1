function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.showModal();

        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal(id);
            }
        });
    } 
    else {
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
// Mobile menu
// function menuShow() {
//     let menuMobile = document.querySelector('.mobile-menu');
//     if (menuMobile.classList.contains('open')) {
//         menuMobile.classList.remove('open');
//         document.querySelector('.icon').src = "images/menu_white_36dp.svg";
//     } else {
//         menuMobile.classList.add('open');
//         document.querySelector('.icon').src = "images/close_white_36dp.svg";
//     }
// }

