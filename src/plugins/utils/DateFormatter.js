const formatConfig = {
    y(date, length) {
        return date.getFullYear().toString().substr(-length, length);
    },
    /**
     * @return {string}
     */
    M(date, length) {
        let month = date.getMonth() + 1;
        return length === 1 ? month.toString() : prefixZero(month, 2);
    },
    d(date, length) {
        let dateNum = date.getDate();
        return length === 1 ? dateNum.toString() : prefixZero(dateNum, 2);
    },
    /**
     * @return {string}
     */
    H(date, length) {
        let hour = date.getHours();
        return length === 1 ? hour.toString() : prefixZero(hour, 2);
    },
    m(date, length) {
        let minutes = date.getMinutes();
        return length === 1 ? minutes.toString() : prefixZero(minutes, 2);
    },
    s(date, length) {
        let seconds = date.getSeconds();
        return length === 1 ? seconds.toString() : prefixZero(seconds, 2);
    },
    /**
     * @return {string}
     */
    S(date, length) {
        let milliseconds = date.getMilliseconds();
        return milliseconds.toString().substr(0, length);
    },
};

function prefixZero(number, length) {
    let result = [];
    let numberLength = number.toString().length;
    for (let i = 0; i < length - numberLength; i++) {
        result.push("0");
    }
    result.push(number);
    return result.join("");
}

function dateFormat(date, pattern) {
    let formatDate;
    if (!pattern) {
        throw new SyntaxError("pattern is null");
    }
    if (date instanceof Date) {
        formatDate = date;
    } else if (date instanceof Number) {
        formatDate = new Date(formatDate);
    } else {
        throw new TypeError("Cannot convert date to Date");
    }
    let resultArray = [];
    let patternLength = pattern.length;
    let nowLetter = "";
    let repeatLength = 0;
    for (let i = 0; i < patternLength; i++) {
        let itemLetter = pattern[i];
        if (itemLetter === nowLetter) {
            repeatLength++;
        } else {
            if (formatConfig[nowLetter]) {
                resultArray.push(formatConfig[nowLetter](date, repeatLength));
            }
            if (formatConfig[itemLetter]) {
                nowLetter = itemLetter;
                repeatLength = 1;
            } else {
                nowLetter = "";
                repeatLength = 0;
                resultArray.push(itemLetter);
            }
        }
    }
    if (formatConfig[nowLetter]) {
        resultArray.push(formatConfig[nowLetter](date, repeatLength));
    }
    return resultArray.join("");
}

export default dateFormat;