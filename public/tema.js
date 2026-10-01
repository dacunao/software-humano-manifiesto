/* Tema elegido, aplicado antes de pintar para evitar un destello (PRD v1.4 §21.7, RQ-17). Sin elección, rige el sistema.
   Se lee primero la cookie compartida por los sitios de Software Humano y después el almacenamiento local
   (estándar común B4; misma lógica que src/cliente/preferencias.ts). */
(function () {
  var t = null;
  try { var m = document.cookie.match(/(?:^|; )sh-tema=([^;]*)/); if (m) t = decodeURIComponent(m[1]); } catch (e) {}
  if (!t) { try { t = localStorage.getItem('sh-tema'); } catch (e) {} }
  if (t === 'claro' || t === 'oscuro') document.documentElement.setAttribute('data-tema', t);
})();
