class multiLanguages {
    // Variables
    filePath = '';
    fileName = '';
    countryCode = 'es_ES';
    actualPhrases = {};
    cachedPhrases = {};

    constructor(filePath, fileName, countryCode) {
        this.filePath = filePath;
        this.fileName = fileName;
        this.countryCode = countryCode;
    }

    async loadData() {
        if ((typeof this.filePath != 'undefined') && (typeof this.fileName != 'undefined') && (typeof this.countryCode != 'undefined')) {
            const response = await fetch(this.filePath + '/' + this.fileName + '.' + this.countryCode + '.json');
            this.actualPhrases = await response.json();
        } else {
            console.log('Clase No inicializada');
        }
    }

    getKey(key) {
        var str;

        if (this.actualPhrases[this.countryCode]) str = this.actualPhrases[this.countryCode][key];

        str = (str || key);

        return str;
    }

    changeLanguage(langcode) {
        //Si no tiene cargado ese idioma
        if (!this.actualPhrases.hasOwnProperty(langcode)) {
            //que se fije si lo tiene en cache
            if (!this.cachedPhrases.hasOwnProperty(langcode)) {
                //si tampoco está, entonces cargarlo.
                this.countryCode = langcode;
                this.loadData();
            } else {
                //si lo tiene en cache
                temp = {}
                temp = this.actualPhrases;
                this.actualPhrases = this.cachedPhrases;
                this.cachedPhrases = temp;
            }
        } else {
            //es el mismo idioma que está cargado. No hace nada pero avisa por consola
            console.log('Mismo idioma cargado')
        }
    }
}