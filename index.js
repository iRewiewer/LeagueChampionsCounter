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
        $(this).siblings("figcaption").removeClass("selected");
        localStorage.setItem($(this).attr('id'), 0);
    }
    else{
        $(this).addClass("selected");
        $(this).siblings("figcaption").addClass("selected");
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

    // vanilla
    let title = `Champions left: ${count}`;
    let flavour = '.';

    $("#titleFlavour").css("visibility", "hidden");

    if(count == 0)
        title = `Congratulations! You're done.`;
    if(count == 1)
        flavour = "Only one remaining go for ittt!!";
    if(count > 1 && count <= 10)
        flavour = "So close.. You can do it!!";
    if(count == 69)
        flavour = "nice.";
    if(count == champs.length / 2)
        flavour = "Half down, half more to go.";
    if(count > champs.length / 2 && count < (champs.length / 2) + 5)
        flavour = "Almost halfway thru";
    if(count > champs.length - 7)
        flavour = "Long way to go..";

    if(flavour != '.')
    {
        $("#titleFlavour").css("visibility", "visible");
    }

    $("#title").html(title);
    $("#titleFlavour").html(flavour);
}