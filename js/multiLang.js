var MultiLang = function(path, name, lang, onload) {
    // variables
    this.phrases = {};
    this.selectedLanguage = lang;

    var req = new XMLHttpRequest();

    this.loadLanguage = function(path, name, lang) {
        // load json from url
        if ((typeof path != 'undefined') && (typeof name != 'undefined') && (typeof lang != 'undefined')) {
            req.onreadystatechange = function() {
                if (req.readyState == 4 && req.status == "200") {
                    // load translations
                    this.phrases = JSON.parse(req.responseText);
                }
            }

            req.open("GET", path + "/" + name + "." + lang + ".json", false);
            req.send();
        }
    }

    this.changeLanguage = function(langcode) {

        // si tiene el idioma cargado no hacer nada, sino llamar a loadLang para cargarlo
        if (!this.phrases.hasOwnProperty(langcode)) {
            this.loadLanguage(path, name, lang)
            this.selectedLanguage = langcode;
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