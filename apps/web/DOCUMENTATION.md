# FLEX Frontend

## Resumen

FLEX es una app mobile-first de vida nocturna premium construida con:

- Next.js App Router
- React JSX
- TailwindCSS
- Framer Motion
- Lucide React

Esta fase es solo frontend.

No incluye:

- APIs
- backend
- autenticacion real
- base de datos

Toda la experiencia funciona con mock data.

## Estructura

- `src/app`
  Rutas, layouts, loading states y pagina 404.
- `src/components`
  Componentes reutilizables de UI, layout y bloques de experiencia.
- `src/data`
  Mock data centralizada para navegacion, reservas, salas VIP, pedidos y admin.
- `src/lib`
  Utilidades compartidas.

## Sistema visual

### `src/app/globals.css`

Define:

- fondos oscuros premium
- acentos violeta y cyan
- superficies glassmorphism
- grilla ambiental
- espaciado sobrio
- sombras suaves

### `src/app/layout.jsx`

Responsable de:

- metadata global
- idioma `es`
- carga de estilos globales

## Layouts

### `src/components/layout/top-nav.jsx`

Funcion:

- navegacion principal en desktop
- resalta la ruta activa
- muestra el estado general de apertura

### `src/components/layout/bottom-nav.jsx`

Funcion:

- navegacion principal en mobile
- prioriza rutas cortas y de uso frecuente

### `src/components/layout/app-shell.jsx`

Funcion:

- envuelve la experiencia principal
- aplica fondo ambiental
- mantiene el mismo ancho y espaciado en todas las paginas internas

## UI reutilizable

### `AmbientBackground`

Archivo: `src/components/ui/ambient-background.jsx`

Funcion:

- dibuja la grilla de fondo
- dibuja los halos ambientales

### `GlassCard`

Archivo: `src/components/ui/glass-card.jsx`

Funcion:

- contenedor principal de tarjetas y paneles

### `NeonButton`

Archivo: `src/components/ui/neon-button.jsx`

Funcion:

- boton principal de acciones
- variantes: `primary`, `secondary`, `ghost`

### `PageReveal`

Archivo: `src/components/ui/page-reveal.jsx`

Funcion:

- anima la entrada de cada pagina con una transicion suave

### `SectionHeading`

Archivo: `src/components/ui/section-heading.jsx`

Funcion:

- unifica eyebrow, titulo, descripcion y accion lateral

### `StatusPill`

Archivo: `src/components/ui/status-pill.jsx`

Funcion:

- muestra estados compactos como apertura, reserva o modo admin

### `PulseLoader`

Archivo: `src/components/ui/pulse-loader.jsx`

Funcion:

- loader principal del proyecto

### `SkeletonCard`

Archivo: `src/components/ui/skeleton-card.jsx`

Funcion:

- placeholder para cargas dentro del app shell

## Componentes de experiencia

### `ActionGrid`

Archivo: `src/components/experience/action-grid.jsx`

Funcion:

- accesos rapidos desde Inicio

### `AdminBoard`

Archivo: `src/components/experience/admin-board.jsx`

Funcion:

- muestra KPIs
- muestra senales operativas
- muestra actividad en vivo

### `AuthCard`

Archivo: `src/components/experience/auth-card.jsx`

Funcion:

- base visual comun para login, registro y recuperacion

### `InputField`

Archivo: `src/components/experience/input-field.jsx`

Funcion:

- input reutilizable para formularios

### `MenuShowcase`

Archivo: `src/components/experience/menu-showcase.jsx`

Funcion:

- lista categorias de bebidas, cocina y hookah

### `MetricCard`

Archivo: `src/components/experience/metric-card.jsx`

Funcion:

- KPI reutilizable para Inicio y Admin

### `ReservationList`

Archivo: `src/components/experience/reservation-list.jsx`

Funcion:

- lista reservas
- colorea el estado segun su situacion

### `VipRoomCard`

Archivo: `src/components/experience/vip-room-card.jsx`

Funcion:

- renderiza cada sala VIP con su atmosfera, precio y highlights

## Mock data

Archivo: `src/data/mock-data.js`

