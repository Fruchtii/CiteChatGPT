function addCitationButton() {
  const button = document.createElement('button');
  button.textContent = 'Cite';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.zIndex = '9999';
  button.style.padding = '10px 20px';
  button.style.backgroundColor = '#4CAF50';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
  button.style.cursor = 'pointer';
  
  button.addEventListener('click', generateCitation);
  
  document.body.appendChild(button);
}

function generateCitation() {
  const input = document.querySelector('.text-base').textContent;
  const output = document.querySelector('.markdown').textContent;
  
  chrome.storage.sync.get(['citationFormat'], function(result) {
    const format = result.citationFormat || 'APA';
    const citation = formatCitation(input, output, format);
    copyToClipboard(citation);
    alert('Citation copied to clipboard!');
  });
}

function formatCitation(input, output, format) {
  const date = new Date().toISOString().split('T')[0];
  
  switch(format) {
    case 'APA':
      return `OpenAI. (${date}). ChatGPT conversation. Retrieved from https://chat.openai.com\n\nPrompt: ${input}\n\nResponse: ${output}`;
    case 'MLA':
      return `OpenAI. "ChatGPT conversation." ChatGPT, ${date}, chat.openai.com.\n\nPrompt: ${input}\n\nResponse: ${output}`;
    case 'Chicago':
      return `OpenAI. "${date}. ChatGPT conversation." ChatGPT. Accessed ${date}. https://chat.openai.com.\n\nPrompt: ${input}\n\nResponse: ${output}`;
    default:
      return `OpenAI. (${date}). ChatGPT conversation.\n\nPrompt: ${input}\n\nResponse: ${output}`;
  }
}

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

addCitationButton();
