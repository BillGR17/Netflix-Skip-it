var exec = false;
function pauseExec() {
  setTimeout(function() {
    exec = false;
  }, 2000);
}
function check_btns() {
  var inter_btn = document.querySelector("[data-uia='interrupt-autoplay-continue']");
  var skip_btn = document.querySelector(".watch-video--skip-content-button");
  if (inter_btn) {
    exec = true;
    console.log("Found interrupter");
    inter_btn.click();
    pauseExec();
  }
  if (skip_btn) {
    exec = true;
    console.log("Found Skip button");
    skip_btn.click();
    pauseExec();
  }
}
function main() {
  if (!exec) {
    check_btns();
  }
}
setInterval(main, 200);
