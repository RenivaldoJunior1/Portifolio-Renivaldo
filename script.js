
//contadort
document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('message');
    const charCount = document.querySelector('.char-count');
  
    textarea.addEventListener('input', () => {
      const currentLength = textarea.value.length;
      charCount.textContent = `${currentLength}/300`;
    });
  });