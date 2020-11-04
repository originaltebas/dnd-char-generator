var MultiLang = function(path, name, lang, onload) {
    // variables
    this.phrases = {};
    this.selectedLanguage = lang;

    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");

    this.loadLanguage = function(path, name, lang) {
        // load json from url
        if ((typeof path != 'undefined') && (typeof name != 'undefined') && (typeof lang != 'undefined')) {
            req.onreadystatechange = function() {
                if (req.readyState == 4 && req.status == "200") {
                    // load translations
                    this.phrases = JSON.parse(req.responseText);
                }
            }

            req.open("GET", path + "/" + name + "." + lang + ".json", true);
            req.send();
        }
    }

    this.changeLanguage = function(langcode) {

        // si tiene el idioma cargado no hacer nada, sino llamar a loadLang para cargarlo
        if (!this.phrases.hasOwnProperty(langcode)) {
            //uso langcode porque es el que está cambiando
            this.loadLanguage(path, name, langcode)
            this.selectedLanguage = langcode;
            lang = langcode;
        };
    };

    this.getKey = function(key) {
        // get key phrase
        var str;

        // check if any languages were loaded
        if (this.phrases[this.selectedLanguage]) str = this.phrases[this.selectedLanguage][key];

        // if key does not exist, return the literal key
        str = (str || key);

        return str;
    };
}