import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  termino: string='';
  heroes:Heroe[] = [];
  heroeSeleccionado:Heroe | undefined;
  err:boolean=false;
  constructor(private heroesService:HeroesService) { }

  ngOnInit(): void {
  }

  buscarHeroe(){
    this.err=false;
    this.heroesService.getSugerencias(this.termino.trim() )
      .subscribe( heroes => {
        this.heroes=heroes;
        if(this.heroes.length === 0){
          this.err=true;
          this.heroes=[];
        } else {
          
            this.err=false;
        } 
      })
  }

  opcionSeleccionada( event:MatAutocompleteSelectedEvent ){
    if(!event.option.value){
      this.heroeSeleccionado=undefined;
      this.err=true;
      return;
    }
     
    const heroe:Heroe= event.option.value;
    
    event.option.value='';
    this.termino=heroe.superhero;
    this.heroesService.getHeroePorId(heroe.id!).
          subscribe( hero => this.heroeSeleccionado=hero);
    
    }


}
