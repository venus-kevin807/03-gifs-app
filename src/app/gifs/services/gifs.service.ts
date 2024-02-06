import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, LOCALE_ID } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
@Injectable({providedIn: 'root'})
export class GifsService {

  public GifList: Gif[]=[]

  private _tagHistory: string[]=[]
  private apiKey: string = '20ZO3jKl7cqERI4sIfK9YBo7hHFWkKcL'
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  constructor( private http: HttpClient ) {
    this.LoadLocalStorage();
    console.log('Gifs service Ready');

  }

  get tagHistory(){
    return [...this._tagHistory]
  }

  private organizeHistory (tag: string){
    tag = tag.toLowerCase();

    if(this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter( (oldTag) => oldTag !== tag )
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this.tagHistory.splice(0, 10);
    this.saveLocalStorage()
  }

  //al recargar la pagina no se perdan los elementos
  private saveLocalStorage(): void{
    localStorage.setItem('history',JSON.stringify( this._tagHistory ))
  }

  //para cargar los datos recargados
  private LoadLocalStorage():void{
    if( !localStorage.getItem('history')) return;

    this._tagHistory = JSON.parse(localStorage.getItem('history')!)

    if(this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory[0])
  }

  searchTag(tag: string):void{
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '12')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe( resp => {

        this.GifList= resp.data;
        //console.log({ gifs: this.GifList });


      } )

  }

}
