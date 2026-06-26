// ============================================
// RODIRAH RIGS | ADMIN CONSOLE
// Sistema de Gestión de Ingeniería
// ============================================

// ============================================
// CONFIGURACIÓN DE FIREBASE
// IMPORTANTE: Usa las mismas credenciales que en app.js
// ============================================
const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",
    authDomain: "TU_AUTH_DOMAIN_AQUI",
    projectId: "TU_PROJECT_ID_AQUI",
    storageBucket: "TU_STORAGE_BUCKET_AQUI",
    messagingSenderId: "TU_MESSAGING_SENDER_ID_AQUI",
    appId: "TU_APP_ID_AQUI"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ============================================
// VARIABLES GLOBALES
// ============================================
let hardwareRigsData = [];
let techRepairData = [];
let systemsDevData = [];
let clientesData = [];
let ventasChart = null;
let estadosChart = null;

// ============================================
// GESTIÓN DE AUTENTICACIÓN
// ============================================
const loginContainer = document.getElementById('login-container');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const btnLogout = document.getElementById('btn-logout');

// Verificar estado de autenticación al cargar
auth.onAuthStateChanged((user) => {
    if (user) {
        loginContainer.style.display = 'none';
        dashboard.style.display = 'flex';
        cargarDatosIniciales();
        inicializarGraficas();
    } else {
        loginContainer.style.display = 'flex';
        dashboard.style.display = 'none';
    }
});

// Manejar login
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        try {
            await auth.signInWithEmailAndPassword(email, password);
            loginError.textContent = '';
        } catch (error) {
            console.error('Error de login:', error);
            let mensaje = 'Error al iniciar sesión';
            
            if (error.code === 'auth/user-not-found') {
                mensaje = 'Usuario no encontrado';
            } else if (error.code === 'auth/wrong-password') {
                mensaje = 'Contraseña incorrecta';
            } else if (error.code === 'auth/invalid-email') {
                mensaje = 'Email inválido';
            } else if (error.code === 'auth/too-many-requests') {
                mensaje = 'Demasiados intentos. Intenta más tarde';
            }
            
            loginError.textContent = mensaje;
        }
    });
}

// Manejar logout
if (btnLogout) {
    btnLogout.addEventListener('click', async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    });
}

