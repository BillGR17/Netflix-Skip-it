const features = [{
    id: "skipInterrupter",
    optionId: "skipInterrupterOption",
    default: true
  },
  {
    id: "skipIntro",
    optionId: "skipIntroOption",
    default: true
  },
  {
    id: "nextEpisode",
    optionId: "nextEpisodeOption",
    default: false
  }
];

const updateUI = () => {
  const enableExtension = document.querySelector("#enableExtension").checked;

  features.forEach(feature => {
    const option = document.getElementById(feature.optionId);
    const input = document.getElementById(feature.id);

    if (enableExtension) {
      option.classList.remove("disabled");
      input.disabled = false;
    } else {
      option.classList.add("disabled");
      input.disabled = true;
    }
  });
};

const saveOptions = async () => {
  try {
    const settings = {
      enableExtension: document.querySelector("#enableExtension").checked
    };

    features.forEach(feature => {
      settings[feature.id] = document.getElementById(feature.id).checked;
    });

    await chrome.storage.local.set(settings);
    updateUI();
  } catch (error) {
    console.error(`Error saving settings: ${error}`);
  }
};

const restoreOptions = async () => {
  try {
    const defaults = {
      enableExtension: true
    };
    features.forEach(feature => {
      defaults[feature.id] = feature.default;
    });

    const result = await chrome.storage.local.get(defaults);

    document.querySelector("#enableExtension").checked = result.enableExtension;
    features.forEach(feature => {
      document.getElementById(feature.id).checked = result[feature.id];
    });

    updateUI();
  } catch (error) {
    console.error(`Error loading settings: ${error}`);
  }
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#enableExtension").addEventListener("change", saveOptions);

features.forEach(feature => {
  document.getElementById(feature.id).addEventListener("change", saveOptions);
});
