import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "image"
})
export class ImagePipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if (!value) {
            return;
        }

        return `https:image.tmdb.org/t/p/w300/${value}`;
    }
}