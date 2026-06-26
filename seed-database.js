// ============================================
// RODIRAH RIGS - SEED DATABASE
// Script para inicializar datos de prueba
// ============================================

// NOTA: Este script debe ejecutarse en un entorno Node.js
// con Firebase Admin SDK instalado
// npm install firebase-admin

const admin = require('firebase-admin');

// ============================================
// CONFIGURACIÓN
// ============================================
const serviceAccount = require('./service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://TU_PROJECT_ID.firebaseio.com"
});

const db = admin.firestore();

// ============================================
// FUNCIÓN PARA GENERAR IDS
// ============================================
function generarId(prefix, numero) {
    return `${prefix}-${String(numero).padStart(3, '0')}`;
}

// ============================================
// DATOS DE PRUEBA - HARDWARE RIGS
// ============================================
const hardwareRigsData = [
    {
        idRig: generarId('RIG', 1),
        cliente: 'Gaming Pro Setup',
        tipoRig: 'Gaming Rig',
        componentes: {
            cpu: 'Intel Core i9-14900K',
            gpu: 'NVIDIA RTX 4090',
            ram: '64GB DDR5 6000MHz',
            storage: '2TB NVMe Samsung 990 PRO',
            motherboard: 'ASUS ROG Maximus Z790',
            psu: 'Corsair RM1000x 1000W',
            cooling: 'NZXT Kraken X73 RGB',
            case: 'NZXT H9 Elite'
        },
        componentesList: [
            'Intel Core i9-14900K',
            'NVIDIA RTX 4090 24GB',
            '64GB DDR5 6000MHz G.Skill Trident Z5',
            '2TB NVMe Samsung 990 PRO',
            'ASUS ROG Maximus Z790 Hero',
            'Corsair RM1000x 1000W 80+ Gold',
            'NZXT Kraken X73 RGB 360mm',
            'NZXT H9 Elite',
            '4x NZT RGB Fans'
        ],
        costoComponentes: 8500,
        costoManoObra: 500,
        costoTotal: 9000,
        fechaInicio: new Date('2025-01-15'),
        fechaEntrega: new Date('2025-01-22'),
        fechaEntregaReal: new Date('2025-01-21'),
        estado: 'entregado',
        imagenes: [],
        notas: 'Rig gaming de alto rendimiento con RGB personalizado',
        garantiaMeses: 12
    },
    {
        idRig: generarId('RIG', 2),
        cliente: 'Estación de Diseño',
        tipoRig: 'Workstation',
        componentes: {
            cpu: 'Intel Core i7-14700K',
            gpu: 'NVIDIA RTX 4080',
            ram: '32GB DDR5 5600MHz',
            storage: '1TB NVMe + 2TB HDD',
            motherboard: 'MSI MPG Z790',
            psu: 'EVGA 850W 80+ Gold',
            cooling: 'Noctua NH-D15',
            case: 'Fractal Design Define 7'
        },
        componentesList: [
            'Intel Core i7-14700K',
            'NVIDIA RTX 4080 16GB',
            '32GB DDR5 5600MHz',
            '1TB NVMe WD Black SN850X',
            '2TB Seagate Barracuda',
            'MSI MPG Z790 Edge',
            'EVGA SuperNOVA 850 G6',
            'Noctua NH-D15',
            'Fractal Design Define 7'
        ],
        costoComponentes: 4200,
        costoManoObra: 350,
        costoTotal: 4550,
        fechaInicio: new Date('2025-01-18'),
        fechaEntrega: new Date('2025-01-28'),
        estado: 'proceso',
        imagenes: [],
        notas: 'Workstation para diseño gráfico y edición de video',
        garantiaMeses: 12
    },
    {
        idRig: generarId('RIG', 3),
        cliente: 'Servidor NAS',
        tipoRig: 'Server',
        componentes: {
            cpu: 'Intel Xeon E-2388G',
            gpu: 'Integrada',
            ram: '64GB ECC DDR4',
            storage: '8TB HDD x4',
            motherboard: 'ASUS Pro WS W680-ACE',
            psu: 'Seasonic 750W 80+ Gold',
            cooling: 'Noctua NH-U12S',
            case: 'Fractal Design Node 804'
        },
        componentesList: [
            'Intel Xeon E-2388G',
            '64GB ECC DDR4 3200MHz',
            '4x 8TB Seagate IronWolf',
            'ASUS Pro WS W680-ACE',
            'Seasonic Focus GX-750',
            'Noctua NH-U12S',
            'Fractal Design Node 804'
        ],
        costoComponentes: 3800,
        costoManoObra: 400,
        costoTotal: 4200,
        fechaInicio: new Date('2025-01-20'),
        fechaEntrega: new Date('2025-02-05'),
        estado: 'pendiente',
        imagenes: [],
        notas: 'Servidor NAS para almacenamiento empresarial',
        garantiaMeses: 24
    },
    {
        idRig: generarId('RIG', 4),
        cliente: 'PC Streaming',
        tipoRig: 'Streaming Rig',
        componentes: {
            cpu: 'Intel Core i5-14600K',
            gpu: 'NVIDIA RTX 4070 Ti',
            ram: '32GB DDR5 6000MHz',
            storage: '1TB NVMe',
            motherboard: 'Gigabyte Z790 Gaming X',
            psu: 'Corsair RM850x',
            cooling: 'Arctic Liquid Freezer II 280',
            case: 'Lian Li O11 Dynamic'
        },
        componentesList: [
            'Intel Core i5-14600K',
            'NVIDIA RTX 4070 Ti 16GB',
            '32GB DDR5 6000MHz',
            '1TB NVMe Crucial P3 Plus',
            'Gigabyte Z790 Gaming X AX',
            'Corsair RM850x 850W',
            'Arctic Liquid Freezer II 280',
            'Lian Li O11 Dynamic'
        ],
        costoComponentes: 2800,
        costoManoObra: 300,
        costoTotal: 3100,
        fechaInicio: new Date('2025-01-22'),
        fechaEntrega: new Date('2025-01-30'),
        fechaEntregaReal: new Date('2025-01-29'),
        estado: 'entregado',
        imagenes: [],
        notas: 'PC optimizado para streaming y gaming',
        garantiaMeses: 12
    }
];

