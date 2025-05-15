import { Component } from '@angular/core';
import { LoadScriptService } from '../load-script.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
   constructor(
    private loadScript: LoadScriptService
  ) {}
ngAfterViewInit(): void {
  console.log('footer script loaded');
    this.loadScript.loadScript();
  }
}
