import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text" class="form-control" placeholder="Buscar gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput
    >
  `
})

export class SearchBoxComponent {
  constructor(private GifsService: GifsService) { }

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  /* searchTag( newTag: string ){ */
    searchTag( ){
    const newTag = this.tagInput.nativeElement.value

    this.GifsService.searchTag(newTag)
    this.tagInput.nativeElement.value = '';


  }
}
