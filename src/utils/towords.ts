const units = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const teens = ['', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const bigUnits = ['', 'Thousand', 'Million', 'Billion'];

function processSegment(segment) {
    let words = '';

    const hundreds = Math.floor(segment / 100);
    const remainder = segment % 100;
    const tensValue = Math.floor(remainder / 10);
    const unitsValue = remainder % 10;

    if (hundreds) {
        words += `${units[hundreds]} Hundred `;
    }

    if (tensValue >= 2) {
        words += `${tens[tensValue]} `;
        if (unitsValue) {
            words += `${units[unitsValue]} `;
        }
    } else if (tensValue === 1 && unitsValue > 0) {
        words += `${teens[unitsValue]} `;
    } else if (unitsValue || (!unitsValue && !tensValue && !hundreds)) {
        words += `${units[unitsValue]} `;
    }

    return words.trim();
}

function processDecimal(decimal) {
    return decimal.split('').map(digit => units[parseInt(digit, 10)]).join(' ');
}

function processCents(decimal) {
    const tensDigit = decimal.charAt(0);
    const unitsDigit = decimal.charAt(1);

    if (tensDigit === '1' && unitsDigit === '0') {
        return 'Ten';
    }

    let tensWord = tens[tensDigit];
    let unitsWord = units[unitsDigit];

    if (tensDigit === '1' && unitsDigit !== '0') {
        // Handle teens
        return teens[unitsDigit];
    }

    // Handle tens and units separately, but don't add a space if unitsWord is 'Zero'
    return `${tensWord} ${unitsWord !== 'Zero' ? unitsWord : ''}`.trim();
}




function processIntegralPart(integral) {
    let words = '';
    let segmentValue = Math.floor(integral / 1000000000);
    if (segmentValue) {
        words += `${processSegment(segmentValue)} Billion `;
    }

    integral %= 1000000000;
    segmentValue = Math.floor(integral / 1000000);
    if (segmentValue) {
        words += `${processSegment(segmentValue)} Million `;
    }

    integral %= 1000000;
    segmentValue = Math.floor(integral / 1000);
    if (segmentValue) {
        words += `${processSegment(segmentValue)} Thousand `;
    }

    integral %= 1000;
    segmentValue = integral;
    if (segmentValue) {
        words += processSegment(segmentValue);
    }

    return words.trim();
}

export function numberToWords(num) {
    if (typeof num === 'number') {
        num = num.toFixed(2).toString();  // Ensure two decimal places
    }

    const [integral, decimal] = num.split('.');

    let words = '';
    if (integral) {
        words += processIntegralPart(parseInt(integral, 10));
    }

    if (decimal && decimal !== '00') {
        const centsWords = processCents(decimal);
        words += ` euros and ${centsWords} cents`;
    } else {
        words += ` euros`;
    }

    return words.trim();
}

// Example usage:
// console.log(numberToWords(234234.30));  // Output: 'Two Hundred Thirty-Four Thousand Two Hundred Thirty-Four point Three Zero'
// console.log(numberToWords(3234424.32));  // Output: 'Three Million Two Hundred Thirty-Four Thousand Four Hundred Twenty-F
