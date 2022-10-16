const inputsAreNumbers = (arrayOfInputs) => {
    let i = 0;
    let includesNumbers = false;

    while(i < arrayOfInputs.length && !includesNumbers) {
        if(typeof arrayOfInputs[i] != 'number') {
            includesNumbers = true;
        } 
        
        i++;
    }

    return !includesNumbers;
}

const doIfNumber = (arrayOfInputs, doCallback) => {
    if(inputsAreNumbers(arrayOfInputs)) {
        return doCallback();
    } else {
        throw new Error('Error with add operation. Accepts numbers only')
    }
}

module.exports = doIfNumber;