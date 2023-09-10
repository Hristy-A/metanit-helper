/* eslint-disable no-undef */

chrome.tabs.onActivated.addListener(function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];

    if (!tab) return;

    const metanit = !!target.url?.includes(metanit);

    chrome.browserAction.setIcon({
      path: metanit ? 'assets/icon-active.png' : 'assets/icon-disabled.png',
    });
  });
});
