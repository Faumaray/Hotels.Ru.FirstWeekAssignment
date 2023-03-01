function isSmaller(str1: string, str2: string): boolean {
    let n1 = str1.length, n2 = str2.length;

    if (n1 < n2)
        return true;
    if (n2 < n1)
        return false;

    for (let i = 0; i < n1; i++) {
        if (str1.charCodeAt(i) < str2.charCodeAt(i))
            return true;
        else if (str1.charCodeAt(i) > str2.charCodeAt(i))
            return false;
    }
    return false;
}



export function multiply(a: string, b: string): string {
    if (a === "0" || b === "0") {
        return "0";
    }

    let m = a.length - 1;
    let n = b.length - 1;
    let carry = 0;
    let product = "";
    let hasMinus = false;
    if (a.startsWith('-') && b.startsWith('-')) {
        a = a.replace('-', '');
        m -= 1;
        b = b.replace('-', '');
        n -= 1;
    } else if (a.startsWith('-')) {
        a = a.replace('-', '');
        m -= 1;
        hasMinus = true;

    } else if (b.startsWith('-')) {
        b = b.replace('-', '');
        n -= 1;
        hasMinus = true;
    }

    for (let i = 0; i <= m + n; i++) {
        for (let j = Math.max(0, i - n); j <= Math.min(i, m); j++) {
            carry += (a[m - j].charCodeAt(0) - 48) * (b[n - i + j].charCodeAt(0) - 48);
        }
        product += (carry % 10).toString();
        carry = Math.floor(carry / 10);
    }

    product = product.split("").reverse().join("");
    return hasMinus ? '-' + product : product;
}

export function substract(str1: string, str2: string): string {
    let str = "";

    let gonnaBeNegative = false;
    if (str1.startsWith('-') && str2.startsWith('-')) {
        gonnaBeNegative = true;
        str1 = str1.replace('-', '');
        str2 = str2.replace('-', '');
    }
    else if (str1.startsWith('-')) {
        str1 = str1.replace('-', '');
        return '-' + summarize(str1, str2);
    }
    else if (str2.startsWith('-')) {
        str2 = str2.replace('-', '');
        return summarize(str1, str2);
    }

    if (isSmaller(str1, str2)) {
        let t = str1;
        str1 = str2;
        str2 = t;
        gonnaBeNegative = !gonnaBeNegative;
    }

    let n1 = str1.length, n2 = str2.length;
    let diff = n1 - n2;

    let carry = 0;

    for (let i = n2 - 1; i >= 0; i--) {
        let sub = ((str1.charCodeAt(i + diff) -
            '0'.charCodeAt(0))
            - (str2.charCodeAt(i) -
                '0'.charCodeAt(0)) - carry);
        if (sub < 0) {
            sub = sub + 10;
            carry = 1;
        }
        else
            carry = 0;

        str += sub.toString();
    }

    for (let i = n1 - n2 - 1; i >= 0; i--) {
        if (str1[i] == '0' && carry > 0) {
            str += "9";
            continue;
        }
        let sub = ((str1.charCodeAt(i) -
            '0'.charCodeAt(0)) - carry);
        if (i > 0 || sub > 0)
            str += sub.toString();
        carry = 0;
    }

    let aa = str.split('');
    aa.reverse();
    return gonnaBeNegative ? '-' + aa.join("") : aa.join("");
}


export function summarize(first: string, second: string): string {
    if (first.startsWith('-') && second.startsWith('-')) {
        second = second.replace('-', '');
        return substract(first, second);
    } else if (first.startsWith('-')) {
        first = first.replace('-', '');
        return substract(second, first);
    } else if (second.startsWith('-')) {
        second = second.replace('-', '');
        return substract(first, second);
    }

    if (isSmaller(first, second)) {
        return summarize(second, first);
    }

    var sum = '';
    var carry = 0;
    var diff = second.length - first.length;
    for (let i = first.length - 1; i >= 0; i--) {
        var temp =
            (Number(first.charAt(i)) % 10) +
            (Number(second.charAt(i + diff)) % 10) +
            carry;
        if (temp >= 10) {
            sum = (temp % 10) + sum;
            carry = Math.floor(temp / 10);
        } else {
            sum = temp + sum;
            carry = 0;
        }
    }
    if (carry) {
        sum = carry + sum;
    }
    return sum;
}

export function division(number: string, divisor: string): string {
    let isNegative = false;
    if (number.startsWith('-') && divisor.startsWith('-')) {
        number = number.replace("-", "");
        divisor = divisor.replace("-", "");
    } else if (number.startsWith('-')) {
        number = number.replace("-", "");
        isNegative = true;
    } else if (divisor.startsWith('-')) {
        divisor = divisor.replace("-", "");
        isNegative = true;
    }
    let ans = "";
    let divisor_num = Number(divisor);
    let idx = 0;
    let temp = Number(number[idx]);
    while (temp < divisor_num) {
        temp = (temp * 10 +
            String(number[idx + 1]).charCodeAt(0) -
            ('0').charCodeAt(0));
        idx += 1;
    }
    idx += 1;

    while (number.length > idx) {
        ans += String.fromCharCode
            (Math.floor(temp / divisor_num) +
                ('0').charCodeAt(0));

        temp = ((temp % divisor_num) * 10 +
            (number[idx]).charCodeAt(0) -
            ('0').charCodeAt(0));
        idx += 1;
    }

    ans += String.fromCharCode
        (Math.floor(temp / divisor_num) +
            ('0').charCodeAt(0));

    if (ans.length == 0)
        return "0";
    if (isNegative) {
        ans = "-" + ans;
    }
    return ans;
}