// ============================================
// NAVEGACIÓN DEL DASHBOARD
// ============================================
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content-section');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        const sectionId = item.getAttribute('data-section');
        sections.forEach(section => section.classList.remove('active'));
        
        const targetSection = document.getElementById(`section-${sectionId}`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// ============================================
// DATOS DE PRUEBA - RODIRAH
// ============================================
function generarDatosPrueba() {
    // Hardware RIGS
    hardwareRigsData = [
        {
            id: 'RIG-001',
            cliente: 'Gaming Pro Setup',
            tipo: 'Gaming Rig',
            fecha: new Date('2025-01-15'),
            estado: 'entregado',
            componentes: 'RTX 4090, i9-14900K, 64GB DDR5'
        },
        {
            id: 'RIG-002',
            cliente: 'Estación de Diseño',
            tipo: 'Workstation',
            fecha: new Date('2025-01-18'),
            estado: 'proceso',
            componentes: 'RTX 4080, i7-14700K, 32GB DDR5'
        },
        {
            id: 'RIG-003',
            cliente: 'Servidor NAS',
            tipo: 'Server',
            fecha: new Date('2025-01-20'),
            estado: 'pendiente',
            componentes: 'Xeon E-2388G, 64GB ECC, 8TB HDD'
        },
        {
            id: 'RIG-004',
            cliente: 'PC Streaming',
            tipo: 'Streaming Rig',
            fecha: new Date('2025-01-22'),
            estado: 'entregado',
            componentes: 'RTX 4070 Ti, i5-14600K, 32GB DDR5'
        }
    ];

    // Tech & Repair
    techRepairData = [
        {
            id: 'REP-001',
            cliente: 'Juan Pérez',
            componente: 'Placa Madre ASUS ROG',
            fecha: new Date('2025-01-15'),
            estado: 'entregado',
            diagnostico: 'Cambio de componentes dañados'
        },
        {
            id: 'REP-002',
            cliente: 'María García',
            componente: 'GPU NVIDIA RTX 3080',
            fecha: new Date('2025-01-18'),
            estado: 'proceso',
            diagnostico: 'Reemplazo de pasta térmica'
        },
        {
            id: 'REP-003',
            cliente: 'Carlos López',
            componente: 'SSD NVMe Samsung 1TB',
            fecha: new Date('2025-01-20'),
            estado: 'pendiente',
            diagnostico: 'Diagnóstico de fallo'
        },
        {
            id: 'REP-004',
            cliente: 'Ana Martínez',
            componente: 'Fuente de Poder 850W',
            fecha: new Date('2025-01-22'),
            estado: 'entregado',
            diagnostico: 'Restauración completa'
        }
    ];

    // Systems & Dev
    systemsDevData = [
        {
            id: 'SYS-001',
            cliente: 'Empresa TechStart',
            tipo: 'Optimización Windows Server',
            fechaInicio: new Date('2025-01-10'),
            estado: 'entregado',
            descripcion: 'Configuración de servidor de archivos'
        },
        {
            id: 'SYS-002',
            cliente: 'Estudio Creativo',
            tipo: 'Custom Script Python',
            fechaInicio: new Date('2025-01-15'),
            estado: 'proceso',
            descripcion: 'Automatización de procesos'
        },
        {
            id: 'SYS-003',
            cliente: 'Cliente Individual',
            tipo: 'Optimización Gaming',
            fechaInicio: new Date('2025-01-20'),
            estado: 'pendiente',
            descripcion: 'Configuración de overclock seguro'
        },
        {
            id: 'SYS-004',
            cliente: 'Startup DataViz',
            tipo: 'Desarrollo Dashboard',
            fechaInicio: new Date('2025-01-25'),
            estado: 'proceso',
            descripcion: 'Panel de monitoreo en tiempo real'
        }
    ];

    // Clientes
    clientesData = [
        {
            nombre: 'Gaming Pro Setup',
            email: 'gaming@empresa.com',
            telefono: '+503 1234-5678',
            totalProyectos: 5
        },
        {
            nombre: 'Estación de Diseño',
            email: 'diseno@estudio.com',
            telefono: '+503 2345-6789',
            totalProyectos: 3
        },
        {
            nombre: 'Empresa TechStart',
            email: 'contacto@techstart.com',
            telefono: '+503 3456-7890',
            totalProyectos: 8
        },
        {
            nombre: 'Estudio Creativo',
            email: 'info@estudio.com',
            telefono: '+503 4567-8901',
            totalProyectos: 4
        },
        {
            nombre: 'Startup DataViz',
            email: 'hola@dataviz.com',
            telefono: '+503 5678-9012',
            totalProyectos: 2
        }
    ];
}

// ============================================
// CARGAR DATOS INICIALES
// ============================================
function cargarDatosIniciales() {
    generarDatosPrueba();
    renderizarTablaHardwareRigs(hardwareRigsData);
    renderizarTablaTechRepair(techRepairData);
    renderizarTablaSystemsDev(systemsDevData);
    renderizarTablaClientes(clientesData);
}

// ============================================
// RENDERIZAR TABLA HARDWARE RIGS
// ============================================
function renderizarTablaHardwareRigs(datos) {
    const tbody = document.getElementById('hardware-rigs-tbody');
    if (!tbody) return;

    if (datos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                        <p>No se encontraron rigs</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = datos.map(rig => {
        const fechaFormateada = rig.fecha.toLocaleDateString('es-SV', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        const estadoClass = `status-${rig.estado}`;
        const estadoTexto = rig.estado === 'entregado' ? 'Entregado' :
                           rig.estado === 'proceso' ? 'En Proceso' : 'Pendiente';

        return `
            <tr>
                <td class="font-mono">${rig.id}</td>
                <td>
                    <div style="font-weight: 500;">${rig.cliente}</div>
                </td>
                <td>${rig.tipo}</td>
                <td>${fechaFormateada}</td>
                <td>
                    <span class="status-badge ${estadoClass}">${estadoTexto}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" title="Ver detalles" onclick="verRig('${rig.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <button class="btn-action" title="Editar" onclick="editarRig('${rig.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// ============================================
// RENDERIZAR TABLA TECH & REPAIR
// ============================================
function renderizarTablaTechRepair(datos) {
    const tbody = document.getElementById('tech-repair-tbody');
    if (!tbody) return;

    if (datos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                        </svg>
                        <p>No se encontraron reparaciones</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = datos.map(rep => {
        const fechaFormateada = rep.fecha.toLocaleDateString('es-SV', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        const estadoClass = `status-${rep.estado}`;
        const estadoTexto = rep.estado === 'entregado' ? 'Entregado' :
                           rep.estado === 'proceso' ? 'En Proceso' : 'Pendiente';

        return `
            <tr>
                <td class="font-mono">${rep.id}</td>
                <td>
                    <div style="font-weight: 500;">${rep.cliente}</div>
                </td>
                <td>${rep.componente}</td>
                <td>${fechaFormateada}</td>
                <td>
                    <span class="status-badge ${estadoClass}">${estadoTexto}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" title="Ver detalles" onclick="verReparacion('${rep.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <button class="btn-action" title="Editar" onclick="editarReparacion('${rep.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// ============================================
// RENDERIZAR TABLA SYSTEMS & DEV
// ============================================
function renderizarTablaSystemsDev(datos) {
    const tbody = document.getElementById('systems-dev-tbody');
    if (!tbody) return;

    if (datos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                        <p>No se encontraron proyectos</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = datos.map(proyecto => {
        const fechaFormateada = proyecto.fechaInicio.toLocaleDateString('es-SV', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        const estadoClass = `status-${proyecto.estado}`;
        const estadoTexto = proyecto.estado === 'entregado' ? 'Entregado' :
                           proyecto.estado === 'proceso' ? 'En Proceso' : 'Pendiente';

        return `
            <tr>
                <td class="font-mono">${proyecto.id}</td>
                <td>
                    <div style="font-weight: 500;">${proyecto.cliente}</div>
                </td>
                <td>${proyecto.tipo}</td>
                <td>${fechaFormateada}</td>
                <td>
                    <span class="status-badge ${estadoClass}">${estadoTexto}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" title="Ver detalles" onclick="verProyecto('${proyecto.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <button class="btn-action" title="Editar" onclick="editarProyecto('${proyecto.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// ============================================
// RENDERIZAR TABLA DE CLIENTES
// ============================================
function renderizarTablaClientes(datos) {
    const tbody = document.getElementById('clientes-tbody');
    if (!tbody) return;

    if (datos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <p>No se encontraron clientes</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = datos.map(cliente => `
        <tr>
            <td>
                <div style="font-weight: 500;">${cliente.nombre}</div>
            </td>
            <td>${cliente.email}</td>
            <td class="font-mono">${cliente.telefono}</td>
            <td class="font-mono">${cliente.totalProyectos}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action" title="Ver historial" onclick="verCliente('${cliente.email}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                    <button class="btn-action" title="Editar" onclick="editarCliente('${cliente.email}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ============================================
// BÚSQUEDA Y FILTRADO
// ============================================
const searchInput = document.getElementById('search-input');
const filterEstado = document.getElementById('filter-estado');

if (searchInput) {
    searchInput.addEventListener('input', filtrarClientes);
}

if (filterEstado) {
    filterEstado.addEventListener('change', filtrarClientes);
}

function filtrarClientes() {
    const terminoBusqueda = searchInput.value.toLowerCase();

    let resultados = clientesData;

    if (terminoBusqueda) {
        resultados = resultados.filter(cliente => 
            cliente.nombre.toLowerCase().includes(terminoBusqueda) ||
            cliente.telefono.includes(terminoBusqueda) ||
            cliente.email.toLowerCase().includes(terminoBusqueda)
        );
    }

    renderizarTablaClientes(resultados);
}

// ============================================
// FUNCIONES DE ACCIÓN
// ============================================
function verRig(id) {
    const rig = hardwareRigsData.find(r => r.id === id);
    if (rig) {
        alert(`Detalles de RIG ${id}\n\nCliente: ${rig.cliente}\nTipo: ${rig.tipo}\nComponentes: ${rig.componentes}\nEstado: ${rig.estado}`);
    }
}

function editarRig(id) {
    alert(`Función de edición para RIG ${id}\n\nAquí se abriría un modal para editar los datos del rig.`);
}

function verReparacion(id) {
    const rep = techRepairData.find(r => r.id === id);
    if (rep) {
        alert(`Detalles de Reparación ${id}\n\nCliente: ${rep.cliente}\nComponente: ${rep.componente}\nDiagnóstico: ${rep.diagnostico}\nEstado: ${rep.estado}`);
    }
}

function editarReparacion(id) {
    alert(`Función de edición para reparación ${id}\n\nAquí se abriría un modal para editar los datos de la reparación.`);
}

function verProyecto(id) {
    const proyecto = systemsDevData.find(p => p.id === id);
    if (proyecto) {
        alert(`Detalles de Proyecto ${id}\n\nCliente: ${proyecto.cliente}\nTipo: ${proyecto.tipo}\nDescripción: ${proyecto.descripcion}\nEstado: ${proyecto.estado}`);
    }
}

function editarProyecto(id) {
    alert(`Función de edición para proyecto ${id}\n\nAquí se abriría un modal para editar los datos del proyecto.`);
}

function verCliente(email) {
    const cliente = clientesData.find(c => c.email === email);
    if (cliente) {
        alert(`Historial de ${cliente.nombre}\n\nTotal de proyectos: ${cliente.totalProyectos}\nEmail: ${cliente.email}\nTeléfono: ${cliente.telefono}`);
    }
}

function editarCliente(email) {
    alert(`Función de edición para cliente ${email}\n\nAquí se abriría un modal para editar los datos del cliente.`);
}

// ============================================
// GRÁFICAS CON CHART.JS
// ============================================
function inicializarGraficas() {
    inicializarGraficaVentas();
    inicializarGraficaEstados();
}

function inicializarGraficaVentas() {
    const ctx = document.getElementById('ventas-mes-chart');
    if (!ctx) return;

    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
    const datos = [8500, 9200, 7800, 11200, 12450, 10500];

    ventasChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Ventas ($)',
                data: datos,
                backgroundColor: 'rgba(0, 210, 255, 0.8)',
                borderColor: 'rgba(0, 210, 255, 1)',
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: 'rgba(0, 210, 255, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(20, 28, 47, 0.9)',
                    titleColor: '#F3F4F6',
                    bodyColor: '#F3F4F6',
                    borderColor: 'rgba(0, 210, 255, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toLocaleString('es-SV');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#9CA3AF',
                        callback: function(value) {
                            return '$' + value.toLocaleString('es-SV');
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#9CA3AF'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function inicializarGraficaEstados() {
    const ctx = document.getElementById('estados-ordenes-chart');
    if (!ctx) return;

    const labels = ['Entregado', 'En Proceso', 'Pendiente'];
    const datos = [45, 28, 23];
    const colores = [
        'rgba(34, 197, 94, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(239, 68, 68, 0.8)'
    ];
    const bordes = [
        'rgba(34, 197, 94, 1)',
        'rgba(234, 179, 8, 1)',
        'rgba(239, 68, 68, 1)'
    ];

    estadosChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: datos,
                backgroundColor: colores,
                borderColor: bordes,
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#F3F4F6',
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(20, 28, 47, 0.9)',
                    titleColor: '#F3F4F6',
                    bodyColor: '#F3F4F6',
                    borderColor: 'rgba(0, 210, 255, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: ${percentage}% (${context.parsed})`;
                        }
                    }
                }
            }
        }
    });
}

// ============================================
// PROTOTIPOS GLOBALES
// ============================================
window.verRig = verRig;
window.editarRig = editarRig;
window.verReparacion = verReparacion;
window.editarReparacion = editarReparacion;
window.verProyecto = verProyecto;
window.editarProyecto = editarProyecto;
window.verCliente = verCliente;
window.editarCliente = editarCliente;

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const user = auth.currentUser;
    if (user) {
        loginContainer.style.display = 'none';
        dashboard.style.display = 'flex';
        cargarDatosIniciales();
        inicializarGraficas();
    } else {
        loginContainer.style.display = 'flex';
        dashboard.style.display = 'none';
    }
});

console.log('RODIRAH RIGS | ADMIN CONSOLE - Inicializado correctamente');
