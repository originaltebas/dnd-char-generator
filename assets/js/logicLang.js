multilang = new multiLanguages('./languages', 'prueba', 'es_ES');
multilang.loadData();

window.addEventListener('load', (event) => {
    loadHTMLData();
    topDropDowns();
});

function loadHTMLData() {
    const allDom = document.querySelectorAll("[data-lang]");
    for (let i = 0; i < allDom.length; i++) {
        let elem = allDom[i];
        const key = elem.getAttribute("data-lang");

        if (key != null) {
            console.log(key);
            elem.innerText = multilang.getKey(key);
        }
    }
}