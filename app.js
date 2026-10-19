'use strict';
const whatsapp = 'https://wa.me/966540773038?text=';
const requestForm = document.querySelector('#request-form');
const brandSelect = document.querySelector('#car-brand');
const otherBrand = document.querySelector('#other-brand');
const otherBrandField = document.querySelector('#other-brand-field');
const inquiryText = document.querySelector('#inquiry-text');
const inquiryField = document.querySelector('#inquiry-field');
const requestHint = document.querySelector('#request-hint');
function syncRequestFields() {
 const inquiry = requestForm.elements.requestType.value === 'inquiry';
 const other = brandSelect.value === 'other';
 brandSelect.required = !inquiry;
 requestForm.elements.service.required = !inquiry;
 document.querySelector('#brand-required-label').textContent = inquiry ? 'اختياري' : 'مطلوب';
 document.querySelector('#service-required-label').textContent = inquiry ? 'اختياري' : 'مطلوب';
 otherBrandField.hidden = !other;
 otherBrand.disabled = !other;
 otherBrand.required = other;
 inquiryField.hidden = !inquiry;
 inquiryText.disabled = !inquiry;
 inquiryText.required = inquiry;
 otherBrand.setCustomValidity('');
 inquiryText.setCustomValidity('');
 requestHint.textContent = inquiry
  ? 'نجهّز رسالتك على واتساب. أرفق صور الصدمة هناك قبل الإرسال، إن وجدت.'
  : 'طلب الحجز يُرسل عبر واتساب، ويؤكد المركز الموعد معك بعد التواصل.';
}
requestForm.addEventListener('change', syncRequestFields);
[otherBrand, inquiryText].forEach(input => input.addEventListener('input', () => input.setCustomValidity('')));
function buildRequestMessage(data) {
 const clean = key => String(data[key] || '').trim();
 const inquiry = clean('requestType') === 'inquiry';
 const brand = clean('brand') === 'other' ? clean('otherBrand') : clean('brand');
 const lines = [
  inquiry ? 'السلام عليكم كوالتي سمارت تاتش، عندي استفسار عن خدماتكم.' : 'السلام عليكم كوالتي سمارت تاتش، أرغب بحجز موعد لسيارتي.'
 ];
 const car = [brand, clean('model')].filter(Boolean).join(' — ');
 if (car) lines.push('نوع السيارة وموديلها : ' + car);
 if (clean('service')) lines.push('الخدمة المطلوبة : ' + clean('service'));
 if (clean('location')) lines.push('مكان الصدمة : ' + clean('location'));
 if (inquiry && clean('inquiry')) lines.push('الاستفسار : ' + clean('inquiry'));
 if (clean('note')) lines.push('ملاحظة : ' + clean('note'));
 lines.push('*يرجى ارفاق صور للصدمة وتوضيح مكانها إن وجدت*');
 return lines.join('\n\n');
}
requestForm.addEventListener('submit', event => {
 event.preventDefault();
 if (otherBrand.required && !otherBrand.value.trim()) otherBrand.setCustomValidity('اكتب ماركة السيارة.');
 if (inquiryText.required && !inquiryText.value.trim()) inquiryText.setCustomValidity('اكتب استفسارك.');
 if (!requestForm.reportValidity()) return;
 const data = Object.fromEntries(new FormData(requestForm));
 window.location.assign(whatsapp + encodeURIComponent(buildRequestMessage(data)));
});
document.querySelectorAll('[data-wa], [data-service], [data-request-mode]').forEach(link => {
 link.href = '#booking';
 link.addEventListener('click', () => {
  const service = link.dataset.service;
  const mode = link.dataset.requestMode || (service && service !== 'تشييك على السيارة' ? 'inquiry' : 'booking');
  requestForm.elements.requestType.value = mode;
  if (service) {
   const select = requestForm.elements.service;
   const exists = Array.from(select.options).some(option => option.value === service);
   select.value = exists ? service : 'أحتاج مساعدة في اختيار الخدمة';
  }
  syncRequestFields();
 });
});
syncRequestFields();

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
