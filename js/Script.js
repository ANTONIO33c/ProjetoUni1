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
function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "images/menu_white_36dp.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "images/close_white_36dp.svg";
    }
}

//Function Carousel

$(document).on('ready', function() {
    $(".regular").slick({
        dots: true,
        infinity: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });
});
window.addEventListener('load', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Defina um tempo mínimo de visibilidade para evitar flickering
            const stableVisibility = 150; // 100ms de estabilidade para visibilidade

            // Verifica se o elemento está visível mais de 50% (threshold de 0.5)
            if (entry.intersectionRatio > 0.5) {
                // Espera um pequeno tempo para garantir estabilidade antes de fazer aparecer
                setTimeout(() => {
                    if (!entry.target.classList.contains('show-carousel')) {
                        entry.target.classList.add('show-carousel');
                    }
                }, stableVisibility);
            } else {
                // Espera um pequeno tempo para garantir estabilidade antes de fazer desaparecer
                setTimeout(() => {
                    if (entry.target.classList.contains('show-carousel')) {
                        entry.target.classList.remove('show-carousel');
                    }
                }, stableVisibility);
            }
        });
    }, {
        threshold: 0.5 // Só reage quando mais de 50% do elemento está visível
    });

    // Seleciona todos os elementos com a classe .hidden-carousel
    const hiddenElements = document.querySelectorAll('.hidden-carousel');

    // Começa a observar os elementos
    hiddenElements.forEach(el => {
        observer.observe(el);
    });
});




