import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {

  ngOnInit(): void {
    if(!this.url) throw new Error('URL PROPERTY IS REQUIRED');
  }

  @Input()
  public url!: string

  @Input()
  public alt: string = ''

  public hasLoader: boolean = false;

  OnLoad(){
    setTimeout(() => {
      this.hasLoader = true;
    }, 1000);

  }
}
