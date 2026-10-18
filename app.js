'use strict';
const whatsapp = 'https://wa.me/966540773038?text=';
document.querySelectorAll('[data-wa], [data-service]').forEach(link => {
 const service = link.dataset.service;
 const message = service
  ? `السلام عليكم كوالتي سمارت تاتش، أرغب بالاستفسار عن ${service}.\nنوع السيارة وموديلها: \nالوقت المناسب للتواصل: `
  : 'السلام عليكم كوالتي سمارت تاتش، أرغب بحجز موعد لسيارتي.\nنوع السيارة وموديلها: \nالخدمة المطلوبة: \nالموعد المفضل: ';
 link.href = whatsapp + encodeURIComponent(message);
});
