window.addEventListener("beforeinstallprompt", (e) => {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    // don't display install banner when installed
    return e.preventDefault();
  } else {
    const btn = document.querySelector("#install");
    btn.hidden = false;

    btn.onclick = (_) => e.prompt();
    return e.preventDefault();
  }
});
