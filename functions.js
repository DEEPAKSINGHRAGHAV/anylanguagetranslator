const { CONSTANT } = require("./constant")
const translate = require('@vitalets/google-translate-api');

const waitingFunction = (value) => {
    console.log(`Translating text...`)
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, value);
    });
};

const translateWaiting = async () => {
    if (CONSTANT.TRANSLATE_COUNT < CONSTANT.TRANSLATE_LIMIT_BEFORE_TIMEOUT) {
        CONSTANT.TRANSLATE_COUNT++
        await waitingFunction(CONSTANT.WAIT_PER_TRANSLATE_TIMEOUT)
        return true
    }
    else {
        CONSTANT.TRANSLATE_COUNT = 0
        await waitingFunction(CONSTANT.TRANSLATE_TIMEOUT)
        await translateWaiting()
    }
}

const replaceAndTranslateString = async (keyValPairs, language) => {
    let strArr = []
    keyValPairs.forEach((keyValPair) => {
        strArr.push(keyValPair.original)
    })
    let str = strArr.join("####");
    await translateWaiting()
    str = await translate(str, { to: language, client: CONSTANT.TRANSLATE_CLIENT })
    if (str && str.text) str = str.text
    let correctStr = false
    while (!correctStr) {
        if (str.includes("##") || str.includes("# #") || str.includes("＃＃") || str.includes("＃ ＃")) {
            var mapObj = {
                "##": "#",
                "# #": "#",
                "＃＃": "#",
                "＃ ＃": "#",
            };
            str = str.replace(
                /##|# #|＃＃|＃ ＃/gi,
                function (matched) {
                    return mapObj[matched];
                });
        } else {
            correctStr = true
        }
    }
    strArr = str.split('#');

    if (strArr.length == keyValPairs.length) {
        keyValPairs = keyValPairs.map((keyValPair, index) => {
            if (strArr[index]) {
                strArr[index] = strArr[index].replace("#", "")
                return keyValPair = { key: keyValPair.key, original: keyValPair.original, translated: strArr[index].trim() }
            } else {
                return keyValPair = { key: keyValPair.key, original: keyValPair.original, translated: strArr[index] }
            }
        })
    } else {
        keyValPairs = keyValPairs.map((keyValPair, index) => {
            return keyValPair = { key: keyValPair.key, original: keyValPair.original, translated: keyValPair.original }
        })
    }
    return keyValPairs
}

const loopFunc = (data, ignore, keyValPairs) => {
    for (let elements in data) {
        if (typeof data[elements] === 'object') {
            if (!ignore || !ignore.includes(elements)) {
                loopFunc(data[elements], ignore, keyValPairs);
            }
        } else {
            if (typeof data[elements] === 'string')
                if (!ignore || !ignore.includes(elements)) {
                    keyValPairs.push({ key: elements, original: data[elements] })
                }
        }
    }
    return keyValPairs
}

const loopFuncMap = (data, ignore, newData) => {
    for (let elements in data) {
        if (typeof data[elements] === 'object') {
            if (!ignore || !ignore.includes(elements))
                loopFuncMap(data[elements], ignore, newData);
        } else {
            if (typeof data[elements] === 'string') {
                if (!ignore || !ignore.includes(elements)) {
                    let index = newData.findIndex(d => d.key == elements.toString() && d.original == data[elements])
                    if (index > -1) {
                        data[elements] = newData[index].translated
                    }
                }
            }
        }
    }
    return data
}


const findObjectByLabel = async (data, language, ignore) => {
    try {
        let keyValPairs = []
        keyValPairs = loopFunc(data, ignore, keyValPairs)
        if (keyValPairs.length > 0) {
            let output = await replaceAndTranslateString(keyValPairs, language)
            data = loopFuncMap(data, ignore, output)
        }
        return data
    } catch (error) {
        throw errorFn(error)
    }
}

const anylanguagetranslator = async (data, language, ignoreKeyNameArray) => {
    try {
        if (language && language !== "en") {
            if (typeof data === "object") {
                await findObjectByLabel(data, language, ignoreKeyNameArray)
                return data
            } else if (typeof data === "string") {
                await translateWaiting()
                let translatedData = await translate(data, { to: language, client: CONSTANT.TRANSLATE_CLIENT })
                if (translatedData && translatedData.text) data = translatedData.text
                return data
            } else {
                return data
            }
        } else {
            return data
        }
    } catch (error) {
        throw errorFn(error)
    }
}


module.exports = {
    anylanguagetranslator
};