// ============================================
// DATOS DE PRUEBA - TECH & REPAIR
// ============================================
const techRepairData = [
    {
        idReparacion: generarId('REP', 1),
        cliente: 'Juan Pérez',
        tipoEquipo: 'Laptop',
        marca: 'ASUS',
        modelo: 'ROG Strix G15',
        numeroSerie: 'ASUS-2024-001',
        componente: 'Placa Madre',
        diagnosticoInicial: 'No enciende, posible corto en placa madre',
        diagnosticoFinal: 'Daño en MOSFET de alimentación',
        reparacionRealizada: 'Reemplazo de MOSFET y componentes dañados',
        componentesReemplazados: ['MOSFET IRF9530', 'Capacitores 100uF', 'Regulador de voltaje'],
        costoDiagnostico: 25,
        costoReparacion: 180,
        costoTotal: 205,
        fechaIngreso: new Date('2025-01-15'),
        fechaDiagnostico: new Date('2025-01-15'),
        fechaReparacion: new Date('2025-01-17'),
        fechaEntrega: new Date('2025-01-17'),
        estado: 'entregado',
        garantiaDias: 60,
        imagenes: [],
        notas: 'Reparación exitosa, equipo funcionando correctamente'
    },
    {
        idReparacion: generarId('REP', 2),
        cliente: 'María García',
        tipoEquipo: 'Desktop',
        marca: 'Custom',
        modelo: 'Gaming Build 2023',
        componente: 'GPU NVIDIA RTX 3080',
        diagnosticoInicial: 'Sobrecalentamiento, artfactos en pantalla',
        diagnosticoFinal: 'Pasta térmica seca, ventiladores obstruidos',
        reparacionRealizada: 'Limpieza completa y reemplazo de pasta térmica',
        componentesReemplazados: ['Pasta térmica Arctic MX-6', 'Pads térmicos'],
        costoDiagnostico: 0,
        costoReparacion: 75,
        costoTotal: 75,
        fechaIngreso: new Date('2025-01-18'),
        fechaDiagnostico: new Date('2025-01-18'),
        estado: 'proceso',
        garantiaDias: 30,
        imagenes: [],
        notas: 'En proceso de limpieza y mantenimiento'
    },
    {
        idReparacion: generarId('REP', 3),
        cliente: 'Carlos López',
        tipoEquipo: 'Laptop',
        marca: 'Dell',
        modelo: 'Inspiron 15 3000',
        componente: 'SSD NVMe Samsung 1TB',
        diagnosticoInicial: 'No detecta almacenamiento',
        diagnosticoFinal: 'Pendiente diagnóstico',
        reparacionRealizada: '',
        componentesReemplazados: [],
        costoDiagnostico: 30,
        costoReparacion: 0,
        costoTotal: 30,
        fechaIngreso: new Date('2025-01-20'),
        estado: 'pendiente',
        garantiaDias: 30,
        imagenes: [],
        notas: 'Esperando diagnóstico completo'
    },
    {
        idReparacion: generarId('REP', 4),
        cliente: 'Ana Martínez',
        tipoEquipo: 'Desktop',
        marca: 'Custom',
        modelo: 'Workstation 2022',
        componente: 'Fuente de Poder 850W',
        diagnosticoInicial: 'Se apaga aleatoriamente',
        diagnosticoFinal: 'Fallo en regulador de 12V',
        reparacionRealizada: 'Restauración completa de fuente de poder',
        componentesReemplazados: ['Capacitores principales', 'Regulador TL494'],
        costoDiagnostico: 0,
        costoReparacion: 120,
        costoTotal: 120,
        fechaIngreso: new Date('2025-01-10'),
        fechaDiagnostico: new Date('2025-01-10'),
        fechaReparacion: new Date('2025-01-12'),
        fechaEntrega: new Date('2025-01-12'),
        estado: 'entregado',
        garantiaDias: 90,
        imagenes: [],
        notas: 'Fuente restaurada y probada bajo carga'
    }
];

