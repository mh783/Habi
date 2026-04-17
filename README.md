# README – Reflexión del reto

## Decisiones clave y por qué las tomé

Decidí construir la solución con **FastAPI + SQLAlchemy + SQLite + React**. Elegí FastAPI porque permite desarrollar APIs rápidas, limpias y bien documentadas automáticamente con Swagger, lo cual facilita probar y demostrar el sistema. SQLAlchemy me permitió separar la lógica de negocio de la persistencia y manejar mejor las transacciones. Para la base de datos usé SQLite porque prioricé velocidad de desarrollo, facilidad de ejecución local y simplicidad para una prueba técnica; en un entorno productivo migraría a PostgreSQL. En frontend usé React para construir una interfaz clara y moderna que permitiera demostrar el flujo completo del producto.

También prioricé la **consistencia del dinero** sobre agregar muchas funcionalidades. Por eso enfoqué la solución en validaciones como saldo suficiente, montos positivos, trazabilidad de movimientos y operaciones claras.

---

## Qué dejé fuera y por qué

Dejé por fuera autenticación, autorización y manejo multiusuario real. También dejé fuera integraciones bancarias, recargas reales con pasarela de pagos, notificaciones, reversos de transacciones y despliegue en nube.

La razón principal fue priorizar el núcleo solicitado en el reto y asegurar que funcionara de forma sólida antes de expandir el alcance. Preferí una solución pequeña pero consistente, en lugar de una más grande e incompleta.

---

## Qué haría distinto con más tiempo

Con más tiempo migraría la base de datos a PostgreSQL y usaría bloqueos/transacciones más robustas para escenarios concurrentes. Implementaría autenticación con JWT, auditoría más detallada, pruebas automatizadas y despliegue en producción con Docker.

También desarrollaría una funcionalidad adicional enfocada en contexto social del dinero, por ejemplo:

- dividir cuentas entre varias personas  
- recordatorios automáticos de cobro  
- pagos recurrentes entre roommates  
- grupos familiares compartidos  

Eso conectaría mejor con el problema planteado en el reto.

---

## Qué NO sé

No afirmo dominar todos los escenarios financieros reales como regulación, prevención de fraude o sistemas de pagos bancarios de alto volumen. Tampoco afirmo ser experto en arquitectura fintech a gran escala.

Sé construir software sólido y aprender rápido, pero todavía tengo mucho por profundizar en temas de sistemas transaccionales distribuidos, compliance y escalabilidad financiera avanzada.

---

## Supuestos que hice y por qué

Asumí que este sistema opera como una **wallet cerrada**, donde el saldo existe dentro de la plataforma y las recargas son simuladas. Esto permitió enfocarme en la lógica interna de movimientos sin depender de bancos externos.

También asumí que cada usuario tiene una sola cuenta principal y que las transferencias son inmediatas. Esto simplifica el modelo inicial y permite demostrar el flujo principal sin complejidad innecesaria.

Asumí además que el entorno de evaluación sería local o fácilmente ejecutable, por eso elegí tecnologías rápidas de correr y revisar.

---

## Cómo usé IA

Usé IA como asistente técnico y de productividad, no como reemplazo del criterio de desarrollo. La utilicé principalmente para acelerar estructura inicial, revisar ideas de arquitectura, depurar errores puntuales y mejorar redacción/documentación.

Mi dinámica fue iterativa: yo definía qué quería construir, tomaba decisiones de diseño, ajustaba la lógica y validaba el resultado manualmente. La IA me ayudó a reducir tiempo operativo, pero la responsabilidad de qué construir, qué aceptar y qué corregir fue mía.

También la utilicé para mejorar la experiencia visual del frontend y organizar mejor la entrega final.

---

## Qué aprendí

Durante este reto reforcé algo importante: en productos que mueven dinero, la prioridad no es solo que “funcione”, sino que sea confiable, claro y trazable.

También aprendí que un buen producto técnico no depende únicamente del backend; la presentación, la claridad del flujo y la experiencia del usuario pesan bastante.

Me llevé además la importancia de limitar alcance. Es mejor resolver muy bien el problema central que intentar construir demasiadas cosas superficiales.
