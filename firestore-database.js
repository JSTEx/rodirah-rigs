// ============================================
// RODIRAH // RIGS - ESTRUCTURA DE BASE DE DATOS
// Firestore Database Schema
// ============================================

/*
 * ESTRUCTURA COMPLETA DE FIRESTORE
 * 
 * Colecciones:
 * 1. solicitudes - Formulario de contacto público
 * 2. hardware_rigs - Proyectos de ensamble custom
 * 3. tech_repair - Reparaciones y mantenimiento
 * 4. systems_dev - Proyectos de software
 * 5. clientes - Base de datos de clientes
 * 6. inventario - Control de componentes
 */

// ============================================
// 1. COLECCIÓN: solicitudes
// Formulario público de contacto
// ============================================
const solicitudesSchema = {
    // Estructura del documento
    fields: {
        // Información del cliente
        nombre: {
            type: 'string',
            required: true,
            description: 'Nombre completo del cliente'
        },
        telefono: {
            type: 'string',
            required: true,
            description: 'Número de teléfono de contacto'
        },
        email: {
            type: 'string',
            required: true,
            description: 'Correo electrónico del cliente'
        },
        equipo: {
            type: 'string',
            required: true,
            description: 'Modelo del equipo a intervenir'
        },
        problema: {
            type: 'string',
            required: true,
            description: 'Descripción detallada del problema'
        },
        
        // Metadatos
        fecha: {
            type: 'timestamp',
            required: true,
            description: 'Fecha y hora de la solicitud'
        },
        estado: {
            type: 'string',
            required: true,
            default: 'pendiente',
            options: ['pendiente', 'en_proceso', 'completado', 'cancelado'],
            description: 'Estado actual de la solicitud'
        },
        
        // Clasificación
        categoria: {
            type: 'string',
            required: false,
            options: ['hardware_rigs', 'tech_repair', 'systems_dev'],
            description: 'Categoría del servicio solicitado'
        },
        
        // Asignación
        asignadoA: {
            type: 'reference',
            required: false,
            description: 'Referencia al técnico asignado'
        },
        notas: {
            type: 'string',
            required: false,
            description: 'Notas internas del equipo'
        }
    },
    
    // Índices para búsquedas
    indexes: [
        { fields: ['estado', 'fecha'] },
        { fields: ['categoria', 'fecha'] },
        { fields: ['email'] },
        { fields: ['telefono'] }
    ],
    
    // Reglas de seguridad
    rules: {
        read: 'true',  // Público puede ver sus propias solicitudes
        create: 'true',  // Cualquiera puede crear
        update: 'request.auth != null',  // Solo admin
        delete: 'request.auth != null'  // Solo admin
    }
};

// ============================================
// 2. COLECCIÓN: hardware_rigs
// Proyectos de ensamble y customización
// ============================================
const hardwareRigsSchema = {
    fields: {
        // Identificación
        idRig: {
            type: 'string',
            required: true,
            unique: true,
            description: 'ID único del proyecto RIG'
        },
        
        // Cliente
        cliente: {
            type: 'string',
            required: true,
            description: 'Nombre del cliente'
        },
        clienteId: {
            type: 'reference',
            required: false,
            description: 'Referencia al documento del cliente'
        },
        
        // Especificaciones del RIG
        tipoRig: {
            type: 'string',
            required: true,
            options: ['Gaming Rig', 'Workstation', 'Server', 'Streaming Rig', 'Custom'],
            description: 'Tipo de configuración'
        },
        
        componentes: {
            type: 'map',
            required: true,
            description: 'Lista de componentes principales',
            subfields: {
                cpu: { type: 'string' },
                gpu: { type: 'string' },
                ram: { type: 'string' },
                storage: { type: 'string' },
                motherboard: { type: 'string' },
                psu: { type: 'string' },
                cooling: { type: 'string' },
                case: { type: 'string' }
            }
        },
        
        componentesList: {
            type: 'array',
            required: false,
            description: 'Lista completa de componentes'
        },
        
        // Presupuesto
        costoComponentes: {
            type: 'number',
            required: true,
            description: 'Costo total de componentes'
        },
        costoManoObra: {
            type: 'number',
            required: true,
            description: 'Costo de mano de obra'
        },
        costoTotal: {
            type: 'number',
            required: true,
            description: 'Costo total del proyecto'
        },
        
        // Fechas
        fechaInicio: {
            type: 'timestamp',
            required: true,
            description: 'Fecha de inicio del proyecto'
        },
        fechaEntrega: {
            type: 'timestamp',
            required: false,
            description: 'Fecha estimada de entrega'
        },
        fechaEntregaReal: {
            type: 'timestamp',
            required: false,
            description: 'Fecha real de entrega'
        },
        
        // Estado
        estado: {
            type: 'string',
            required: true,
            default: 'pendiente',
            options: ['pendiente', 'en_proceso', 'ensamblando', 'testing', 'entregado', 'cancelado'],
            description: 'Estado del proyecto'
        },
        
        // Documentación
        imagenes: {
            type: 'array',
            required: false,
            description: 'URLs de imágenes del progreso'
        },
        notas: {
            type: 'string',
            required: false,
            description: 'Notas técnicas del proyecto'
        },
        
        // Garantía
        garantiaMeses: {
            type: 'number',
            required: false,
            default: 6,
            description: 'Meses de garantía'
        }
    },
    
    indexes: [
        { fields: ['estado', 'fechaInicio'] },
        { fields: ['clienteId'] },
        { fields: ['tipoRig'] }
    ],
    
    rules: {
        read: 'request.auth != null',
        write: 'request.auth != null'
    }
};

