import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interface/heroes.interface';

@Pipe({
  name: 'imagenHero',
  pure: false
})
export class ImagenHeroPipe implements PipeTransform {
  
  transform(hero: Heroe): string {
    if(hero.alt_img?.length===0) {

      return 'assets/no-image.png';
      
    } else if(hero.alt_img){
      return hero.alt_img;

    }else {
      return `assets/heroes/${hero.id}.jpg`; 
    }
      
    
      
  }

}
