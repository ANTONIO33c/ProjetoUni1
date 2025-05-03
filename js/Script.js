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

    // Inicializa o avião no ponto de origem
    airplane.style.left = `0px`;
    airplane.style.top = `0px`;
    airplane.style.transform = 'none';
    airplane.style.transition = 'none';
    airplane.style.display = 'block';

    // Inicializa o popup com opacidade 0 para aplicar fade-in
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.5s ease-out';

    // Força o reflow para garantir que a animação de transição seja aplicada
    void airplane.offsetWidth;

    // Inicia a animação do avião cruzando a tela
    setTimeout(() => {
        // Calcula a posição final do avião (canto inferior direito da tela)
        const targetX = window.innerWidth - airplane.offsetWidth;
        const targetY = window.innerHeight - airplane.offsetHeight;

        // Inicia a transição do avião para o destino final
        airplane.style.transition = 'transform 2s ease-out';
        airplane.style.transform = `translate(${targetX}px, ${targetY}px)`; // Movimento diagonal

        // Depois que o avião chegar no canto inferior direito, abre o popup com fade-in
        setTimeout(() => {
            // Exibe o popup com fade-in (opacidade vai de 0 para 1)
            popup.showModal(); // Exibe o popup
            popup.style.opacity = '1'; // Inicia a transição de opacidade para 1 (visível)
        }, 1000); // Atraso de 3 segundos para aguardar a animação do avião
    }, 10); // Pequeno delay para garantir que a animação seja aplicada
    
}

function closePopup(id) {
    const popup = document.getElementById(id);
    const airplane = document.querySelector('.airplane');

    popup.close();

    // Prepara para saída com transição de posição
    airplane.style.transition = 'transform 1s ease-in';
    airplane.style.transform += ' translate(600px, 600px)'; // movimento diagonal

    // Após movimento, inicia fade-out
    setTimeout(() => {
        airplane.style.transition = 'opacity 0.5s ease-in';
        airplane.style.opacity = '0';
    }, 1000); // espera o movimento terminar (1s)

    // Depois do fade-out, reseta
    setTimeout(() => {
        airplane.style.display = 'none';
        airplane.style.transform = 'none';
        airplane.style.transition = 'none';
        airplane.style.opacity = '1';
    }, 1500); // espera o fade-out (0.5s) após o movimento
}