// ============================================
// 3. COLECCIÓN: tech_repair
// Reparaciones y mantenimiento
// ============================================
const techRepairSchema = {
    fields: {
        // Identificación
        idReparacion: {
            type: 'string',
            required: true,
            unique: true,
            description: 'ID único de la reparación'
        },
        
        // Cliente
        cliente: {
            type: 'string',
            required: true,
            description: 'Nombre del cliente'
        },
        clienteId: {
            type: 'reference',
            required: false,
            description: 'Referencia al documento del cliente'
        },
        
        // Equipo
        tipoEquipo: {
            type: 'string',
            required: true,
            options: ['Laptop', 'Desktop', 'Servidor', 'Impresora', 'Otro'],
            description: 'Tipo de equipo'
        },
        marca: {
            type: 'string',
            required: true,
            description: 'Marca del equipo'
        },
        modelo: {
            type: 'string',
            required: true,
            description: 'Modelo del equipo'
        },
        numeroSerie: {
            type: 'string',
            required: false,
            description: 'Número de serie'
        },
        
        // Componente
        componente: {
            type: 'string',
            required: true,
            description: 'Componente a reparar'
        },
        
        // Diagnóstico
        diagnosticoInicial: {
            type: 'string',
            required: true,
            description: 'Diagnóstico inicial del problema'
        },
        diagnosticoFinal: {
            type: 'string',
            required: false,
            description: 'Diagnóstico final después de revisión'
        },
        
        // Reparación
        reparacionRealizada: {
            type: 'string',
            required: false,
            description: 'Descripción de la reparación'
        },
        componentesReemplazados: {
            type: 'array',
            required: false,
            description: 'Lista de componentes reemplazados'
        },
        
        // Costos
        costoDiagnostico: {
            type: 'number',
            required: false,
            default: 0,
            description: 'Costo del diagnóstico'
        },
        costoReparacion: {
            type: 'number',
            required: true,
            description: 'Costo de la reparación'
        },
        costoTotal: {
            type: 'number',
            required: true,
            description: 'Costo total'
        },
        
        // Fechas
        fechaIngreso: {
            type: 'timestamp',
            required: true,
            description: 'Fecha de ingreso del equipo'
        },
        fechaDiagnostico: {
            type: 'timestamp',
            required: false,
            description: 'Fecha del diagnóstico'
        },
        fechaReparacion: {
            type: 'timestamp',
            required: false,
            description: 'Fecha de finalización'
        },
        fechaEntrega: {
            type: 'timestamp',
            required: false,
            description: 'Fecha de entrega al cliente'
        },
        
        // Estado
        estado: {
            type: 'string',
            required: true,
            default: 'pendiente',
            options: ['pendiente', 'diagnosticando', 'esperando_repuestos', 'reparando', 'listo', 'entregado', 'cancelado'],
            description: 'Estado de la reparación'
        },
        
        // Garantía
        garantiaDias: {
            type: 'number',
            required: false,
            default: 30,
            description: 'Días de garantía de la reparación'
        },
        
        // Documentación
        imagenes: {
            type: 'array',
            required: false,
            description: 'URLs de imágenes del proceso'
        },
        notas: {
            type: 'string',
            required: false,
            description: 'Notas técnicas'
        }
    },
    
    indexes: [
        { fields: ['estado', 'fechaIngreso'] },
        { fields: ['clienteId'] },
        { fields: ['componente'] }
    ],
    
    rules: {
        read: 'request.auth != null',
        write: 'request.auth != null'
    }
};

