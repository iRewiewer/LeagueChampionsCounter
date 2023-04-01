let champs = ['Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Aphelios', 'Ashe', 'Aurelion Sol', 'Azir', 'Bard', 'Bel\'veth', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Cassiopeia', 'Cho\'gath', 'Corki', 'Darius', 'Diana', 'Draven', 'Dr. Mundo', 'Ekko', 'Elise', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Gangplank', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Gwen', 'Hecarim', 'Heimerdinger', 'Illaoi', 'Irelia', 'Ivern', 'Janna', 'JarvanIV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kai\'sa', 'Kalista', 'Karma', 'Karthus', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Kha\'zix', 'Kindred', 'Kled', 'Kog\'Maw', 'K\'Sante', 'Leblanc', 'LeeSin', 'Leona', 'Lillia', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Malphite', 'Malzahar', 'Maokai', 'Master Yi', 'Milio', 'Miss Fortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Neeko', 'Nidalee', 'Nilah', 'Nocturne', 'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Pyke', 'Qiyana', 'Quinn', 'Rakan', 'Rammus', 'Rek\'Sai', 'Rell', 'Renata', 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Ryze', 'Samira', 'Sejuani', 'Senna', 'Seraphine', 'Sett', 'Shaco', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Skarner', 'Sona', 'Soraka', 'Swain', 'Sylas', 'Syndra', 'TahmKench', 'Taliyah', 'Talon', 'Taric', 'Teemo', 'Thresh', 'Tristana', 'Trundle', 'Tryndamere', 'Twisted Fate', 'Twitch', 'Udyr', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Vel\'koz', 'Vex', 'Vi', 'Viego', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'Wukong', 'Xayah', 'Xerath', 'Xin Zhao', 'Yasuo', 'Yone', 'Yorick', 'Yuumi', 'Zac', 'Zed', 'Zeri', 'Ziggs', 'Zilean', 'Zoe', 'Zyra']

$(function() {
    let selected = "";
    for(i = 0; i < champs.length; i++) {
        if(localStorage.getItem(champs[i + 1]) == null) {
            localStorage.setItem(champs[i + 1], 0);
        }

        if(localStorage.getItem(champs[i + 1]) == 1) {
            selected = "selected";
        }
        else{
            selected = "";
        }

        let figure = `<figure>` +
        `<img id="${i + 1}" class="nodrag ${selected}" src="assets/champs/img (${i + 1}).png"/>` +
        `<figcaption class="nodrag ${i + 1} ${selected}">${champs[i]}</figcaption>` +
        `</figure>`

        $("#table").append(figure);
    }

    $("img").on('click', selectImages);
    updateTitle();
})

function selectImages() {
    if($(this).hasClass("selected"))
    {
        $(this).removeClass("selected");
        $(`figcaption.${$(this).attr("id")}`).removeClass("selected");
        localStorage.setItem(champs[$(this).attr('id')], 0)
    }
    else{
        $(this).addClass("selected");
        $(`figcaption.${$(this).attr("id")}`).addClass("selected");
        localStorage.setItem(champs[$(this).attr('id')], 1)
    }

    updateTitle();
}

function selectImage() {
    if($(this).hasClass("selected"))
    {
        $("img").removeClass("selected");
        localStorage.setItem($(this).attr('id'), 0)
    }
    else {
        $("img.selected").each(function() {
            localStorage.setItem(champs[$(this).attr('id')], 0);
        })
        $("img").removeClass("selected");
        $(this).addClass("selected");
        localStorage.setItem(champs[$(this).attr('id')], 1)
    }

    updateTitle();
}

function updateTitle() {
    let count = 0;
    for(i = 0; i < champs.length; i++) {
        if(localStorage.getItem(champs[i + 1]) == 0) {
            count += 1;
        }
    }

    let title = `Champions left: ${count}`;
    $("#title").html(title);
}