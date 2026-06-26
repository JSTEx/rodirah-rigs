# RODIRAH // RIGS - Ingeniería de Hardware y Sistemas

Landing Page pública + Panel Administrativo privado para servicios profesionales de ingeniería de hardware.

## 📁 Estructura del Proyecto

```
/
├── public/                 # Archivos públicos (Landing Page)
│   ├── index.html          # Landing Page pública
│   ├── style.css           # Estilos globales (públicos)
│   └── app.js              # Lógica pública + cotizador
├── admin/                  # Panel Administrativo (privado)
│   ├── index.html          # Dashboard administrativo
│   ├── admin-style.css     # Estilos del panel admin
│   └── admin-app.js        # Lógica de autenticación y gestión
├── vercel.json            # Configuración de deployment
└── README.md              # Documentación del proyecto
```

## 🚀 Stack Tecnológico

- **HTML5** - Estructura semántica
- **CSS3** - Estilos con Grid, Flexbox y Variables CSS
- **Vanilla JavaScript** - Lógica sin frameworks
- **Firebase SDK** - Autenticación y Firestore (v9 compat)
- **Chart.js v4.4.0** - Gráficas estadísticas (CDN)
- **Google Fonts** - Inter + Fira Code

## 🎨 Sistema de Diseño

### Filosofía: Minimalismo "Vivo"
Diseño limpio, profesional y sofisticado que transmite ingeniería de precisión.

### Tema Oscuro (Por Defecto)
- Fondo principal: `#0A0F1A`
- Fondo secundario: `#111827`
- Paneles: `#151B2B`
- Texto principal: `#F9FAFB`
- Texto secundario: `#9CA3AF`
- Acento: `#3B82F6` (Azul Eléctrico Sofisticado)

### Tema Claro
- Fondo: `#FAFBFC`
- Paneles: `#FFFFFF`
- Texto: `#111827`
- Acento: `#2563EB` (Azul más sólido)

### Características
- ✅ Modo oscuro/claro con persistencia en localStorage
- ✅ Transiciones suaves (0.2s - 0.3s)
- ✅ Bordes sutiles (6px - 12px)
- ✅ Sombras minimalistas
- ✅ Espaciado generoso para "respiración"
- ✅ Tipografía Inter (limpia y moderna)
- ✅ Diseño responsive (mobile-first)
- ✅ Animaciones de entrada suaves
- ✅ Sin efectos de neón o brillos intensos

## ⚙️ Configuración de Firebase

### Paso 1: Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita **Authentication**:
   - Ve a Authentication → Sign-in method
   - Habilita "Email/Password"
   - Crea un usuario administrador
4. Habilita **Firestore Database**:
   - Ve a Firestore Database → Create database
   - Selecciona "Start in test mode" (por ahora)
   - Elige una ubicación

### Paso 2: Obtener Credenciales

1. En Firebase Console, ve a **Project Settings** (⚙️)
2. Baja a "Your apps" → Agrega una app web
3. Copia el objeto `firebaseConfig`

### Paso 3: Configurar en el Proyecto

