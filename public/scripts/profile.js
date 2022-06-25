const menuButton = document.querySelector(".profile__menu");

const currentName = window.location.pathname
  .replace("/profile/", "")
  .split("/")[0];

/* Adding event listeners to the buttons. */
const url = new URL(window.location);

menuButton.children[0].addEventListener("click", (event) => {
  window.history.pushState({}, document.title, "/profile/" + currentName);
  pages(event);
});

menuButton.children[1].addEventListener("click", (event) => {
  url.searchParams.set("section", "post");
  window.history.pushState({ value: "post" }, "", url);
  pages(event);
});

menuButton.children[2].addEventListener("click", (event) => {
  url.searchParams.set("section", "like");
  window.history.pushState({ value: "like" }, "", url);
  pages(event);
});
/**
 * If the user is on the post page, then add the active class to the post button and display it. If the
 * user is on the like page, then add the active class to the like button and display it. If the user
 * is on the home page, then add the active class to the home button and display it.
 * @param event - the event that triggered the function
 */
function pages(event) {
  menuProfileButtonLogic(event);
  switch (window.history.state.value) {
    case "post":
      menuButton.children[1].classList.add("active");
      menuButton.children[1].style.display = "block";
      break;
    case "like":
      menuButton.children[2].classList.add("active");
      menuButton.children[2].style.display = "block";
      break;

    default:
      menuButton.children[0].classList.add("active");
      menuButton.children[0].style.display = "block";
      break;
  }
}

/**
 * If the previous active button has the class active, remove it. Then add the class active to the
 * button that was clicked. Then hide all the sections and show the section that corresponds to the
 * button that was clicked.
 * @param event - The event object is a property of the Window object. It describes the event's current
 * phase, its type, and provides other event related information.
 */
let prevActive;

function menuProfileButtonLogic(event) {
  if (prevActive) {
    if (prevActive.classList.contains("active")) {
      prevActive.classList.remove("active");
    }
  }
  event.target.classList.add("active");

  const containerSection = document.querySelector(".container-menu_section");
  const activeButtonId = event.target.id.split("-")[1];
  const activeSection = document.getElementById(
    `menu_section-${activeButtonId}`
  );

  for (let i = 0; i < containerSection.children.length; i++) {
    containerSection.children[i].style.display = "none";
  }
  activeSection.style.display = "block";
  prevActive = event.target;
}
