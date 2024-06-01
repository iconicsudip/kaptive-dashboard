/**
 * Formats a number according to the Indian numbering system.
 * 
 * @param {number|string} number - The number to format.
 * @returns {string} - The formatted number as a string.
 * 
 * @example
 * formatNumberToIndian(12345678.90); // "1,23,45,678.90"
 * formatNumberToIndian("9876543210"); // "98,76,54,3210"
 */
export const formatNumberToIndian = (number: string | number) => {
    if (number === null || number === undefined) {
        throw new Error("Input cannot be null or undefined");
    }

    // Convert the input to a string
    const numStr = number.toString();

    // Split the input string into integer and decimal parts
    const [intPart, decPart] = numStr.split('.');

    // Handle negative numbers
    const isNegative = intPart.startsWith('-');
    const absIntPart = isNegative ? intPart.slice(1) : intPart;

    // Format the integer part according to Indian numbering system
    let formattedIntPart = absIntPart.replace(/\B(?=(\d{2})+(?!\d))/g, ',');

    // Prepend negative sign if the original number was negative
    if (isNegative) {
        formattedIntPart = '-' + formattedIntPart;
    }

    // Combine the formatted integer part with the decimal part, if any
    return decPart ? `${formattedIntPart}.${decPart}` : formattedIntPart;
};