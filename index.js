$(function () {
    // Fill in all the champions
    let selected = "";

    // 1 = File; 0 = Clipboard;
    if (localStorage.getItem("SaveMethod") == null) {
        localStorage.setItem("SaveMethod", 1);

    }

    if (localStorage.getItem("SaveMethod") == 1) {
        $("#toggleBtn").text("File").css("padding-left", "26px");
    } else {
        $("#toggleBtn").text("Clipboard").css("padding-right", "0px").css("padding-left", "40px");
    }

    for (i = 1; i < champs.length; i++) {
        if (localStorage.getItem(champs[i]) == null) {
            localStorage.setItem(champs[i], 0);
        }

        if (localStorage.getItem(champs[i]) == 1) {
            selected = "selected";
        }
        else {
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

        for (i = 1; i < champs.length; i++) {
            localStorage.setItem(champs[i], 0);
        }

        UpdateTitle();
    });

    // Deselect all champs
    $("#deselectAllBtn").on("click", () => {
        $("figcaption").addClass("selected");
        $("img").addClass("selected");

        for (i = 1; i < champs.length; i++) {
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

    // Import champions list
    $("#importBtn").on("change", (event) => {
        $("#importBtn").css("pointer-events", "none").delay(2000).queue(function () {
            $("#importBtn").css("pointer-events", "auto");
            $("#importBtn").clearQueue();
        });

        $("#import-popup").text("Import successful!");

        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            // Read and check
            reader.onload = function (e) {
                const content = e.target.result;

                let containsAtLeastAChamp = false;
                let champsSelectedNow = [];
                let champsToBeSelected = [];
                for (i = 1; i < champs.length; i++) {
                    if (localStorage.getItem(champs[i]) == 1) {
                        champsSelectedNow += champs[i];
                    }
                }

                ClearLocalStorage();

                // Select champs
                for (i = 1; i < champs.length; i++) {
                    if (!content.includes(champs[i])) {
                        containsAtLeastAChamp = true;
                        champsToBeSelected += champs[i];
                        localStorage.setItem(champs[i], 1);
                    }
                }

                // Error handling
                if (!containsAtLeastAChamp) {
                    $("#import-popup").text("Import failed");
                }

                if (champsSelectedNow === champsToBeSelected) {
                    $("#import-popup").text("No changes");
                }

                // Update images and title
                $("#import-popup").fadeIn(1000).fadeOut(1000);
                UpdateImages();
                UpdateTitle();
            };

            reader.readAsText(file);
            $("#fileInput").val('');
        }
        else {
            $("#import-popup").text("Import failed");
        }
    });

    // Export champions list
    $("#exportBtn").on("click", () => {
        $("#exportBtn").css("pointer-events", "none").delay(2000).queue(function () {
            $("#exportBtn").css("pointer-events", "auto");
            $("#exportBtn").clearQueue();
        });

        let champsToExport = []
        for (i = 1; i < champs.length; i++) {
            if (localStorage.getItem(champs[i]) == 0)
                champsToExport += `${champs[i]}\n`;
        }



        if (localStorage.getItem("SaveMethod") == 0) {
            $("#export-popup").text("Saved to clipboard!");
            navigator.clipboard.writeText(`Champions Remaining:\n${champsToExport}`);
        }
        else {
            $("#export-popup").text("Saved to file!");
            // Download file with champs remaining
            const blob = new Blob([`Champions Remaining:\n${champsToExport}`], { type: "text/plain" });
            const link = document.createElement("a");

            link.href = URL.createObjectURL(blob);
            const timestamp = new Date().toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/:/g, '-');
            link.download = `${timestamp}.txt`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        $("#export-popup").fadeIn(1000).fadeOut(1000);
    });

    // Toggle File & Clipboard
    $("#toggleBtn").on("click", () => {
        if (localStorage.getItem("SaveMethod") == 1) {
            $("#toggleBtn").fadeOut(200, function () {
                $(this).text("Clipboard").fadeIn(200).css("padding-right", "0px").css("padding-left", "40px");
            });
            localStorage.setItem("SaveMethod", 0);
        }
        else {
            $("#toggleBtn").fadeOut(200, function () {
                $(this).text("File").fadeIn(200).css("padding-right", "26px");
            });
            localStorage.setItem("SaveMethod", 1);
        }
    });

    UpdateTitle();
})

function UpdateImages() {
    for (i = 1; i < champs.length; i++) {
        const champImg = $(`#${escapeSelector(champs[i])}`);
        if (localStorage.getItem(champs[i]) == 1) {
            $(champImg).addClass("selected");
            $(champImg).siblings("figcaption").addClass("selected");
        }
        else {
            $(champImg).removeClass("selected");
            $(champImg).siblings("figcaption").removeClass("selected");

        }
    }
}

function SelectImages() {
    if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        $(this).siblings("figcaption").removeClass("selected");
        localStorage.setItem($(this).attr('id'), 0);
    }
    else {
        $(this).addClass("selected");
        $(this).siblings("figcaption").addClass("selected");
        localStorage.setItem($(this).attr('id'), 1);
    }

    UpdateTitle();
}

function UpdateTitle() {
    let count = 0;
    for (i = 1; i < champs.length; i++) {
        if (localStorage.getItem(champs[i]) == 0) {
            count += 1;
        }
    }

    // vanilla
    let title = `Champions left: ${count}`;
    let flavour = '.';

    $("#titleFlavour").css("visibility", "hidden");

    if (count == 0)
        title = `Congratulations! You're done.`;
    if (count == 1)
        flavour = "Only one remaining go for ittt!!";
    if (count > 1 && count <= 10)
        flavour = "So close.. You can do it!!";
    if (count == 69)
        flavour = "nice.";
    if (count == champs.length / 2)
        flavour = "Half down, half more to go.";
    if (count > champs.length / 2 && count < (champs.length / 2) + 5)
        flavour = "Almost halfway thru";
    if (count > champs.length - 7)
        flavour = "Long way to go..";

    if (flavour != '.') {
        $("#titleFlavour").css("visibility", "visible");
    }

    $("#title").html(title);
    $("#titleFlavour").html(flavour);
}

const escapeSelector = function (selector) {
    return selector.replace(/([ #;&,.+*~':"!^$[\]()=>|/@])/g, '\\$1');
};

function ClearLocalStorage() {
    for (i = 1; i < champs.length; i++) {
        localStorage.setItem(champs[i], 0);
    }
}