Edita **public/app.js** (líneas 7-14) y **admin/admin-app.js** (líneas 7-14):

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",
    authDomain: "TU_AUTH_DOMAIN_AQUI",
    projectId: "TU_PROJECT_ID_AQUI",
    storageBucket: "TU_STORAGE_BUCKET_AQUI",
    messagingSenderId: "TU_MESSAGING_SENDER_ID_AQUI",
    appId: "TU_APP_ID_AQUI"
};
```

### Paso 4: Configurar Reglas de Firestore (Producción)

En Firestore → Rules, actualiza a:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Colección de solicitudes (pública para lectura, solo admin escribe)
    match /solicitudes/{solicitud} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
    
    // Otras colecciones (solo admin autenticado)
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 📦 Características Implementadas

### Landing Page (Pública)
- ✅ Header con navegación y toggle de tema
- ✅ Menú hamburguesa responsive
- ✅ Hero section con estadísticas
- ✅ **3 Pilares de Servicio**:
  - **HARDWARE RIGS**: Ensamble y customización de equipos de alto rendimiento
  - **TECH & REPAIR**: Diagnóstico avanzado, reparación y mantenimiento profundo
  - **SYSTEMS & DEV**: Optimización de software y desarrollo de soluciones a medida
- ✅ **Cotizador flotante draggable** con 9 operaciones:
  - Suma, Resta, Multiplicación, División
  - Porcentaje de, Sumar %, Restar %
  - Total con IVA, Total Cotización
- ✅ Formulario de contacto que guarda en Firestore
- ✅ Footer con enlaces

### Panel Administrativo (RODIRAH // ADMIN CONSOLE)
- ✅ Sistema de autenticación Firebase
- ✅ Login/Logout funcional
- ✅ Dashboard central con métricas
- ✅ **Gráfica de barras**: Ventas por mes
- ✅ **Gráfica de pastel**: Estados de proyectos
- ✅ **Hardware RIGS**: Gestión de ensambles custom
- ✅ **Tech & Repair**: Control de reparaciones
- ✅ **Systems & Dev**: Seguimiento de proyectos
- ✅ **Clientes**: Base de datos unificada
- ✅ **Inventario**: Control de componentes
- ✅ Búsqueda avanzada en tiempo real
- ✅ Navegación por secciones sin recarga

## 🎯 Funcionalidades del Cotizador

El cotizador incluye las siguientes operaciones:

1. **Suma** - Suma dos valores
2. **Resta** - Resta dos valores
3. **Multiplicación** - Multiplica dos valores
4. **División** - Divide con validación de divisor cero
5. **Porcentaje de** - Calcula X% de Y
6. **Sumar porcentaje** - Suma X% a un valor
7. **Restar porcentaje** - Resta X% a un valor
8. **Total con IVA** - Calcula subtotal + IVA
9. **Total Cotización** - Calcula precio con margen, cantidad e IVA

### Características del Cotizador
- 🖱️ **Draggable**: Arrastra el panel por la pantalla
- 📐 **Auto-ajuste**: Se mantiene dentro del viewport
- 🔄 **Campos dinámicos**: Cambian según la operación
- 💾 **Persistencia de resultados**
- ⌨️ **Atajos de teclado** (Enter para calcular)

## 🚀 Deployment en Vercel

### Opción 1: Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Opción 2: GitHub + Vercel

1. Sube el proyecto a GitHub
2. Ve a [Vercel](https://vercel.com/)
3. Importa tu repositorio
4. Configura:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (dejar vacío)
   - **Output Directory**: ./
5. Click "Deploy"

### Configuración de Rutas

El archivo `vercel.json` ya está configurado con URLs limpias:

```json
{
  "rewrites": [
    { "source": "/admin/(.*)", "destination": "/admin/$1" },
    { "source": "/admin", "destination": "/admin/index.html" },
    { "source": "/inicio", "destination": "/index.html" },
    { "source": "/servicios", "destination": "/index.html" },
    { "source": "/contacto", "destination": "/index.html" }
  ]
}
```

Esto permite navegación sin hash (`/inicio`, `/servicios`, `/contacto`) y acceso al panel en `/admin`.

## 🔐 Seguridad

### Autenticación
- Firebase Authentication con email/password
- Protección de rutas del panel admin
- Cierre de sesión automático

### Firestore Rules
- Solicitudes públicas pueden ser creadas por cualquiera
- Solo usuarios autenticados pueden modificar/eliminar
- Panel admin completamente protegido

## 📱 Responsive Breakpoints

- **Desktop**: > 968px
- **Tablet**: 641px - 968px
- **Mobile**: < 640px

## 🎨 Paleta de Colores

```css
/* Tema Oscuro */
--bg-primary: #0A0F1A
--bg-secondary: #141C2F
--bg-tertiary: #1E293B
--text-primary: #F3F4F6
--text-secondary: #9CA3AF
--accent: #00D2FF
--accent-hover: #00B8E6

