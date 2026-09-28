/* Tema elegido, aplicado antes de pintar para evitar un destello (PRD v1.4 §21.7, RQ-17). Sin elección, rige el sistema. */
(function () { try { var t = localStorage.getItem('sh-tema'); if (t === 'claro' || t === 'oscuro') document.documentElement.setAttribute('data-tema', t); } catch (e) {} })();
