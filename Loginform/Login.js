// # Switch between the existing sign-in and sign-up views.
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const signUp = document.getElementById("signup-form");
const signIn = document.getElementById("signin-form");
const leftPanel = document.querySelector(".toggle-left");
const rightPanel = document.querySelector(".toggle-right");

function setFormMode(isSigningUp, moveFocus = false) {
  container.classList.toggle("active", isSigningUp);

  // # Hidden panels must not remain reachable by keyboard or screen readers.
  for (const [panel, isHidden] of [
    [signUp, !isSigningUp],
    [signIn, isSigningUp],
    [leftPanel, !isSigningUp],
    [rightPanel, isSigningUp],
  ]) {
    panel.inert = isHidden;
    panel.setAttribute("aria-hidden", String(isHidden));
  }

  // # Focus the heading without opening the phone keyboard automatically.
  if (moveFocus) {
    const heading = (isSigningUp ? signUp : signIn).querySelector("h1");
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
    if (window.matchMedia("(max-width: 600px)").matches) {
      container.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }
}

registerBtn.addEventListener("click", () => setFormMode(true, true));
loginBtn.addEventListener("click", () => setFormMode(false, true));
setFormMode(container.classList.contains("active"));
