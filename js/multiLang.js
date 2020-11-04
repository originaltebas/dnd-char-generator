var MultiLang = function(path, name, lang, onload) {
    // variables
    this.phrases = {};

    // keep only first two chareacters, for example 'en-US', 'fr', 'nl-NL', 'it', 'zh' etc.
    this.selectedLanguage = (lang || navigator.language || navigator.userLanguage).substring(0, 5);

    // load json from url
    if (typeof path != 'undefined') {
        if (typeof name != 'undefined') {
            if (typeof lang != 'undefined') {
                var req = new XMLHttpRequest();

                req.onreadystatechange = function() {

                    if (req.readyState == 4) {
                        // load translations
                        this.phrases = JSON.parse(req.responseText);
                    }
                }

                req.open("GET", path + "/" + name + "." + lang + ".json", false);
                req.send();
            }
        }
    }

    this.changeLanguage = function(langcode) {

        // check if language code exists in translations
        if (!this.phrases.hasOwnProperty(langcode)) {
            // if it doesn't exist; default to first language 

            // NOTE: the order of properties in a JSON object are not *guaranteed* to be the same as loading time,
            // however in practice all browsers do return them in order
            for (var key in this.phrases) {
                if (this.phrases.hasOwnProperty(key)) {
                    langcode = key;
                    break;
                };
            };
        };

        // set as selected language code
        this.selectedLanguage = langcode;
    };


    this.get = function(key) {
        // get key phrase
        var str;

        // check if any languages were loaded
        if (this.phrases[this.selectedLanguage]) str = this.phrases[this.selectedLanguage][key];

        // if key does not exist, return the literal key
        str = (str || key);

        return str;
    };
}