// ============================================
// DATOS DE PRUEBA - SYSTEMS & DEV
// ============================================
const systemsDevData = [
    {
        idProyecto: generarId('SYS', 1),
        cliente: 'Empresa TechStart',
        tipoProyecto: 'Configuración Servidor',
        titulo: 'Servidor de Archivos Windows Server 2022',
        descripcion: 'Configuración completa de servidor de archivos con Active Directory, DFS y políticas de backup automatizado',
        tecnologias: ['Windows Server 2022', 'Active Directory', 'DFS', 'Veeam Backup'],
        alcance: 'Servidor completo con 10 usuarios, backup diario y acceso remoto',
        costoEstimado: 1500,
        costoFinal: 1450,
        fechaInicio: new Date('2025-01-10'),
        fechaEntregaEstimada: new Date('2025-01-20'),
        fechaEntregaReal: new Date('2025-01-18'),
        estado: 'entregado',
        progreso: 100,
        documentos: [],
        notas: 'Proyecto entregado exitosamente'
    },
    {
        idProyecto: generarId('SYS', 2),
        cliente: 'Estudio Creativo',
        tipoProyecto: 'Script Automatización',
        titulo: 'Automatización de Procesos de Video',
        descripcion: 'Desarrollo de script Python para automatizar la conversión y organización de archivos de video',
        tecnologias: ['Python', 'FFmpeg', 'Node.js', 'AWS S3'],
        alcance: 'Script que procesa 500+ videos automáticamente',
        costoEstimado: 800,
        costoFinal: null,
        fechaInicio: new Date('2025-01-15'),
        fechaEntregaEstimada: new Date('2025-02-15'),
        estado: 'en_desarrollo',
        progreso: 65,
        documentos: [],
        notas: 'En desarrollo, módulo de conversión completado'
    },
    {
        idProyecto: generarId('SYS', 3),
        cliente: 'Cliente Individual',
        tipoProyecto: 'Optimización SO',
        titulo: 'Optimización Gaming Windows 11',
        descripcion: 'Configuración avanzada de Windows 11 para máximo rendimiento en juegos, incluyendo overclock seguro',
        tecnologias: ['Windows 11', 'Regedit', 'PowerShell', 'MSI Afterburner'],
        alcance: 'Optimización completa del sistema operativo',
        costoEstimado: 150,
        costoFinal: null,
        fechaInicio: new Date('2025-01-20'),
        fechaEntregaEstimada: new Date('2025-01-22'),
        estado: 'pendiente',
        progreso: 0,
        documentos: [],
        notas: 'Pendiente de inicio'
    },
    {
        idProyecto: generarId('SYS', 4),
        cliente: 'Startup DataViz',
        tipoProyecto: 'Desarrollo Web',
        titulo: 'Dashboard de Monitoreo en Tiempo Real',
        descripcion: 'Desarrollo de panel de control para monitoreo de servidores y métricas en tiempo real',
        tecnologias: ['React', 'Node.js', 'WebSocket', 'Chart.js', 'MongoDB'],
        alcance: 'Dashboard completo con autenticación y reportes',
        costoEstimado: 3500,
        costoFinal: null,
        fechaInicio: new Date('2025-01-25'),
        fechaEntregaEstimada: new Date('2025-03-25'),
        estado: 'en_desarrollo',
        progreso: 25,
        documentos: [],
        notas: 'Fase de diseño completada, iniciando desarrollo'
    }
];

