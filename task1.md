# Tareas Pendientes - MyAgencia

## Backend y Persistencia
- [x] **Integración con Firebase/Supabase** <!-- id: 0 -->
    - [x] Configurar proyecto en Firebase (Console + SDK)
    - [x] **Autenticación**: Reemplazar mock auth con Firebase Auth (Email/Pass)
    - [x] **Base de Datos (Firestore)**:
        - [ ] Migrar datos de `tours.js` a colección `tours` (Opcional)
        - [x] Crear servicio `toursService.js` (getTours, getTourById)
        - [x] Reemplazar `localStorage` en `Checkout.jsx` (createBooking)
        - [x] Reemplazar `localStorage` en `Admin.jsx` (getBookings, updateStatus)

## Seguridad y Autenticación
- [x] **Protección del Panel de Admin** <!-- id: 1 -->
    - [x] Implementar Login para administradores
    - [x] Proteger la ruta `/admin` (Route Guard)
    - [ ] Ocultar opciones de edición/borrado para usuarios no autenticados (si aplica)

## Funcionalidad y Flujo
- [x] **Validación de Checkout** <!-- id: 2 -->
    - [x] Mejorar validación de formularios (regex, feedback visual)
    - [x] UI de métodos de pago (Transferencia, Tarjeta simulada)

## Contenido y Diseño
- [x] **Revisión de Contenidos** <!-- id: 3 -->
    - [x] Asegurar consistencia en `Home.jsx` (Dynamic Data)
    - [x] Verificar `tours.js` (Syntax Fixes)
- [x] **Mejoras Visuales** <!-- id: 4 -->
    - [x] Transiciones de página (Framer Motion)
    - [ ] Optimizar imágenes

## Despliegue
- [ ] **Preparación para Producción** <!-- id: 5 -->
    - [ ] Configurar variables de entorno
    - [ ] Build y deploy (Vercel/Netlify/Firebase Hosting)

## Gestión de Tours
- [x] **Panel de Administración de Tours** <!-- id: 6 -->
    - [x] Actualizar `toursService.js` con CRUD completo
    - [x] Crear componente `ToursList.jsx`
    - [x] Crear componente `TourForm.jsx`
    - [x] Agregar pestañas en `Admin.jsx`
    - [x] Implementar crear tour
    - [x] Implementar editar tour
    - [x] Implementar eliminar tour
    - [ ] Migrar tours de `tours.js` a Firestore (opcional)

## Fase 1: Funcionalidad Core
- [x] **Conectar Frontend con Firestore** <!-- id: 7 -->
# Tareas Pendientes - MyAgencia

## Backend y Persistencia
- [x] **Integración con Firebase/Supabase** <!-- id: 0 -->
    - [x] Configurar proyecto en Firebase (Console + SDK)
    - [x] **Autenticación**: Reemplazar mock auth con Firebase Auth (Email/Pass)
    - [x] **Base de Datos (Firestore)**:
        - [ ] Migrar datos de `tours.js` a colección `tours` (Opcional)
        - [x] Crear servicio `toursService.js` (getTours, getTourById)
        - [x] Reemplazar `localStorage` en `Checkout.jsx` (createBooking)
        - [x] Reemplazar `localStorage` en `Admin.jsx` (getBookings, updateStatus)

## Seguridad y Autenticación
- [x] **Protección del Panel de Admin** <!-- id: 1 -->
    - [x] Implementar Login para administradores
    - [x] Proteger la ruta `/admin` (Route Guard)
    - [ ] Ocultar opciones de edición/borrado para usuarios no autenticados (si aplica)

## Funcionalidad y Flujo
- [x] **Validación de Checkout** <!-- id: 2 -->
    - [x] Mejorar validación de formularios (regex, feedback visual)
    - [x] UI de métodos de pago (Transferencia, Tarjeta simulada)

## Contenido y Diseño
- [x] **Revisión de Contenidos** <!-- id: 3 -->
    - [x] Asegurar consistencia en `Home.jsx` (Dynamic Data)
    - [x] Verificar `tours.js` (Syntax Fixes)
- [x] **Mejoras Visuales** <!-- id: 4 -->
    - [x] Transiciones de página (Framer Motion)
    - [ ] Optimizar imágenes

## Despliegue
- [ ] **Preparación para Producción** <!-- id: 5 -->
    - [ ] Configurar variables de entorno
    - [ ] Build y deploy (Vercel/Netlify/Firebase Hosting)

## Gestión de Tours
- [x] **Panel de Administración de Tours** <!-- id: 6 -->
    - [x] Actualizar `toursService.js` con CRUD completo
    - [x] Crear componente `ToursList.jsx`
    - [x] Crear componente `TourForm.jsx`
    - [x] Agregar pestañas en `Admin.jsx`
    - [x] Implementar crear tour
    - [x] Implementar editar tour
    - [x] Implementar eliminar tour
    - [ ] Migrar tours de `tours.js` a Firestore (opcional)

## Fase 1: Funcionalidad Core
- [x] **Conectar Frontend con Firestore** <!-- id: 7 -->
    - [x] Actualizar `Home.jsx` para usar Firestore
    - [x] Actualizar `Tours.jsx` para usar Firestore
    - [x] Actualizar `TourDetail.jsx` para usar Firestore
    - [x] Agregar estados de carga
    - [x] Filtrar solo tours activos

- [x] **Editor de Itinerario** <!-- id: 8 -->
    - [x] Crear componente `ItineraryEditor.jsx`
    - [x] Integrar en `TourForm.jsx`

- [/] **Migración de Datos** <!-- id: 9 -->
    - [x] Crear script/componente de migración
    - [ ] Ejecutar migración (Manual desde Admin)
    - [ ] Verificar datos en Firestore Console

- [x] **Reglas de Seguridad** <!-- id: 10 -->
    - [x] Crear archivo `firestore.rules`
    - [x] Configurar reglas de lectura/escritura
    - [ ] Deploy a Firebase (Manual)

## Fase 2: UX y Optimizaciones
- [ ] **Gestión de Imágenes** <!-- id: 11 -->
    - [ ] Configurar Firebase Storage
    - [ ] Implementar subida de imágenes en TourForm
    - [ ] Optimizar carga de imágenes

- [ ] **SEO y Metadatos** <!-- id: 12 -->
    - [ ] Implementar React Helmet
    - [ ] Títulos y descripciones dinámicas por página

- [ ] **Mejoras de UX** <!-- id: 13 -->
    - [ ] Implementar Toasts (notificaciones)
    - [ ] Lazy loading de componentes pesados
    - [ ] Mejorar manejo de errores 404
