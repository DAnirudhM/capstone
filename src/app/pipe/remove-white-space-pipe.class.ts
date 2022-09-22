import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'removewhitespaces'
})
export class RemoveWhiteSpacePipe  implements PipeTransform{
    transform(value: any, ...args: any[]): string {
        return value.replace(/ /g, '');
    }
}
