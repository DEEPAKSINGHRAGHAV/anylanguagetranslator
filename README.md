# This is language translate package

> **`Translate without any api key or translationApiKey`**

This package can translate **english language** into **77 languages** using language **iso639_1 codes**. This can translate any json(only its string) or string text and can give a response in 3 seconds. This package uses asynchronous calls to traverse and translate much father than translating each string at a time in entire json.

## Getting started

To use it in `node.js` first install it:

```
npm install anylanguagetranslator
```

Then import it to use it:

```
const anylanguagetranslator = require('anylanguagetranslator'); // Older ways
import anylanguagetranslator from 'anylanguagetranslator';  // ES6
```

Also it can have a parameter that can ignore any key in json while translating.

### Syntax:

```
// This package provide function
anylanguagetranslator(data, language, ignoreKeyNameArray)
```

### Sample Code:

#### anylanguagetranslator(data, language, ignoreKeyNameArray):

```
const myFunction = async() => {
    let data = {
        id: 2,
        name: "abc",
        address: "some place",
        token: "qwertyuiopas56dgj"
    }

   data = await anylanguagetranslator(data, "es", ["name", "token"])

   console.log("translated object: ", data)
   // It will display the translate object

    /*-------------------------------------------*/

    let data2 = "Hello world"
    data2 = await anylanguagetranslator(data2, "fr")

    console.log("translated string: ", data2)
   // It will display the translate string
}

// Calling myFunction()
myFunction()

// Note: This will not translate ignoreKeyNameArray
```

### Languages it translate

|         Name         | iso639_1 |
| :------------------: | :------: |
|        Pashto        |    ps    |
|        Uzbek         |    uz    |
|       Swedish        |    sv    |
|       Albanian       |    sq    |
|        Arabic        |    ar    |
|       English        |    en    |
|       Catalan        |    ca    |
|      Portuguese      |    pt    |
|       Russian        |    ru    |
|       Spanish        |    es    |
|       Armenian       |    hy    |
|        Dutch         |    nl    |
|       Punjabi        |    pa    |
|        German        |    de    |
|     Azerbaijani      |    az    |
|       Bengali        |    bn    |
|      Belarusian      |    be    |
|        French        |    fr    |
|       Bosnian        |    bs    |
|       Croatian       |    hr    |
|       Serbian        |    sr    |
|      Norwegian       |    no    |
|        Malay         |    ms    |
|      Bulgarian       |    bg    |
|        Khmer         |    km    |
|       Turkish        |    tr    |
| Chinese (Simplified) |    zh    |
|       Swahili        |    sw    |
|        Greek         |    el    |
|        Czech         |    cs    |
|        Slovak        |    sk    |
|        Danish        |    da    |
|       Estonian       |    et    |
|       Amharic        |    am    |
|        Hindi         |    hi    |
|         Urdu         |    ur    |
|       Finnish        |    fi    |
|       Georgian       |    ka    |
|      Ukrainian       |    uk    |
|    Haitian Creole    |    ht    |
|       Italian        |    it    |
|      Hungarian       |    hu    |
|      Icelandic       |    is    |
|      Indonesian      |    id    |
|       Persian        |    fa    |
|        Irish         |    ga    |
|        Hebrew        |    he    |
|       Japanese       |    ja    |
|        Kazakh        |    kk    |
|        Kyrgyz        |    ky    |
|         Lao          |    lo    |
|       Latvian        |    lv    |
|       Sesotho        |    st    |
|      Lithuanian      |    lt    |
|      Macedonian      |    mk    |
|       Malagasy       |    mg    |
|       Chichewa       |    ny    |
|       Maltese        |    mt    |
|       Romanian       |    ro    |
|      Mongolian       |    mn    |
|  Myanmar (Burmese)   |    my    |
|      Afrikaans       |    af    |
|        Nepali        |    ne    |
|        Maori         |    mi    |
|        Korean        |    ko    |
|        Polish        |    pl    |
|        Tamil         |    ta    |
|      Slovenian       |    sl    |
|        Somali        |    so    |
|        Xhosa         |    xh    |
|         Zulu         |    zu    |
|       Sinhala        |    si    |
|        Tajik         |    tg    |
|         Thai         |    th    |
|      Vietnamese      |    vi    |
|        Shona         |    sn    |
