# Lista de Tareas Priorizada - MyAgencia

## 🚀 Fase 1: Integridad de Datos y Funcionalidad Crítica (Alta Prioridad)
Esta fase se enfoca en asegurar que la gestión de datos sea robusta y completa.

### Firebase & Backend
- [x] **Validación de Slug Único** ✅
  - Evitar sobrescribir tours si el título genera el mismo slug
  - Verificar existencia de slug antes de crear/actualizar en `toursService`
  - Implementado en `toursService.js` con función `checkSlugExists()`

- [ ] **Reglas de Seguridad de Firestore**
  - Actualmente en "test mode" (inseguro)
  - Configurar reglas de producción para tours y bookings

### Gestión de Tours
- [x] **Gestión de Galería de Imágenes** ✅
  - Actualmente `TourForm` solo permite subir una imagen principal
  - Modificar `TourForm` para manejar array de imágenes (`gallery`)
  - Permitir subir múltiples imágenes y reordenarlas
  - Implementado componente `MultiImageUpload.jsx`

### Validaciones Críticas
- [ ] **Validación de Disponibilidad en Reservas**
  - `Checkout.jsx` crea reservas sin verificar cupos
  - Implementar verificación de `groupSize` vs reservas existentes
  - Bloquear fechas sin disponibilidad en calendario de `TourDetail`

- [x] **Validación de Capacidad** ✅
  - Verificar que `numPeople` no exceda `groupSize`
  - Mostrar error antes de permitir checkout
  - Implementado en `TourDetail.jsx` con función `getMaxCapacity()`

---

## 🛠️ Fase 2: Mejoras del Panel de Administración (Media Prioridad)
Mejorar la experiencia del administrador y el control sobre el contenido.

### Dashboard Mejorado
- [ ] **Dashboard con Gráficos**
  - `Admin.jsx` tiene contadores básicos
  - Implementar gráficos de "Reservas por Mes" usando `recharts`
  - Mostrar "Tours Más Vendidos"
  - Gráfico de ingresos totales

### Gestión de Contenido
- [x] **Gestión de Reseñas** ✅
  - No hay interfaz para moderar reseñas
  - Agregar pestaña "Reseñas" en Admin
  - Permitir aprobar/eliminar/editar reseñas
  - Implementado `ReviewsList.jsx` con moderación completa
  - Creado `reviewsService.js` con colección separada
  - Formulario cliente `ReviewForm.jsx` y display premium en `TourDetail.jsx`

- [x] **Paginación en Lista de Tours** ✅
  - Actualmente muestra todos
  - Implementar paginación o scroll infinito
  - Implementado con 10 items por página y controles completos

- [x] **Filtros Avanzados en Tours (Admin)** ✅
  - Por estado (activo/inactivo)
  - Por categoría
  - Por rango de precio
  - Implementado en `ToursList.jsx` con UI de filtros

### UI/UX Admin
- [ ] **Reemplazar Modales Nativos**
  - Reemplazar `confirm()` nativo con modal personalizado
  - Actualmente se usa en `Admin.jsx` (línea 42)
  - Crear componente `ConfirmModal`

---

## ✨ Fase 3: Experiencia de Usuario y Optimización (Baja Prioridad)
Pulir la experiencia final del usuario.

### Funcionalidades de Usuario
- [ ] **Filtros Avanzados de Tours (Frontend)**
  - Filtrar por rango de precio
  - Filtrar por duración
  - Filtrar por dificultad

- [ ] **Búsqueda Mejorada**
  - Búsqueda por tags
  - Búsqueda por precio
  - Búsqueda por duración

- [ ] **Preview del Tour Antes de Publicar**
  - Ver cómo se verá en el frontend
  - Botón "Vista previa" en `TourForm`

- [ ] **Duplicar Tour**
  - Copiar tour existente como plantilla
  - Útil para tours similares