/* Tema Claro */
--bg-primary: #F9FAFB
--bg-secondary: #FFFFFF
--bg-tertiary: #F3F4F6
--text-primary: #111827
--text-secondary: #6B7280
--accent: #00D2FF
```

## 📝 Notas Importantes

1. **Firebase Config**: Reemplaza las credenciales placeholder en ambos archivos JS
2. **Usuario Admin**: Crea el primer usuario en Firebase Authentication
3. **Firestore Rules**: Ajusta las reglas según tus necesidades de seguridad
4. **Datos de Prueba**: El panel admin incluye datos estáticos para demostración
5. **Producción**: Cambia las reglas de Firestore a modo producción

## 🗄️ Base de Datos Firestore

### Colecciones Principales

El proyecto utiliza **6 colecciones** organizadas por los 3 pilares de servicio:

#### 1. **solicitudes** (Pública)
- Formulario de contacto desde la landing page
- Cualquiera puede crear solicitudes
- Solo admin puede modificar/eliminar

#### 2. **hardware_rigs** (Privada)
- Proyectos de ensamble custom
- Campos: idRig, cliente, tipoRig, componentes, costos, fechas, estado
- 4 registros de prueba incluidos

#### 3. **tech_repair** (Privada)
- Reparaciones y mantenimiento
- Campos: idReparacion, cliente, componente, diagnóstico, costos, estado
- 4 registros de prueba incluidos

#### 4. **systems_dev** (Privada)
- Proyectos de software y optimización
- Campos: idProyecto, cliente, tipo, tecnologías, progreso, estado
- 4 registros de prueba incluidos

#### 5. **clientes** (Privada)
- Base de datos unificada de clientes
- Campos: nombre, email, teléfono, empresa, estadísticas
- 5 registros de prueba incluidos

#### 6. **inventario** (Privada)
- Control de componentes y repuestos
- Campos: código, nombre, categoría, cantidad, precios, proveedor
- 10 items de prueba incluidos

### Configuración de Base de Datos

#### Paso 1: Crear Service Account

1. Ve a Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Guarda el archivo como `service-account.json` en la raíz del proyecto
4. **IMPORTANTE**: No subas este archivo a Git (agregar a .gitignore)

#### Paso 2: Instalar Dependencias

```bash
npm init -y
npm install firebase-admin
```

#### Paso 3: Ejecutar Seed de Datos

```bash
node seed-database.js
```

El script insertará:
- 4 proyectos Hardware RIGS
- 4 reparaciones Tech & Repair
- 4 proyectos Systems & Dev
- 5 clientes
- 10 items de inventario

#### Paso 4: Aplicar Reglas de Seguridad

1. Ve a Firebase Console → Firestore → Rules
2. Copia el contenido de `firestore.rules`
3. Click "Publish"

### Estructura de Archivos de Base de Datos

```
/
├── firestore-database.js      # Documentación completa del schema
├── firestore.rules            # Reglas de seguridad Firestore
├── seed-database.js           # Script de inicialización de datos
├── service-account.json       # Credenciales (NO subir a Git)
└── service-account.json.example  # Template de credenciales
```

### Características de la Base de Datos

- ✅ **6 colecciones** organizadas por área de servicio
- ✅ **Validación de datos** en reglas de seguridad
- ✅ **Índices optimizados** para búsquedas rápidas
- ✅ **Relaciones** entre colecciones (referencias)
- ✅ **Campos de auditoría** (fechas, estados, notas)
- ✅ **Control de inventario** con stock mínimo/máximo
- ✅ **Sistema de garantías** diferenciado por servicio

## 🛠️ Personalización

### Cambiar Colores
Edita las variables CSS en `:root` de ambos archivos CSS.

### Agregar Servicios
Modifica la sección de servicios en `index.html`.

### Modificar Operaciones del Cotizador
Edita el objeto `calculadoraOperaciones` en `app.js`.

### Cambiar Datos de Prueba
Modifica la función `generarDatosPrueba()` en `admin/admin-app.js`.

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

## 👨‍💻 Desarrollo

Construido con ❤️ usando HTML5, CSS3, JavaScript vanilla y Firebase.

**RODIRAH // RIGS** - Ingeniería de Hardware y Sistemas

---

**¿Preguntas?** Revisa la documentación de [Firebase](https://firebase.google.com/docs) y [Chart.js](https://www.chartjs.org/docs/).