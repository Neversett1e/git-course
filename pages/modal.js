const STYLE_LINK = 'modal.css';
const MODAL_TEMPLATE = `
<section id="container" class="modal-container modal-none">
<div id="modal" class="modal">
    <img id="image" class="modal__image" src="" alt="target image">
    <div class="modal__closer">x</div>
</div>
</section>`;

window.addEventListener('DOMContentLoaded', () => {
    loadStyles(getScriptPath() + STYLE_LINK);
    document.body.insertAdjacentHTML('afterbegin', MODAL_TEMPLATE);
    const modalContainer = document.querySelector('#container');
    const modalDiv = document.querySelector('#modal');
    modalContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-container') || e.target.classList.contains('modal__closer')) {
            modalContainer.classList.add('modal-none');
        }
    });
    const modalImg = modalDiv.querySelector('#image');

    const imgContainer = document.querySelector('#images');
    imgContainer.addEventListener('click', (e) => {
        if (e.target.tagName !== 'IMG') return;

        setAndFitImage(e.target.src, modalDiv, modalImg);
        modalContainer.classList.remove('modal-none');
    });
});

function getScriptPath() {
    const script = document.querySelector('#imgViewer');
    const path = script.src.split('?')[0];
    return path.split('/').slice(0, -1).join('/')+'/';
}

function loadStyles(link = '') {
    const head = document.querySelector('head');

    head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${link}">`);
}

function setAndFitImage(url, container, image) {
    const img = new Image();
    img.src = url;

    container.style.width = img.width + 'px';
    container.style.height = img.height + 'px';

    if (img.height >= window.screen.height && img.height >= img.width) {
        container.style.width = 'auto';
        container.style.height = img.width * window.screen.height * 0.6 / img.height + 'px';
        container.style.height = window.screen.height * 0.8 + 'px';
    }
    else if (img.width >= window.screen.width && img.height <= img.width) {
        container.style.height = img.height * window.screen.width * 0.6 / img.width + 'px';
        container.style.width = window.screen.width * 0.6 + 'px';
    }
    
    image.src = url;
}

