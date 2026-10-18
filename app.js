'use strict';
const whatsapp = 'https://wa.me/966540773038?text=';
document.querySelectorAll('[data-wa], [data-service]').forEach(link => {
 const service = link.dataset.service;
 const message = service
  ? `السلام عليكم كوالتي سمارت تاتش، أرغب بالاستفسار عن ${service}.\nنوع السيارة وموديلها: \nالوقت المناسب للتواصل: `
  : 'السلام عليكم كوالتي سمارت تاتش، أرغب بحجز موعد لسيارتي.\nنوع السيارة وموديلها: \nالخدمة المطلوبة: \nالموعد المفضل: ';
 link.href = whatsapp + encodeURIComponent(message);
});

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-nav');
function closeMenu(returnFocus = false) {
 menu.classList.remove('is-open');
 menuButton.setAttribute('aria-expanded', 'false');
 menuButton.setAttribute('aria-label', 'فتح قائمة التنقل');
 if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
 const open = menuButton.getAttribute('aria-expanded') !== 'true';
 menu.classList.toggle('is-open', open);
 menuButton.setAttribute('aria-expanded', String(open));
 menuButton.setAttribute('aria-label', open ? 'إغلاق قائمة التنقل' : 'فتح قائمة التنقل');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
 if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
 if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width:701px)').addEventListener('change', event => {
 if (event.matches) closeMenu();
});

const photoDialog = document.querySelector('.result-dialog');
const photoImage = photoDialog.querySelector('img');
const photoFrame = photoDialog.querySelector('.result-frame');
const photoTitle = document.querySelector('#result-title');
let photoTrigger = null;
document.querySelectorAll('.result-open').forEach(button => {
 button.addEventListener('click', () => {
  photoTrigger = button;
  photoImage.src = button.dataset.photo;
  photoImage.alt = button.dataset.title + '، قبل الإصلاح على اليسار وبعده على اليمين';
  photoFrame.style.aspectRatio = button.dataset.ratio;
  photoTitle.textContent = button.dataset.title;
  photoDialog.showModal();
  document.body.classList.add('photo-open');
 });
});
photoDialog.querySelector('.result-close').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', event => {
 const bounds = photoDialog.getBoundingClientRect();
 if (event.target === photoDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) photoDialog.close();
});
photoDialog.addEventListener('close', () => {
 document.body.classList.remove('photo-open');
 if (photoTrigger) photoTrigger.focus();
});
