import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadScriptService {

  constructor() { }
  initScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(`Failed to load ${url}`);
    document.body.appendChild(script);
  });
}
// new change 
loadScript(): void {
   this.initScript('js/main.js').then(() => {console.log('main.js loaded');}).catch(err => {console.error(err);console.log('main.js not loaded');});
  //  this.initScript('libs/jquery/jquery.js').then(() => {console.log('jquery.js loaded');}).catch(err => {console.error(err);console.log('jquery.js not loaded');});
  this.initScript('libs/bootstrap/js/bootstrap.js').then(() => {console.log('bootstrap.js loaded');}).catch(err => {console.error(err);console.log('bootstrap.js not loaded');});
  this.initScript('libs/jquery.countdown/jquery.countdown.js').then(() => {console.log('jquery.countdown.js loaded');}).catch(err => {console.error(err);console.log('jquery.countdown.js not loaded');});
  this.initScript('libs/nivo-slider/js/jquery.nivo.slider.js').then(() => {console.log('jquery.nivo.slider.js loaded');}).catch(err => {console.error(err);console.log('jquery.nivo.slider.js not loaded');});
 
  this.initScript('libs/owl.carousel/owl.carousel.min.js');
  this.initScript('libs/slider-range/js/tmpl.js').then(() => {console.log('tmpl.js loaded');}).catch(err => {console.error(err);console.log('tmpl.js not loaded');});
  this.initScript('libs/slider-range/js/jquery.dependClass-0.1.js').then(() => {console.log('jquery.dependClass-0.1.js loaded');}).catch(err => {console.error(err);console.log('jquery.dependClass-0.1.js not loaded');});
  this.initScript('libs/slider-range/js/draggable-0.1.js').then(() => {console.log('draggable-0.1.js loaded');}).catch(err => {console.error(err);console.log('draggable-0.1.js not loaded');});
  this.initScript('libs/slider-range/js/jquery.slider.js').then(() => {console.log('jquery.slider.js loaded');}).catch(err => {console.error(err);console.log('jquery.slider.js not loaded');});
  this.initScript('libs/elevatezoom/jquery.elevatezoom.js').then(() => {console.log('jquery.elevatezoom.js loaded');}).catch(err => {console.error(err);console.log('jquery.elevatezoom.js not loaded');})
  
  // Dynamically load the script after the page is ready
  // this.initScript('libs/owl.carousel/owl.carousel.min.js').then(() => {console.log('owl.carousel.min.js loaded');}).catch(err => {console.error(err);console.log('owl.carousel.min.js not loaded');});
//   setTimeout(() => {
//       .then(() => {
//       console.log('owl.carousel.min.js loaded');
//     })
//     .catch(err => {
//       console.error(err);
//       console.log('owl.carousel.min.js not loaded');
//     });
// }, 1000); // Adjust delay (in milliseconds) as needed

 
}
}
