// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
  
    openModalBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });
  
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });
  