// ============================================
// 4. COLECCIÓN: systems_dev
// Proyectos de software y optimización
// ============================================
const systemsDevSchema = {
    fields: {
        // Identificación
        idProyecto: {
            type: 'string',
            required: true,
            unique: true,
            description: 'ID único del proyecto'
        },
        
        // Cliente
        cliente: {
            type: 'string',
            required: true,
            description: 'Nombre del cliente'
        },
        clienteId: {
            type: 'reference',
            required: false,
            description: 'Referencia al documento del cliente'
        },
        
        // Proyecto
        tipoProyecto: {
            type: 'string',
            required: true,
            options: [
                'Optimización SO',
                'Desarrollo Web',
                'Script Automatización',
                'Configuración Servidor',
                'Desarrollo App',
                'Consultoría',
                'Otro'
            ],
            description: 'Tipo de proyecto'
        },
        
        titulo: {
            type: 'string',
            required: true,
            description: 'Título del proyecto'
        },
        descripcion: {
            type: 'text',
            required: true,
            description: 'Descripción detallada del proyecto'
        },
        
        // Tecnologías
        tecnologias: {
            type: 'array',
            required: false,
            description: 'Tecnologías utilizadas'
        },
        
        // Alcance
        alcance: {
            type: 'text',
            required: false,
            description: 'Alcance del proyecto'
        },
        
        // Costos
        costoEstimado: {
            type: 'number',
            required: true,
            description: 'Costo estimado'
        },
        costoFinal: {
            type: 'number',
            required: false,
            description: 'Costo final del proyecto'
        },
        
        // Fechas
        fechaInicio: {
            type: 'timestamp',
            required: true,
            description: 'Fecha de inicio'
        },
        fechaEntregaEstimada: {
            type: 'timestamp',
            required: false,
            description: 'Fecha estimada de entrega'
        },
        fechaEntregaReal: {
            type: 'timestamp',
            required: false,
            description: 'Fecha real de entrega'
        },
        
        // Estado
        estado: {
            type: 'string',
            required: true,
            default: 'pendiente',
            options: ['pendiente', 'en_desarrollo', 'testing', 'entregado', 'mantenimiento', 'cancelado'],
            description: 'Estado del proyecto'
        },
        
        // Progreso
        progreso: {
            type: 'number',
            required: false,
            min: 0,
            max: 100,
            description: 'Porcentaje de progreso (0-100)'
        },
        
        // Documentación
        documentos: {
            type: 'array',
            required: false,
            description: 'URLs de documentos y archivos'
        },
        notas: {
            type: 'string',
            required: false,
            description: 'Notas técnicas'
        }
    },
    
    indexes: [
        { fields: ['estado', 'fechaInicio'] },
        { fields: ['clienteId'] },
        { fields: ['tipoProyecto'] }
    ],
    
    rules: {
        read: 'request.auth != null',
        write: 'request.auth != null'
    }
};

// ============================================
// 5. COLECCIÓN: clientes
// Base de datos unificada de clientes
// ============================================
const clientesSchema = {
    fields: {
        // Información personal
        nombre: {
            type: 'string',
            required: true,
            description: 'Nombre completo del cliente'
        },
        email: {
            type: 'string',
            required: true,
            unique: true,
            description: 'Correo electrónico principal'
        },
        telefono: {
            type: 'string',
            required: true,
            description: 'Teléfono de contacto'
        },
        telefonoAlterno: {
            type: 'string',
            required: false,
            description: 'Teléfono alterno'
        },
        
        // Ubicación
        direccion: {
            type: 'string',
            required: false,
            description: 'Dirección física'
        },
        ciudad: {
            type: 'string',
            required: false,
            description: 'Ciudad'
        },
        
        // Información adicional
        empresa: {
            type: 'string',
            required: false,
            description: 'Nombre de empresa (si aplica)'
        },
        dui: {
            type: 'string',
            required: false,
            description: 'DUI (El Salvador)'
        },
        nit: {
            type: 'string',
            required: false,
            description: 'NIT (si aplica)'
        },
        
        // Clasificación
        tipoCliente: {
            type: 'string',
            required: false,
            options: ['individual', 'empresa', 'vip'],
            default: 'individual',
            description: 'Tipo de cliente'
        },
        
        // Estadísticas
        totalProyectos: {
            type: 'number',
            required: false,
            default: 0,
            description: 'Total de proyectos realizados'
        },
        totalGastado: {
            type: 'number',
            required: false,
            default: 0,
            description: 'Total gastado en servicios'
        },
        
        // Fechas
        fechaRegistro: {
            type: 'timestamp',
            required: true,
            description: 'Fecha de registro del cliente'
        },
        ultimaVisita: {
            type: 'timestamp',
            required: false,
            description: 'Fecha de última visita'
        },
        
        // Notas
        notas: {
            type: 'text',
            required: false,
            description: 'Notas sobre el cliente'
        },
        
        // Preferencias
        preferencias: {
            type: 'map',
            required: false,
            description: 'Preferencias del cliente',
            subfields: {
                metodoContacto: { type: 'string' },
                horarioPreferido: { type: 'string' }
            }
        }
    },
    
    indexes: [
        { fields: ['email'], unique: true },
        { fields: ['telefono'] },
        { fields: ['tipoCliente'] },
        { fields: ['fechaRegistro'] }
    ],
    
    rules: {
        read: 'request.auth != null',
        write: 'request.auth != null'
    }
};

