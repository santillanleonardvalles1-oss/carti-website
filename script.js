/* =====================================
   PARTICLES
===================================== */

const particleContainer =
    document.getElementById("particles");


for (let i = 0; i < 65; i++) {

    const particle =
        document.createElement("div");

    particle.className = "particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        (Math.random() * 15 + 8) + "s";

    particle.style.animationDelay =
        (Math.random() * 12) + "s";

    const size =
        Math.random() * 2 + 1;

    particle.style.width =
        size + "px";

    particle.style.height =
        size + "px";

    particleContainer.appendChild(
        particle
    );
}


/* =====================================
   MOUSE EFFECT
===================================== */

const glows =
    document.querySelectorAll(".glow");

const crosses =
    document.querySelectorAll(".cross");


document.addEventListener(
    "mousemove",
    function(event) {

        const x =
            event.clientX /
            window.innerWidth -
            0.5;

        const y =
            event.clientY /
            window.innerHeight -
            0.5;


        glows.forEach(
            function(glow, index) {

                const movement =
                    (index + 1) * 12;

                glow.style.transform =
                    `translate(
                        ${x * movement}px,
                        ${y * movement}px
                    )`;

            }
        );


        crosses.forEach(
            function(cross, index) {

                const movement =
                    (index + 1) * 5;

                cross.style.transform =
                    `translate(
                        ${x * movement}px,
                        ${y * movement}px
                    )`;

            }
        );

    }
);


/* =====================================
   PROFILE IMAGE
===================================== */

const profileImage =
    document.getElementById(
        "profileImage"
    );


profileImage.addEventListener(
    "error",
    function() {

        console.error(
            "Profile picture not found."
        );

        console.error(
            "Make sure profile.jpg is beside index.html."
        );

    }
);


/* =====================================
   AVATAR EFFECT
===================================== */

const avatar =
    document.querySelector(".avatar");


avatar.addEventListener(
    "mousemove",
    function(event) {

        const rect =
            avatar.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left;

        const y =
            event.clientY -
            rect.top;


        const rotateX =
            ((y / rect.height) - .5) * -10;

        const rotateY =
            ((x / rect.width) - .5) * 10;


        avatar.style.transform =
            `perspective(300px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    }
);


avatar.addEventListener(
    "mouseleave",
    function() {

        avatar.style.transform =
            "perspective(300px) rotateX(0deg) rotateY(0deg)";

    }
);


/* =====================================
   GAME MODAL
===================================== */

const games =
    document.querySelectorAll(".game");

const modal =
    document.getElementById("gameModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const closeModal =
    document.getElementById("closeModal");


games.forEach(
    function(game) {

        game.addEventListener(
            "click",
            function() {

                modalTitle.textContent =
                    game.dataset.title;

                modalDescription.textContent =
                    game.dataset.description;

                modal.classList.add(
                    "active"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);


function closeGameModal() {

    modal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


closeModal.addEventListener(
    "click",
    closeGameModal
);


modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {
            closeGameModal();
        }

    }
);


document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {
            closeGameModal();
        }

    }
);


/* =====================================
   DISCORD PROFILE
===================================== */

const discordButton =
    document.getElementById(
        "discordButton"
    );


discordButton.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        /*
        ===================================
        DISCORD PROFILE LINK
        ===================================

        Palitan ang YOUR_USER_ID
        ng actual Discord User ID mo.

        Example:

        https://discord.com/users/123456789012345678
        */

        const discordLink =
            "https://discord.com/users/YOUR_USER_ID";


        window.open(
            discordLink,
            "_blank"
        );

    }
);


/* =====================================
   MORE BUTTON
===================================== */

const moreButton =
    document.getElementById(
        "moreButton"
    );


moreButton.addEventListener(
    "click",
    function() {

        alert(
            "carti • _ty.y • ONLINE"
        );

    }
);


/* =====================================
   MUSIC
===================================== */

const bgMusic =
    document.getElementById(
        "bgMusic"
    );

const musicToggle =
    document.getElementById(
        "musicToggle"
    );

const musicIcon =
    document.getElementById(
        "musicIcon"
    );

const musicStatus =
    document.getElementById(
        "musicStatus"
    );

const musicBars =
    document.getElementById(
        "musicBars"
    );


bgMusic.volume = 0.35;


/* MUSIC UI */

function updateMusicUI() {

    if (!bgMusic.paused) {

        musicIcon.textContent =
            "Ⅱ";

        musicStatus.textContent =
            "NOW PLAYING";

        musicBars.classList.add(
            "playing"
        );

    }

    else {

        musicIcon.textContent =
            "♫";

        musicStatus.textContent =
            "MUSIC PAUSED";

        musicBars.classList.remove(
            "playing"
        );

    }

}


/* =====================================
   AUTO PLAY
===================================== */

window.addEventListener(
    "load",
    async function() {

        try {

            await bgMusic.play();

            updateMusicUI();

        }

        catch (error) {

            musicStatus.textContent =
                "CLICK TO PLAY";

            updateMusicUI();

        }

    }
);


/* =====================================
   START MUSIC AFTER FIRST CLICK
===================================== */

async function startMusicOnFirstClick() {

    if (!bgMusic.paused) {
        return;
    }


    try {

        await bgMusic.play();

        updateMusicUI();

        document.removeEventListener(
            "click",
            startMusicOnFirstClick
        );

    }

    catch (error) {

        console.log(
            "Browser blocked autoplay."
        );

    }

}


document.addEventListener(
    "click",
    startMusicOnFirstClick
);


/* =====================================
   MUSIC BUTTON
===================================== */

musicToggle.addEventListener(
    "click",
    async function(event) {

        event.stopPropagation();


        if (bgMusic.paused) {

            try {

                await bgMusic.play();

                updateMusicUI();

            }

            catch (error) {

                musicStatus.textContent =
                    "PLAYBACK BLOCKED";

            }

        }

        else {

            bgMusic.pause();

            updateMusicUI();

        }

    }
);


/* =====================================
   MUSIC EVENTS
===================================== */

bgMusic.addEventListener(
    "play",
    updateMusicUI
);

bgMusic.addEventListener(
    "pause",
    updateMusicUI
);