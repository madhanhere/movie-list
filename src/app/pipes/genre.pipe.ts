import { Pipe, PipeTransform } from '@angular/core';
import { Genres } from '../types/Genres';

@Pipe({
  name: 'genre',
})
export class GenrePipe implements PipeTransform {
  transform(value: number[], genres: Genres[] | undefined) {
    let genre = '';

    value.forEach((id: number) => {
        const match: Genres | undefined = genres?.find(g => g.id === id);

        if (match) {
            genre = `${match.name} ,`
        }
    });

    if (!genre.length) {
      return genre;
    }
    
    return genre.slice(0, genre?.length - 2);
  }
}