### Internacionalización
- [ ] **Internacionalización del Admin**
  - El panel está hardcodeado en español
  - Usar `useTranslation` en `Admin.jsx`, `TourForm.jsx`, etc.

- [ ] **Tours Multiidioma**
  - Guardar traducciones en Firestore
  - Selector de idioma en formulario

### Notificaciones
- [ ] **Email Automático al Crear Reserva**
  - Firebase Functions
  - Template de email
  - Enviar a cliente y admin

- [ ] **WhatsApp Notification**
  - Integración con API de WhatsApp Business
  - Notificar al admin de nuevas reservas

### Optimizaciones
- [ ] **Optimización de Imágenes**
  - Redimensionar automáticamente
  - Generar thumbnails
  - Lazy loading implementado

- [ ] **Caché de Tours**
  - React Query o SWR
  - Reducir llamadas a Firestore

- [ ] **Lazy Loading de Componentes**
  - Code splitting
  - Reducir bundle size

### SEO & Analytics
- [ ] **Google Analytics**
  - Tracking de visitas
  - Conversiones

- [ ] **Sitemap Automático**
  - Generar desde Firestore
  - Actualizar al crear/editar tours

---

## 🔐 Seguridad (Media Prioridad)

- [ ] **Autenticación de 2 Factores**
  - Para admin
  - Mayor seguridad

- [ ] **Roles de Usuario**
  - Admin, Editor, Viewer
  - Permisos granulares

- [ ] **Logs de Auditoría**
  - Quién creó/editó/eliminó qué
  - Timestamp de cambios

---

## 📱 Responsive & Accesibilidad (Baja Prioridad)

- [ ] **Mejorar Formulario en Móvil**
  - Inputs más grandes
  - Mejor UX táctil

- [ ] **Accesibilidad (a11y)**
  - ARIA labels
  - Navegación por teclado
  - Screen reader support

- [ ] **Dark Mode**
  - Toggle en navbar
  - Persistir preferencia

---

## 🧪 Testing (Baja Prioridad)

- [ ] **Tests Unitarios**
  - Servicios de Firebase
  - Componentes clave

- [ ] **Tests E2E**
  - Flujo completo de reserva
  - Flujo de creación de tour

---

## 📦 Deployment (Media Prioridad)

- [ ] **CI/CD Pipeline**
  - GitHub Actions
  - Deploy automático

- [ ] **Environment Variables**
  - Separar dev/staging/prod
  - Diferentes proyectos Firebase

- [ ] **Monitoreo**
  - Error tracking (Sentry)
  - Performance monitoring

---

## ✅ Tareas Completadas

- [x] **Conectar Frontend con Firestore**
  - `Home.jsx` y `Tours.jsx` usan `getAllTours()` de `toursService`
  - Filtran tours con `isActive: true`

- [x] **Editor de Itinerario**
  - Componente `ItineraryEditor` implementado
  - Incluido en `TourForm`

- [x] **Subida de Imágenes a Firebase Storage**
  - Componente `ImageUpload` implementado
  - Integrado con Firebase Storage

- [x] **Meta Tags Dinámicos**
  - Componente `SEO` implementado con `react-helmet-async`
  - Usado en todas las páginas principales

- [x] **Mensajes de Éxito/Error**
  - `react-hot-toast` instalado
  - Usado en `Login.jsx` y `TourForm.jsx`

---

## 🎯 Recomendación de Orden de Implementación

**Sprint 1 - Funcionalidad Core:**
1. Validación de slug único
2. Gestión de galería de imágenes
3. Validación de disponibilidad en reservas
4. Reglas de seguridad de Firestore

**Sprint 2 - Admin UX:**
5. Reemplazar modales nativos
6. Dashboard con gráficos
7. Gestión de reseñas
8. Internacionalización del admin

**Sprint 3 - Optimización:**
9. Caché y performance
10. Notificaciones automáticas
11. SEO y analytics
12. Testing completo