// ============================================
// 6. COLECCIÓN: inventario
// Control de componentes y repuestos
// ============================================
const inventarioSchema = {
    fields: {
        // Identificación
        codigo: {
            type: 'string',
            required: true,
            unique: true,
            description: 'Código único del producto'
        },
        
        // Información básica
        nombre: {
            type: 'string',
            required: true,
            description: 'Nombre del componente'
        },
        categoria: {
            type: 'string',
            required: true,
            options: [
                'Procesador (CPU)',
                'Tarjeta Gráfica (GPU)',
                'Memoria RAM',
                'Almacenamiento',
                'Placa Madre',
                'Fuente de Poder',
                'Refrigeración',
                'Gabinete',
                'Monitor',
                'Periféricos',
                'Herramientas',
                'Accesorios',
                'Otro'
            ],
            description: 'Categoría del componente'
        },
        
        // Especificaciones
        marca: {
            type: 'string',
            required: true,
            description: 'Marca del fabricante'
        },
        modelo: {
            type: 'string',
            required: true,
            description: 'Modelo específico'
        },
        especificaciones: {
            type: 'text',
            required: false,
            description: 'Especificaciones técnicas'
        },
        
        // Inventario
        cantidad: {
            type: 'number',
            required: true,
            min: 0,
            description: 'Cantidad en stock'
        },
        stockMinimo: {
            type: 'number',
            required: true,
            min: 0,
            description: 'Cantidad mínima de stock'
        },
        stockMaximo: {
            type: 'number',
            required: false,
            description: 'Cantidad máxima de stock'
        },
        
        // Precios
        costoCompra: {
            type: 'number',
            required: true,
            description: 'Costo de compra unitario'
        },
        precioVenta: {
            type: 'number',
            required: true,
            description: 'Precio de venta unitario'
        },
        
        // Estado
        estado: {
            type: 'string',
            required: true,
            options: ['disponible', 'bajo_stock', 'agotado', 'descontinuado'],
            description: 'Estado del inventario'
        },
        
        // Ubicación
        ubicacion: {
            type: 'string',
            required: false,
            description: 'Ubicación física en almacén'
        },
        
        // Proveedor
        proveedor: {
            type: 'string',
            required: false,
            description: 'Nombre del proveedor'
        },
        proveedorContacto: {
            type: 'string',
            required: false,
            description: 'Contacto del proveedor'
        },
        
        // Fechas
        fechaUltimaCompra: {
            type: 'timestamp',
            required: false,
            description: 'Fecha de última compra'
        },
        fechaVencimiento: {
            type: 'timestamp',
            required: false,
            description: 'Fecha de vencimiento (si aplica)'
        },
        
        // Imágenes
        imagenes: {
            type: 'array',
            required: false,
            description: 'URLs de imágenes del producto'
        },
        
        // Notas
        notas: {
            type: 'text',
            required: false,
            description: 'Notas adicionales'
        }
    },
    
    indexes: [
        { fields: ['categoria', 'estado'] },
        { fields: ['codigo'], unique: true },
        { fields: ['estado'] },
        { fields: ['cantidad'] }
    ],
    
    rules: {
        read: 'request.auth != null',
        write: 'request.auth != null'
    }
};

// ============================================
// EXPORTAR ESQUEMAS
// ============================================
module.exports = {
    solicitudesSchema,
    hardwareRigsSchema,
    techRepairSchema,
    systemsDevSchema,
    clientesSchema,
    inventarioSchema
};

// ============================================
// INSTRUCCIONES DE IMPLEMENTACIÓN
// ============================================
/*
 * PASO 1: Crear colecciones en Firestore
 * 
 * En Firebase Console:
 * 1. Ve a Firestore Database
 * 2. Crea las siguientes colecciones:
 *    - solicitudes
 *    - hardware_rigs
 *    - tech_repair
 *    - systems_dev
 *    - clientes
 *    - inventario
 * 
 * PASO 2: Configurar reglas de seguridad
 * 
 * En Firestore → Rules, usar las reglas definidas en cada schema
 * 
 * PASO 3: Crear índices
 * 
 * Firestore solicitará automáticamente crear los índices
 * cuando intentes hacer consultas que los necesiten
 * 
 * PASO 4: Poblar con datos iniciales
 * 
 * Usar el script de seed para cargar datos de prueba
 */