// ============================================
// DATOS DE PRUEBA - CLIENTES
// ============================================
const clientesData = [
    {
        nombre: 'Gaming Pro Setup',
        email: 'gaming@empresa.com',
        telefono: '+503 1234-5678',
        telefonoAlterno: '+503 1234-5679',
        direccion: 'Colonia Escalón, San Salvador',
        ciudad: 'San Salvador',
        empresa: 'Gaming Pro Setup S.A. de C.V.',
        dui: '12345678-9',
        nit: '0614-123456-001-2',
        tipoCliente: 'empresa',
        totalProyectos: 5,
        totalGastado: 12500,
        fechaRegistro: new Date('2024-06-15'),
        ultimaVisita: new Date('2025-01-21'),
        notas: 'Cliente VIP, múltiples proyectos de gaming',
        preferencias: {
            metodoContacto: 'email',
            horarioPreferido: 'mañana'
        }
    },
    {
        nombre: 'Estación de Diseño',
        email: 'diseno@estudio.com',
        telefono: '+503 2345-6789',
        empresa: 'Estudio Creativo',
        tipoCliente: 'empresa',
        totalProyectos: 3,
        totalGastado: 6800,
        fechaRegistro: new Date('2024-08-20'),
        ultimaVisita: new Date('2025-01-18'),
        notas: 'Estudio de diseño gráfico',
        preferencias: {
            metodoContacto: 'telefono',
            horarioPreferido: 'tarde'
        }
    },
    {
        nombre: 'Empresa TechStart',
        email: 'contacto@techstart.com',
        telefono: '+503 3456-7890',
        empresa: 'TechStart Solutions',
        tipoCliente: 'empresa',
        totalProyectos: 8,
        totalGastado: 18500,
        fechaRegistro: new Date('2024-03-10'),
        ultimaVisita: new Date('2025-01-10'),
        notas: 'Cliente empresarial, múltiples proyectos TI',
        preferencias: {
            metodoContacto: 'email',
            horarioPreferido: 'mañana'
        }
    },
    {
        nombre: 'Juan Pérez',
        email: 'juan@email.com',
        telefono: '+503 1234-5678',
        tipoCliente: 'individual',
        totalProyectos: 2,
        totalGastado: 450,
        fechaRegistro: new Date('2024-11-05'),
        ultimaVisita: new Date('2025-01-15'),
        notas: 'Cliente individual, reparaciones de laptop'
    },
    {
        nombre: 'María García',
        email: 'maria@email.com',
        telefono: '+503 2345-6789',
        tipoCliente: 'individual',
        totalProyectos: 1,
        totalGastado: 75,
        fechaRegistro: new Date('2025-01-10'),
        ultimaVisita: new Date('2025-01-18'),
        notas: 'Mantenimiento de PC gamer'
    }
];

