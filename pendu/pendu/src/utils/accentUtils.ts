export const removeAccents = (str: string): string => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //trouvé et repris depuis reddit
};

export const compareLetters = (letter1: string, letter2: string): boolean => {
    return removeAccents(letter1.toUpperCase()) === removeAccents(letter2.toUpperCase());
};