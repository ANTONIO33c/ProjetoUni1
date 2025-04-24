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

// let count = 1;
// document.getElementById("radio1").checked = true;

// setInterval( function(){
//     nextImage();
// }, 4000)

// function nextImage(){
//     count++;
//     if(count > 4){
//         count = 1;
//     }

//     document.getElementById("radio"+count).checked = true;
// }

//opacidade do scroll

const observers = {}; // Guarda os observers criados por threshold

function getObserver(threshold) {
    if (!observers[threshold]) {
        observers[threshold] = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }  else {
                    entry.target.classList.remove('show');
                }
            });
        }, { threshold: parseFloat(threshold) });
    }
    return observers[threshold];
}

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => {
    const threshold = el.dataset.threshold || '0.5'; // padrão 0.5 se não definido
    const observer = getObserver(threshold);
    observer.observe(el);
});




