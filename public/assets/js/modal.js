import { initModal, ModalClasses } from "@superkoders/modal";

window.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery > a');

  galleryItems.forEach((item) => {
    item.dataset.modal = '{"gallery": "gallery"}';
  })

  initModal({
    context: document,
    headerTpl: () => `<button class="b-modal__close ${ModalClasses.CLOSE}">&times;</button>`,
    prevTpl: () => `<button class="b-modal__prev-btn ${ModalClasses.PREV_TRIGGER}">‹</button>`,
    nextTpl: () => `<button class="b-modal__next-btn ${ModalClasses.NEXT_TRIGGER}">›</button>`
  });
});
