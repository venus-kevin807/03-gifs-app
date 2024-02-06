import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @ViewChild('txtTagBtn')
  public TagBtn!: ElementRef<HTMLInputElement>;

  constructor(
    private GifsService: GifsService
  ){}

  get tags(): string[]{
    return this.GifsService.tagHistory;
  }

  searchTag(tag: string) {
    this.GifsService.searchTag(tag);

    this.TagBtn.nativeElement.value = '';

  }
}
