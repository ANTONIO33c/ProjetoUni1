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
    effect: "fade", // Aplica o efeito de fade
    fadeEffect: {
      crossFade: true, // Mistura suavemente os slides
    },
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 12000, // Tempo entre os slides
      disableOnInteraction: false,
    },
  });

//   legenda banner 
const captionElement = document.getElementById("swiper-caption");

function updateCaption() {
  const activeSlide = swiper.slides[swiper.activeIndex];
  const caption = activeSlide.getAttribute("data-caption");
  captionElement.textContent = caption || "";
}
updateCaption(); // Define legenda inicial

swiper.on("slideChange", updateCaption); // Atualiza a cada troca de slide
//   Fim legenda

//function rolagem mobile
document.querySelectorAll('.accordion-function').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Scroll suave até o destino
        const targetId = this.getAttribute('href').substring(1); // remove o #
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }

        // Fecha o menu mobile, se estiver aberto
        const menuMobile = document.querySelector('.mobile-menu');
        if (menuMobile.classList.contains('open')) {
            menuMobile.classList.remove('open');
            document.querySelector('.icon').src = "images/menu_white_36dp.svg";
        }
    });
});
// fim functin rolagem
window.addEventListener('load', () => {
    const visibilityStates = new WeakMap();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;

            // Estado por elemento (armazenado com WeakMap para não poluir o DOM)
            if (!visibilityStates.has(el)) {
                visibilityStates.set(el, { isVisible: false });
            }

            const state = visibilityStates.get(el);
            const isCurrentlyVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;

            // A lógica agora é para adicionar a classe quando o elemento aparecer na tela
            // e remover a classe apenas quando você começar a subir
            if (isCurrentlyVisible && !state.isVisible) {
                // O elemento entrou na tela ao descer
                state.isVisible = true;
                requestAnimationFrame(() => {
                    el.classList.add('show-carousel');
                });
            } else if (!isCurrentlyVisible && state.isVisible && entry.boundingClientRect.top > 0) {
                // O elemento saiu da tela ao subir
                state.isVisible = false;
                requestAnimationFrame(() => {
                    el.classList.remove('show-carousel');
                });
            }
        });
    }, {
        threshold: 0.5, // Defina o threshold para 60% visível
    });

    document.querySelectorAll('.hidden-carousel').forEach(el => {
        observer.observe(el);
    });
});



// Controlador de animação avião
function openPopupAndShowAirplane(id, event) {
    const airplane = document.querySelector('.airplane');
    const popup = document.getElementById(id);
    const backdrop = popup.querySelector('dialog::backdrop');

    // Inicializa o avião no ponto de origem
 airplane.style.transition = 'none';
    airplane.style.transform = 'translate(0, 0)';
    airplane.style.display = 'block';

    // Força reflow
    void airplane.offsetWidth;

    setTimeout(() => {
        const targetX = window.innerWidth - airplane.offsetWidth;
        const targetY = -window.innerHeight + airplane.offsetHeight;

        airplane.style.transition = 'transform 1.5s ease-out';
        airplane.style.transform = `translate(${targetX}px, ${targetY}px)`;

        setTimeout(() => {
            popup.showModal();
            popup.style.opacity = '1';
        }, 1000);
    }, 10);

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



// accordion

const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion => {
    accordion.addEventListener(('click'), () =>{
        const body = accordion.querySelector('.accordion-body');
        body.classList.toggle('active');
    })
})