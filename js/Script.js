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

//Function Carousel com a biblioteca Swiper JS
const swiper = new Swiper(".swiper", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

//   Fim Carousel 
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

// Controlador de animação avião
function openPopupAndShowAirplane(id, event) {
    const airplane = document.querySelector('.airplane');
    const popup = document.getElementById(id);
    const backdrop = popup.querySelector('dialog::backdrop');

    // Inicializa o avião no ponto de origem
    airplane.style.left = `0px`;
airplane.style.top = `${window.innerHeight - airplane.offsetHeight}px`;
airplane.style.transition = 'none';
airplane.style.display = 'block';

/* Inicializa o popup com opacidade 0 para aplicar fade-in */
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.5s ease-out';

// Força o reflow
void airplane.offsetWidth;

setTimeout(() => {
    // Destino: canto superior direito
    const targetX = window.innerWidth - airplane.offsetWidth;
    const targetY = 0;

    // Move com transição usando top/left
    airplane.style.transition = 'left 1.5s ease-out, top 1.5s ease-out';
    airplane.style.left = `${targetX}px`;
    airplane.style.top = `${targetY}px`;

    // Abre o popup com fade-in após a animação
    setTimeout(() => {
        popup.showModal();
        popup.style.opacity = '1';
    }, 1000); // tempo igual ao da transição
}, 10);// Pequeno delay para garantir que a animação seja aplicada

    // Adiciona evento para fechar o popup quando clicar fora
    document.addEventListener('click', function closeOnClickOutside(event) {
        // Verifica se o clique foi fora da box e no backdrop
        if (!popup.contains(event.target) && event.target === backdrop) {
            closePopup(id);
            document.removeEventListener('click', closeOnClickOutside); // Remove o ouvinte de evento após o clique
        }
    });
}
function closePopup(id) {
    const popup = document.getElementById(id);
    const airplane = document.querySelector('.airplane');

    popup.close();

    // Move o avião para fora da tela (diagonalmente para cima e à direita)
    const exitX = window.innerWidth;
    const exitY = -airplane.offsetHeight;

    airplane.style.transition = 'left 1s ease-in, top 1s ease-in';
    airplane.style.left = `${exitX}px`;
    airplane.style.top = `${exitY}px`;

    // Após o movimento, faz o fade-out
    setTimeout(() => {
        airplane.style.transition = 'opacity 0.1s ease-in';
        airplane.style.opacity = '0';
    }, 1000); // tempo da transição de movimento

    // Depois do fade-out, reseta o estado para permitir nova entrada
    setTimeout(() => {
        airplane.style.display = 'none';
        airplane.style.left = '0px';
        airplane.style.top = `${window.innerHeight - airplane.offsetHeight}px`;
        airplane.style.opacity = '1';
        airplane.style.transition = 'none';
    }, 1500);
}