const updateUI = () => {
  const enableExtension = document.querySelector("#enableExtension").checked;
  const skipInterrupterOption = document.querySelector("#skipInterrupterOption");
  const skipInterrupterInput = document.querySelector("#skipInterrupter");
  const skipIntroOption = document.querySelector("#skipIntroOption");
  const skipIntroInput = document.querySelector("#skipIntro");

  if (enableExtension) {
    skipInterrupterOption.classList.remove("disabled");
    skipInterrupterInput.disabled = false;
    skipIntroOption.classList.remove("disabled");
    skipIntroInput.disabled = false;
  } else {
    skipInterrupterOption.classList.add("disabled");
    skipInterrupterInput.disabled = true;
    skipIntroOption.classList.add("disabled");
    skipIntroInput.disabled = true;
  }
};

const saveOptions = async () => {
  try {
    await browser.storage.local.set({
      enableExtension: document.querySelector("#enableExtension").checked,
      skipInterrupter: document.querySelector("#skipInterrupter").checked,
      skipIntro: document.querySelector("#skipIntro").checked
    });
    updateUI();
  } catch (error) {
    console.error(`Error saving settings: ${error}`);
  }
};

const restoreOptions = async () => {
  try {
    const result = await browser.storage.local.get({
      enableExtension: true,
      skipInterrupter: true,
      skipIntro: true
    });
    document.querySelector("#enableExtension").checked = result.enableExtension;
    document.querySelector("#skipInterrupter").checked = result.skipInterrupter;
    document.querySelector("#skipIntro").checked = result.skipIntro;
    updateUI();
  } catch (error) {
    console.error(`Error loading settings: ${error}`);
  }
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#enableExtension").addEventListener("change", saveOptions);
document.querySelector("#skipInterrupter").addEventListener("change", saveOptions);
document.querySelector("#skipIntro").addEventListener("change", saveOptions);
