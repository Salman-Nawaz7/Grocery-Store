import { AfterViewInit, Component, inject, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HeadComponent } from "../head/head.component";
import { FooterComponent } from "../footer/footer.component";
import { ScriptLoaderService } from '../shared/script-loader.service';
declare var yourJqueryFunction: any;
@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HeadComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  

// scriptLoader=inject(ScriptLoaderService)

// ngAfterViewInit() {
//     this.scriptLoader.load(
//         "../libs/jquery/jquery.js",
//               "../libs/bootstrap/js/bootstrap.js",
//               "../libs/jquery.countdown/jquery.countdown.js",
//               "../libs/nivo-slider/js/jquery.nivo.slider.js",
//               "../libs/owl.carousel/owl.carousel.min.js",
//               "../libs/slider-range/js/tmpl.js",
//               "../libs/slider-range/js/jquery.dependClass-0.1.js",
//               "../libs/slider-range/js/draggable-0.1.js",
//               "../libs/slider-range/js/jquery.slider.js",
//               "../libs/elevatezoom/jquery.elevatezoom.js",
//               "../js/main.js"
//     );
// }
   
}
