import "../src/main.scss";

import { initAuthButtons } from "./member-page.js";
import { initMemberPage } from "./member-page.js";

initAuthButtons();

if (document.querySelector(".member__page")) {
  initMemberPage();
}


















