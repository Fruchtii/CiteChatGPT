function saveOptions() {
  const format = document.getElementById('citationFormat').value;
  chrome.storage.sync.set({citationFormat: format}, function() {
    const status = document.createElement('p');
    status.textContent = 'Options saved';
    document.body.appendChild(status);
    setTimeout(function() {
      status.remove();
    }, 2000);
  });
}

document.getElementById('save').addEventListener('click', saveOptions);

// Load saved options
chrome.storage.sync.get(['citationFormat'], function(result) {
  document.getElementById('citationFormat').value = result.citationFormat || 'APA';
});
