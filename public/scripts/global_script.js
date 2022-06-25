/* Checking if the pathname starts with /profile/ and if it does it will add the css and js files. */
const profile = window.location.pathname.startsWith("/profile/");

if (profile) {
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "/css/profile.css";
  document.head.appendChild(css);

  const script = document.createElement("script");
  script.src = "/scripts/profile.js";
  script.defer = true;
  document.body.appendChild(script);
}
