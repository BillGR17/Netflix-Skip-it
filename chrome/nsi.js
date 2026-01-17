let exec = false;
let settings = {
  enableExtension: true,
  skipInterrupter: true,
  skipIntro: true,
  nextEpisode: false
};

// Settings
if (typeof chrome !== "undefined" && chrome.storage) {
  (async () => {
    try {
      const result = await chrome.storage.local.get({
        enableExtension: true,
        skipInterrupter: true,
        skipIntro: true,
        nextEpisode: false
      });
      settings = result;
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  })();

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local") {
      if (changes.enableExtension) {
        settings.enableExtension = changes.enableExtension.newValue;
      }
      if (changes.skipInterrupter) {
        settings.skipInterrupter = changes.skipInterrupter.newValue;
      }
      if (changes.skipIntro) {
        settings.skipIntro = changes.skipIntro.newValue;
      }
      if (changes.nextEpisode) {
        settings.nextEpisode = changes.nextEpisode.newValue;
      }
    }
  });
}


const pauseExec = () => {
  setTimeout(() => {
    exec = false;
  }, 2000);
};

const checkAndClick = () => {
  if (!settings.enableExtension || exec) return;

  // Interrupter Logic
  if (settings.skipInterrupter) {
    const inter_btn = document.querySelector("[data-uia='interrupt-autoplay-continue']");
    if (inter_btn) {
      console.log("Found interrupter");
      exec = true;
      inter_btn.click();
      pauseExec();
      return;
    }
  }

  // Skip Intro Logic
  if (settings.skipIntro) {
    const skip_btn = document.querySelector("[data-uia='player-skip-intro']");
    if (skip_btn) {
      console.log("Found Skip button");
      exec = true;
      skip_btn.click();
      pauseExec();
      return;
    }
  }

  // Next Episode Logic
  if (settings.nextEpisode) {
    const next_btn = document.querySelector("[data-uia='next-episode-seamless-button']");
    if (next_btn) {
      console.log("Found Next Episode button");
      exec = true;
      next_btn.click();
      pauseExec();
    }
  }
};

//  Initialization
const observer = new MutationObserver((mutations) => {
  checkAndClick();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

checkAndClick();
