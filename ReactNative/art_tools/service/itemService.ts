export function shortenDescription(description:string){
    return description.length > 30? description.substring(0, 30) + "..." : description;
}