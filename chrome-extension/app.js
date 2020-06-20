const frame = document.getElementById('queue');
let queueURL = "https://codefellows-lab.herokuapp.com";

function loadFrame() {
  chrome.storage.sync.get(
    { token: '' },
    function (items) {
      if (items.token) { queueURL += `?token=${items.token}`; }
      frame.src = queueURL;
    });
}

document.addEventListener('DOMContentLoaded', loadFrame);