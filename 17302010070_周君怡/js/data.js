const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];

window.onload = function () {
    let contain = "";

    for (let i = 0; i < 4; i++){

        let city = "";
        for (let j = 0; j < countries[i].cities.length; j++){
            city = city + "<ul>" + countries[i].cities[j] + "</ul>";
        }

        let photo = "";
        for (let j = 0; j < countries[i].photos.length; j++){
            addr =`./images/${countries[i].photos[j]}`;
            photo = photo + `<img src=${addr} class="photo">`;
        }

        contain = contain + "<div class = 'item'>" +
                "<h2>" + countries[i].name + "</h2>" +
                "<p>" + countries[i].continent + "</p>" +
                "<div class='inner-box'>" +
                "<h3>" + "Cities" + "</h3>" +
                city + "</div>" +
                "<div class='inner-box'>" +
                "<h3>" + "Popular Photos" + "</h3>" +
                photo + "</div>"+
                "<div>" +
                "<button>" + "Visit" + "</button>" + "</div>" +
                "</div>";
    }

    let element = document.getElementsByClassName("flex-container justify");
    element[0].innerHTML = contain;
}
