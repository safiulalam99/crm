export function numberToWords(num) {
    if (num === 0) return 'zero';

    const belowTwenty = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const chunks = ['billion', 'million', 'thousand', ''];

    const threeDigitsToWords = (n) => {
        if (n === 0) return '';
        else if (n < 20) return belowTwenty[n];
        else if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? '-' + belowTwenty[n % 10] : '');
        else return belowTwenty[Math.floor(n / 100)] + ' hundred' + (n % 100 !== 0 ? ' ' + threeDigitsToWords(n % 100) : '');
    };

    const integerPartToWords = (n) => {
        let result = [];
        for (let chunk of chunks) {
            if (n === 0) break;
            if (n % 1000 !== 0) {
                result.unshift(threeDigitsToWords(n % 1000) + (chunk ? ' ' + chunk : ''));
            }
            n = Math.floor(n / 1000);
        }
        return result.join(' ').trim();
    };

    const fractionalPartToWords = (fractionalPart) => {
        if (!fractionalPart) return '';
        let denom = Math.pow(10, fractionalPart.length);
        let fracAsNumber = parseInt(fractionalPart, 10);
        if (denom === 10) return threeDigitsToWords(fracAsNumber) + ' tenth';
        if (denom === 100) return threeDigitsToWords(fracAsNumber) + ' hundredths';
    };

    const parts = num.toString().split('.');
    const integerPart = parts[0];
    const fractionalPart = parts[1];

    let words = integerPartToWords(parseInt(integerPart, 10));
    if (fractionalPart) {
        words += ' and ' + fractionalPartToWords(fractionalPart);
    }

    return words;
}

// Test the function