### `mainNav`

Funcion:

- navegacion principal desktop

Entradas:

- Inicio
- Explorar
- Reservas
- Pedidos
- Acceso QR
- DJ
- Perfil

### `mobileNav`

Funcion:

- navegacion principal mobile

Entradas:

- Inicio
- Reservas
- QR
- Pedidos
- Perfil

### `quickActions`

Funcion:

- tarjetas rapidas de Inicio

Entradas:

- Reservar mesa
- Salas VIP
- Acceso QR
- Pedir ahora

### `splashStats`

Funcion:

- metricas compactas de la pantalla inicial

Entradas:

- Aforo de hoy
- Espera media
- Salas VIP

### `heroMoments`

Funcion:

- momentos clave mostrados en la portada

Entradas:

- Entrada privada
- Pista principal
- Servicio conectado

### `vipRooms`

Funcion:

- contenido de las salas VIP

Entradas:

- Sala Negra
- Sala Roja
- Sala Dorada

Campos:

- `slug`
- `name`
- `mood`
- `capacity`
- `price`
- `accent`
- `border`
- `surface`
- `glow`
- `highlights`

### `nextReservation`

Funcion:

- resumen principal de la siguiente reserva en Inicio

Campos:

- `name`
- `schedule`
- `note`

### `reservations`

Funcion:

- listado base para Reservas e Historial

Estados:

- Confirmada
- En acceso
- Pendiente

### `reservationSteps`

Funcion:

- pasos compactos del flujo de reserva

### `exploreZones`

Funcion:

- zonas clave del club dentro de Explorar

Entradas:

- Entrada
- Pista principal
- Bar central

### `menuCategories`

Funcion:

- categorias del modulo de Pedidos

Entradas:

- Bebidas de autor
- Cocina
- Hookah

Campos por item:

- `name`
- `description`
- `price`

### `serviceNotes`

Funcion:

- notas de servicio mostradas encima del menu

### `djRequests`

Funcion:

- lista de canciones sugeridas al DJ

Campos:

- `title`
- `artist`
- `vibe`

### `notifications`

Funcion:

- avisos cortos de Inicio

### `qrDetails`

Funcion:

- detalles del acceso QR

### `analytics`

Funcion:

- KPIs del dashboard admin

### `adminSignals`

Funcion:

- estado operativo rapido del club

### `settingsGroups`

Funcion:

- grupos de ajustes

Entradas:

- Experiencia
- Pagos

### `profileStats`

Funcion:

- estadisticas resumidas del perfil

### `profileNotes`

Funcion:

- preferencias y comportamiento del usuario

### `liveActivity`

Funcion:

- feed de actividad en vivo para admin

## Paginas

### `/`

- portada de FLEX
- presenta el producto
- abre el acceso a la app

### `/acceso`

- entrada principal a la cuenta

### `/registro`

- creacion de perfil

### `/recuperar-acceso`

- recuperacion de acceso

### `/inicio`

- panel principal del usuario
- muestra siguiente reserva, accesos rapidos y avisos

### `/explorar`

- recorrido simple por las zonas clave del club

### `/reservas`

- vista del flujo de reserva y listado de reservas

### `/salas-vip`

- comparativa clara entre Sala Negra, Sala Roja y Sala Dorada

### `/pedidos`

- pedidos de bebidas, cocina y hookah

### `/acceso-qr`

- pase QR y contexto de ingreso

### `/sugerencias-dj`

- sugerencias musicales al DJ

### `/perfil`

- identidad del usuario, estadisticas y preferencias

### `/historial`

- historial de reservas

### `/ajustes`

- ajustes de experiencia y pagos

### `/panel-admin`

- panel operativo de la noche

### `/admin-dashboard`

- alias tecnico del dashboard admin

### `not-found`

- pagina 404 de la marca

## Estados de carga

### `src/app/loading.jsx`

- usa `PulseLoader`

### `src/app/(app)/loading.jsx`

- usa `SkeletonCard`

## Nota final

La experiencia actual busca una UX mas calmada, clara y premium, con menos ruido visual y una lectura mas natural en espanol.
