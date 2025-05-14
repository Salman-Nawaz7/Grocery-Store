import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ProductService } from './product.service';
import { LoadScriptService } from './load-script.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit{
  title = 'grocery';
constructor(  private loadScript: LoadScriptService) {}
  ngAfterViewInit(): void {
    this.loadScript.loadScript();
  // setTimeout(() => {
    
  // }, 500); // 5000 ms = 5 seconds
}
}
