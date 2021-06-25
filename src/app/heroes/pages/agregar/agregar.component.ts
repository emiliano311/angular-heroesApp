import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";

import { HeroesService } from '../../services/heroes.service';
import { Heroe,Publisher } from '../../interface/heroes.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `img {
      width:100%;
      border-radius:5px;
    }`
  ]
})
export class AgregarComponent implements OnInit {

  publishers=[
    {
      id:'DC Comics',
      desc: 'DC-Comics'
    },
    {
      id:'Marvel Comics',
      desc:'Marvel-Comics'
    }
  ];

  heroe:Heroe={
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher:Publisher.DCComics,
    alt_img:''
  }
  constructor(private heroesService:HeroesService,
              private activateRoute:ActivatedRoute,
              private router:Router,
              private snackBar:MatSnackBar,
              private dialog:MatDialog ) { }

  ngOnInit(): void {
    //si el url incluye la palabra editar
    if(this.router.url.includes('editar')){
      
      this.activateRoute.params
          .pipe( switchMap(({id}) => this.heroesService.getHeroePorId(id)))
          .subscribe( heroe => this.heroe= heroe );
    }
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id){
      //actualizo si tiene id
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe( heroe => this.mostrarSnackBar('Registro actualizado!'));
    } else {
      //crear nuevo registro
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe( hero =>{
          this.mostrarSnackBar('Registro creado!');
          //cuando inserto navego
          this.router.navigate(['/heroes/editar',hero.id]); 
        })
    }

  }

  borrarHeroe(){
    const dialog = this.dialog.open(ConfirmarComponent, {
      width:'250px',
      data: this.heroe
    });
    dialog.afterClosed().subscribe(
      resp => {
        if(resp){
          this.heroesService.borrarHeroe(this.heroe.id!)
          .subscribe( res =>{
            this.router.navigate(['/heroes'])
          })
        } 
      }
    )
   
  }

  mostrarSnackBar( mensaje:string):void{
    this.snackBar.open(mensaje,'Cerrar',{
      duration:3000
    });
  }
}