// ============================================
// DATOS DE PRUEBA - INVENTARIO
// ============================================
const inventarioData = [
    {
        codigo: 'CPU-001',
        nombre: 'Intel Core i9-14900K',
        categoria: 'Procesador (CPU)',
        marca: 'Intel',
        modelo: 'i9-14900K',
        especificaciones: '24 cores / 32 threads, 6.0GHz max turbo, LGA1700',
        cantidad: 5,
        stockMinimo: 2,
        stockMaximo: 10,
        costoCompra: 580,
        precioVenta: 650,
        estado: 'disponible',
        ubicacion: 'Estante A-1',
        proveedor: 'Intel Distribuidor',
        proveedorContacto: 'ventas@intel-dist.com',
        fechaUltimaCompra: new Date('2025-01-01'),
        imagenes: [],
        notas: 'Procesador flagship para gaming y workstation'
    },
    {
        codigo: 'GPU-001',
        nombre: 'NVIDIA RTX 4090',
        categoria: 'Tarjeta Gráfica (GPU)',
        marca: 'NVIDIA',
        modelo: 'RTX 4090 Founders Edition',
        especificaciones: '24GB GDDR6X, 16384 CUDA cores, 450W TDP',
        cantidad: 3,
        stockMinimo: 1,
        stockMaximo: 5,
        costoCompra: 1600,
        precioVenta: 1800,
        estado: 'disponible',
        ubicacion: 'Estante A-2',
        proveedor: 'NVIDIA Partner',
        proveedorContacto: 'orders@nvidia-partner.com',
        fechaUltimaCompra: new Date('2025-01-05'),
        imagenes: [],
        notas: 'GPU tope de línea para gaming y AI'
    },
    {
        codigo: 'RAM-001',
        nombre: 'G.Skill Trident Z5 64GB DDR5',
        categoria: 'Memoria RAM',
        marca: 'G.Skill',
        modelo: 'F5-6000J3038F48G',
        especificaciones: '64GB (2x32GB), DDR5-6000, CL30',
        cantidad: 8,
        stockMinimo: 3,
        stockMaximo: 15,
        costoCompra: 280,
        precioVenta: 320,
        estado: 'disponible',
        ubicacion: 'Estante B-1',
        proveedor: 'Memory Distributor',
        proveedorContacto: 'sales@memorydist.com',
        fechaUltimaCompra: new Date('2025-01-08'),
        imagenes: [],
        notas: 'RAM de alto rendimiento para gaming'
    },
    {
        codigo: 'SSD-001',
        nombre: 'Samsung 990 PRO 2TB NVMe',
        categoria: 'Almacenamiento',
        marca: 'Samsung',
        modelo: 'MZ-V9P2T0BW',
        especificaciones: '2TB, PCIe 4.0 x4, 7450 MB/s read',
        cantidad: 12,
        stockMinimo: 5,
        stockMaximo: 20,
        costoCompra: 165,
        precioVenta: 195,
        estado: 'disponible',
        ubicacion: 'Estante B-2',
        proveedor: 'Samsung Electronics',
        proveedorContacto: 'b2b@samsung.com',
        fechaUltimaCompra: new Date('2025-01-10'),
        imagenes: [],
        notas: 'SSD NVMe de última generación'
    },
    {
        codigo: 'MB-001',
        nombre: 'ASUS ROG Maximus Z790 Hero',
        categoria: 'Placa Madre',
        marca: 'ASUS',
        modelo: 'ROG MAXIMUS Z790 HERO',
        especificaciones: 'LGA1700, DDR5, PCIe 5.0, WiFi 6E',
        cantidad: 4,
        stockMinimo: 2,
        stockMaximo: 8,
        costoCompra: 580,
        precioVenta: 650,
        estado: 'disponible',
        ubicacion: 'Estante C-1',
        proveedor: 'ASUS Store',
        proveedorContacto: 'business@asus.com',
        fechaUltimaCompra: new Date('2025-01-05'),
        imagenes: [],
        notas: 'Placa madre premium para Intel 14th gen'
    },
    {
        codigo: 'PSU-001',
        nombre: 'Corsair RM1000x 1000W',
        categoria: 'Fuente de Poder',
        marca: 'Corsair',
        modelo: 'RM1000x',
        especificaciones: '1000W, 80+ Gold, Fully Modular',
        cantidad: 6,
        stockMinimo: 2,
        stockMaximo: 10,
        costoCompra: 180,
        precioVenta: 220,
        estado: 'disponible',
        ubicacion: 'Estante C-2',
        proveedor: 'Corsair',
        proveedorContacto: 'sales@corsair.com',
        fechaUltimaCompra: new Date('2025-01-08'),
        imagenes: [],
        notas: 'Fuente de poder 80+ Gold certificada'
    },
    {
        codigo: 'COOL-001',
        nombre: 'NZXT Kraken X73 RGB 360mm',
        categoria: 'Refrigeración',
        marca: 'NZXT',
        modelo: 'RL-KRX73-01',
        especificaciones: '360mm AIO, RGB, 2.36" LCD display',
        cantidad: 3,
        stockMinimo: 1,
        stockMaximo: 6,
        costoCompra: 220,
        precioVenta: 270,
        estado: 'bajo_stock',
        ubicacion: 'Estante D-1',
        proveedor: 'NZXT',
        proveedorContacto: 'orders@nzxt.com',
        fechaUltimaCompra: new Date('2024-12-20'),
        imagenes: [],
        notas: 'Refrigeración líquida AIO premium'
    },
    {
        codigo: 'CASE-001',
        nombre: 'NZXT H9 Elite',
        categoria: 'Gabinete',
        marca: 'NZXT',
        modelo: 'H9 Elite',
        especificaciones: 'Mid Tower, 4x 140mm fans, RGB, Tempered Glass',
        cantidad: 2,
        stockMinimo: 1,
        stockMaximo: 5,
        costoCompra: 250,
        precioVenta: 300,
        estado: 'bajo_stock',
        ubicacion: 'Estante D-2',
        proveedor: 'NZXT',
        proveedorContacto: 'orders@nzxt.com',
        fechaUltimaCompra: new Date('2024-12-15'),
        imagenes: [],
        notas: 'Gabinete premium con excelente airflow'
    },
    {
        codigo: 'TOOL-001',
        nombre: 'Kit Destornilladores Precision',
        categoria: 'Herramientas',
        marca: 'iFixit',
        modelo: 'Pro Tech Toolkit',
        especificaciones: '64 bits, anti-estático, maletín',
        cantidad: 10,
        stockMinimo: 3,
        stockMaximo: 15,
        costoCompra: 45,
        precioVenta: 60,
        estado: 'disponible',
        ubicacion: 'Estante E-1',
        proveedor: 'iFixit',
        proveedorContacto: 'bulk@ifixit.com',
        fechaUltimaCompra: new Date('2024-11-01'),
        imagenes: [],
        notas: 'Kit de herramientas profesional'
    },
    {
        codigo: 'ACC-001',
        nombre: 'Pasta Térmica Arctic MX-6',
        categoria: 'Accesorios',
        marca: 'Arctic',
        modelo: 'MX-6',
        especificaciones: '4g, 8.5 W/mK, no conductiva',
        cantidad: 25,
        stockMinimo: 10,
        stockMaximo: 50,
        costoCompra: 6,
        precioVenta: 10,
        estado: 'disponible',
        ubicacion: 'Estante E-2',
        proveedor: 'Arctic',
        proveedorContacto: 'sales@arctic.de',
        fechaUltimaCompra: new Date('2025-01-12'),
        imagenes: [],
        notas: 'Pasta térmica de alta performance'
    }
];

