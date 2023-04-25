let champs = ['', 'Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Aphelios', 'Ashe', 'Aurelion Sol', 'Azir', 'Bard', 'Bel\'veth', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Cassiopeia', 'Cho\'gath', 'Corki', 'Darius', 'Diana', 'Draven', 'Dr. Mundo', 'Ekko', 'Elise', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Gangplank', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Gwen', 'Hecarim', 'Heimerdinger', 'Illaoi', 'Irelia', 'Ivern', 'Janna', 'JarvanIV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kai\'sa', 'Kalista', 'Karma', 'Karthus', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Kha\'Zix', 'Kindred', 'Kled', 'Kog\'Maw', 'K\'Sante', 'Leblanc', 'Lee Sin', 'Leona', 'Lillia', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Malphite', 'Malzahar', 'Maokai', 'Master Yi', 'Milio', 'Miss Fortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Neeko', 'Nidalee', 'Nilah', 'Nocturne', 'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Pyke', 'Qiyana', 'Quinn', 'Rakan', 'Rammus', 'Rek\'Sai', 'Rell', 'Renata', 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Ryze', 'Samira', 'Sejuani', 'Senna', 'Seraphine', 'Sett', 'Shaco', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Skarner', 'Sona', 'Soraka', 'Swain', 'Sylas', 'Syndra', 'Tahm Kench', 'Taliyah', 'Talon', 'Taric', 'Teemo', 'Thresh', 'Tristana', 'Trundle', 'Tryndamere', 'Twisted Fate', 'Twitch', 'Udyr', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Vel\'koz', 'Vex', 'Vi', 'Viego', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'Wukong', 'Xayah', 'Xerath', 'Xin Zhao', 'Yasuo', 'Yone', 'Yorick', 'Yuumi', 'Zac', 'Zed', 'Zeri', 'Ziggs', 'Zilean', 'Zoe', 'Zyra']

$(function() {
    // Fill in all the champions
    let selected = "";
    for(i = 1; i < champs.length; i++) {
        if(localStorage.getItem(champs[i]) == null) {
            localStorage.setItem(champs[i], 0);
        }

        if(localStorage.getItem(champs[i]) == 1) {
            selected = "selected";
        }
        else{
            selected = "";
        }

        let figure = `<figure>` +
        `<img id="${champs[i]}" class="nodrag ${selected}" src="assets/champs/${champs[i]}.png"/>` +
        `<figcaption class="nodrag ${champs[i]} ${selected}"><a target="_blank" href="https://u.gg/lol/champions/${champs[i]}/build">${champs[i]}</a></figcaption>` +
        `</figure>`

        $("#table").append(figure);
    }

    // Add effect for selecting image
    $("img").on("click", SelectImages);

    // Select all champs
    $("#selectAllBtn").on("click", () => {
        $(".selected").removeClass("selected");

        for(i = 1; i < champs.length; i++) {
            localStorage.setItem(champs[i], 0);
        }

        UpdateTitle();
    });

    // Deselect all champs
    $("#deselectAllBtn").on("click", () => {
        $("figcaption").addClass("selected");
        $("img").addClass("selected");

        for(i = 1; i < champs.length; i++) {
            localStorage.setItem(champs[i], 1);
        }

        UpdateTitle();
    });

    // Scroll to top
    $("#topBtn").on("click", () => {
        $('html, body').animate({ scrollTop: 0 }, 1500);
    });

    // Scroll to bottom
    $("#botBtn").on("click", () => {
        $('html, body').animate({ scrollTop: $(document).height() }, 1500);
    });

    // Export champions list
    $("#exportBtn").on("click", () => {
        $("#exportBtn").css("pointer-events", "none").delay(2000).queue(function(){
            $("#exportBtn").css("pointer-events", "auto");
            $("#exportBtn").clearQueue();
        });

        let champsToExport = []
        for(i = 1; i < champs.length; i++) {
            if(localStorage.getItem(champs[i]) == 0)
                champsToExport += `${champs[i]}\n`;
        }

        navigator.clipboard.writeText(`Champions Remaining:\n${champsToExport}`);
        $("#export-popup").fadeIn(1000).fadeOut(1000);
    });

    UpdateTitle();
})

function SelectImages() {
    if($(this).hasClass("selected"))
    {
        $(this).removeClass("selected");
        $(`figcaption.${$(this).attr("id")}`).removeClass("selected");
        localStorage.setItem($(this).attr('id'), 0);
    }
    else{
        $(this).addClass("selected");
        $(`figcaption.${$(this).attr("id")}`).addClass("selected");
        localStorage.setItem($(this).attr('id'), 1);
    }

    UpdateTitle();
}

function UpdateTitle() {
    let count = 0;
    for(i = 1; i < champs.length; i++) {
        if(localStorage.getItem(champs[i]) == 0) {
            count += 1;
        }
    }

    let title = `Champions left: ${count}`;
    $("#title").html(title);
}