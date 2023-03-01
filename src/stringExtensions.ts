export function toCapitalization(str: string): string {
    str = str.toLowerCase();
    return str[0].toUpperCase() + str.slice(1);
}

export function fixPunctuation(str: string): string {
    return str.replaceAll(new RegExp("\\s+", "gm"), " ")
        .replaceAll(new RegExp("(\\S)([.,\/#!$%\^&\*;:{}=\-_`~()])(\\S)", "gm"), "$1$2 $3")
        .replaceAll(new RegExp("\\s([.,\/#!$%\^&\*;:{}=\-_`~()])", "gm"), "$1");
}


export function countWordOccurrences(input: string) {
    const result: Record<string, number> = {};

    const arr = input.split(' ');

    for (let word of arr) {
        if (result[word]) {
            result[word]++;
        } else {
            result[word] = 1;
        }
    }

    return result;
}

export function countWords(input: string) {
    const wordsOccurrences = countWordOccurrences(input);
    return Object.values(wordsOccurrences).reduce((prev, current) => current += prev, 0);
}