// ============================================
// FUNCIÓN PRINCIPAL DE SEED
// ============================================
async function seedDatabase() {
    console.log('🌱 Iniciando seed de base de datos RODIRAH...\n');

    try {
        // 1. Seed Hardware RIGS
        console.log('📦 Insertando Hardware RIGS...');
        for (const rig of hardwareRigsData) {
            await db.collection('hardware_rigs').doc(rig.idRig).set(rig);
            console.log(`  ✓ ${rig.idRig} - ${rig.cliente}`);
        }

        // 2. Seed Tech & Repair
        console.log('\n🔧 Insertando Tech & Repair...');
        for (const rep of techRepairData) {
            await db.collection('tech_repair').doc(rep.idReparacion).set(rep);
            console.log(`  ✓ ${rep.idReparacion} - ${rep.cliente}`);
        }

        // 3. Seed Systems & Dev
        console.log('\n💻 Insertando Systems & Dev...');
        for (const proy of systemsDevData) {
            await db.collection('systems_dev').doc(proy.idProyecto).set(proy);
            console.log(`  ✓ ${proy.idProyecto} - ${proy.cliente}`);
        }

        // 4. Seed Clientes
        console.log('\n👥 Insertando Clientes...');
        for (const cliente of clientesData) {
            await db.collection('clientes').doc(cliente.email).set(cliente);
            console.log(`  ✓ ${cliente.nombre}`);
        }

        // 5. Seed Inventario
        console.log('\n📊 Insertando Inventario...');
        for (const item of inventarioData) {
            await db.collection('inventario').doc(item.codigo).set(item);
            console.log(`  ✓ ${item.codigo} - ${item.nombre}`);
        }

        console.log('\n✅ Seed completado exitosamente!');
        console.log('\n📊 Resumen:');
        console.log(`  - ${hardwareRigsData.length} proyectos Hardware RIGS`);
        console.log(`  - ${techRepairData.length} reparaciones Tech & Repair`);
        console.log(`  - ${systemsDevData.length} proyectos Systems & Dev`);
        console.log(`  - ${clientesData.length} clientes`);
        console.log(`  - ${inventarioData.length} items de inventario`);

    } catch (error) {
        console.error('\n❌ Error durante el seed:', error);
        throw error;
    } finally {
        process.exit(0);
    }
}

// ============================================
// EJECUTAR SEED
// ============================================
seedDatabase().catch(console.error);