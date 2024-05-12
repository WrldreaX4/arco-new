const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
    constructor(container, items, controls){
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
        this.currentIndex = 0;
        this.useControls();
    }

    updateGallery(){
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5','gallery-item-6');
        });
        
        this.carouselArray.slice(0, 6).forEach((el , i) => {
            el.classList.add(`gallery-item-${i+1}`);
        });
    }

    setCurrentState(direction) {
        if (direction === 'next') {
            this.carouselArray.push(this.carouselArray.shift());
        } else if (direction === 'previous') {
            this.carouselArray.unshift(this.carouselArray.pop());
        }
        this.updateGallery();
    }

    useControls(){
        const buttons = this.carouselControls.map(control => {
            const button = document.createElement('button');
            button.carousel = `gallery-controls-${control}`;
            button.innerText = control;
            button.addEventListener('click', () => this.setCurrentState(control));
            galleryControlsContainer.appendChild(button);
            return button;
        });
    }

    setControls(){
        this.carouselControls.forEach(control => {
            galleryControlsContainer.appendChild(document.createElement('button')).carousel = `gallery-controls-${control}`;
            document.querySelector(`.gallery-controls-${control}`).innerText = control;
        });
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.useControls();
exampleCarousel.setControls();
