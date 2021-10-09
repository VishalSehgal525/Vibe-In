const buttonClick = document.querySelector(".btn");
const link = document.querySelector("#bro");

// https://codenames.game/
// https://skribbl.io/
// https://smashkarts.io/
// https://fishbowl-game.com/
// https://nameplaceanimalthing.online/
// https://www.google.com/logos/2010/pacman10-i.html

link.onclick = function () {
  const game = Math.trunc(Math.random() * 6) + 1;
  console.log(game);

  if (game === 1) {
    link.setAttribute("href", "https://codenames.game/");
  } else if (game === 2) {
    link.setAttribute("href", "https://skribbl.io/");
  } else if (game === 3) {
    link.setAttribute("href", "https://smashkarts.io/");
  } else if (game === 4) {
    link.setAttribute("href", "https://fishbowl-game.com/");
  } else if (game === 5) {
    link.setAttribute("href", "https://nameplaceanimalthing.online/");
  } else {
    link.setAttribute(
      "href",
      "https://www.google.com/logos/2010/pacman10-i.html"
    );
  }
  console.log("Hyperlink was changed");
};
