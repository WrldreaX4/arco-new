import { Component, AfterViewInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CreateformComponent } from '../createform/createform.component';
import { SummaryComponent } from '../summary/summary.component';
import { ProfileComponent } from '../profile/profile.component';
import { FlipbookComponent } from '../flipbook/flipbook.component';
import { ReportComponent } from '../report/report.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterModule, RouterOutlet, NavbarComponent, CreateformComponent, ProfileComponent, FlipbookComponent, ReportComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // corrected to styleUrls
})
export class DashboardComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.initCarousel();
  }

  initCarousel() {
    const $ = (str: string) => document.querySelector(str);
    const $$ = (str: string) => document.querySelectorAll(str);

    const carousel = {
      removeClass(el: HTMLElement, classname: string = '') {
        if (el) {
          if (classname === '') {
            el.className = '';
          } else {
            el.classList.remove(classname);
          }
          return el;
        }
        return null;
      },
      reorder() {
        const carouselElement = $("#carousel");
        if (carouselElement) {
          const childcnt = carouselElement.children.length;
          const childs = carouselElement.children;
          for (let j = 0; j < childcnt; j++) {
            const child = childs[j] as HTMLElement;
            if (child) {
              child.dataset['pos'] = j.toString();
            }
          }
        }
      },
      move(el: HTMLElement | string) {
        let selected = el as HTMLElement;
        if (typeof el === 'string') {
          const selectedElement = $(".selected");
          if (selectedElement) {
            selected = (el === 'next') ? selectedElement.nextElementSibling as HTMLElement : selectedElement.previousElementSibling as HTMLElement;
          }
        }
        const curpos = parseInt((carouselState.selected as HTMLElement).dataset?.['pos'] || '0');
        const tgtpos = parseInt(selected.dataset?.['pos'] || '0');
        const cnt = curpos - tgtpos;
        const dir = (cnt < 0) ? -1 : 1;
        const shift = Math.abs(cnt);
        const carouselElement = $("#carousel");
        if (carouselElement) {
          for (let i = 0; i < shift; i++) {
            const element = (dir === -1) ? carouselElement.firstElementChild as HTMLElement : carouselElement.lastElementChild as HTMLElement;
            if (element) {
              if (dir === -1) {
                element.dataset['pos'] = (carouselElement.children.length).toString();
                carouselElement.append(element);
              } else {
                element.dataset['pos'] = '0';
                carouselElement.prepend(element);
              }
              carousel.reorder();
            }
          }
        }
        carouselState.selected = selected;

        const next = selected.nextElementSibling as HTMLElement;
        const prev = selected.previousElementSibling as HTMLElement;
        const parentElement = selected.parentElement;
        
        if (parentElement) {
            const prevSecond = prev ? prev.previousElementSibling as HTMLElement : parentElement.lastElementChild as HTMLElement;
            const nextSecond = next ? next.nextElementSibling as HTMLElement : parentElement.firstElementChild as HTMLElement;
        
            selected.className = '';
            selected.classList.add('selected');
            
            if (prev) {
                carousel.removeClass(prev)?.classList.add('prev');
            }
            
            if (next) {
                carousel.removeClass(next)?.classList.add('next');
            }
        
            if (nextSecond) {
                carousel.removeClass(nextSecond)?.classList.add('nextRightSecond');
            }
        
            if (prevSecond) {
                carousel.removeClass(prevSecond)?.classList.add('prevLeftSecond');
            }
        
            carousel.nextAll(nextSecond)?.forEach(item => { 
                if (item) {
                    carousel.removeClass(item)?.classList.add('hideRight'); 
                }
            });
        
            carousel.prevAll(prevSecond)?.forEach(item => { 
                if (item) {
                    carousel.removeClass(item)?.classList.add('hideLeft'); 
                }
            });
        }
      },
      nextAll(el: HTMLElement) {
        const els = [];
        if (el) {
          while (el = el.nextElementSibling as HTMLElement) { els.push(el); }
        }
        return els;
      },
      prevAll(el: HTMLElement) {
        const els = [];
        if (el) {
          while (el = el.previousElementSibling as HTMLElement) { els.push(el); }
        }
        return els;
      },
      keypress(e: KeyboardEvent) {
        switch (e.key) {
          case 'ArrowLeft':
            carousel.move('prev');
            break;
          case 'ArrowRight':
            carousel.move('next');
            break;
          default:
            return;
        }
        e.preventDefault();
        return false;
      },
      select(e: MouseEvent) {
        let tgt = e.target as HTMLElement;
        while (tgt.parentElement && !tgt.parentElement.classList.contains('carousel')) {
            tgt = tgt.parentElement as HTMLElement;
        }
        if (tgt.parentElement) {
            carousel.move(tgt);
        } else {
            console.error("Parent element with class 'carousel' not found.");
        }
    },
      previous(e: MouseEvent) {
        carousel.move('prev');
      },
      next(e: MouseEvent) {
        carousel.move('next');
      },
      doDown(e: MouseEvent | TouchEvent) {
        const event = 'touches' in e ? e.touches[0] : e;
        carouselState.downX = event.clientX;
      },
      doUp(e: MouseEvent | TouchEvent) {
        const event = 'changedTouches' in e ? e.changedTouches[0] : e;
        if (carouselState.downX) {
            const direction = (carouselState.downX > event.clientX) ? -1 : 1;
            if (Math.abs(carouselState.downX - event.clientX) < 10) {
                carousel.select(e as MouseEvent);
                return false;
            }
            if (direction === -1) {
                carousel.move('next');
            } else {
                carousel.move('prev');
            }
            carouselState.downX = 0;
        }
        return; // Ensure that the function always returns a value
    },
      init() {
        document.addEventListener('keydown', carousel.keypress);
        const carouselElement = document.getElementById('carousel');
        if (carouselElement) {
            carouselElement.addEventListener('mousedown', carousel.doDown);
            carouselElement.addEventListener('touchstart', carousel.doDown);
            carouselElement.addEventListener('mouseup', carousel.doUp);
            carouselElement.addEventListener('touchend', carousel.doUp);
            carousel.reorder();
        } else {
            console.error('Carousel element not found.');
        }
    
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        if (prevButton) {
            prevButton.addEventListener('click', carousel.previous);
        } else {
            console.error('Previous button not found.');
        }
        if (nextButton) {
            nextButton.addEventListener('click', carousel.next);
        } else {
            console.error('Next button not found.');
        }
    
        carouselState.selected = document.querySelector('.selected') as HTMLElement;
    }
    };

    const carouselState: { selected: HTMLElement | null, downX: number } = {
      selected: null,
      downX: 0
    }

    carousel.init();
  }
}
