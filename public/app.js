// ============================================
// RODIRAH // RIGS - LÓGICA PÚBLICA
// Landing Page + Cotizador + Firebase
// ============================================

// ============================================
// CONFIGURACIÓN DE FIREBASE
// IMPORTANTE: Reemplaza con tus credenciales
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
const db = firebase.firestore();

// ============================================
// SISTEMA DE NAVEGACIÓN SIN HASH
// ============================================
const rutas = {
    '/inicio': 'inicio',
    '/servicios': 'servicios',
    '/contacto': 'contacto'
};

function manejarNavegacion() {
    const path = window.location.pathname;
    const seccionId = rutas[path] || 'inicio';
    
    // Scroll suave a la sección
    const seccion = document.getElementById(seccionId);
    if (seccion) {
        seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Actualizar menú activo
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });
}

// Escuchar cambios de URL
window.addEventListener('popstate', manejarNavegacion);

// Interceptar clicks en enlaces de navegación
document.addEventListener('DOMContentLoaded', () => {
    // Manejar navegación inicial
    manejarNavegacion();
    
    // Interceptar clicks en enlaces internos
    document.querySelectorAll('a[href^="/"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Solo interceptar rutas internas
            if (rutas[href]) {
                e.preventDefault();
                
                // Actualizar URL sin recargar
                window.history.pushState({}, '', href);
                
                // Manejar navegación
                manejarNavegacion();
                
                // Cerrar menú móvil si está abierto
                const menu = document.getElementById('menu-popup');
                const burger = document.getElementById('hamburger-menu');
                if (menu) menu.classList.remove('active');
                if (burger) burger.classList.remove('active');
            }
        });
    });
});

// ============================================
// GESTIÓN DE TEMA (OSCURO/CLARO)
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Cargar tema guardado
function cargarTema() {
    const temaGuardado = localStorage.getItem('theme');
    if (temaGuardado) {
        htmlElement.setAttribute('data-theme', temaGuardado);
    }
}

// Alternar tema
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const temaActual = htmlElement.getAttribute('data-theme');
        const nuevoTema = temaActual === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', nuevoTema);
        localStorage.setItem('theme', nuevoTema);
    });
}

// Cargar tema al iniciar
cargarTema();

// ============================================
// MENÚ HAMBURGUESA (MÓVIL)
// ============================================
const hamburgerMenu = document.getElementById('hamburger-menu');
const menuPopup = document.getElementById('menu-popup');

if (hamburgerMenu && menuPopup) {
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        menuPopup.classList.toggle('active');
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!hamburgerMenu.contains(e.target) && !menuPopup.contains(e.target)) {
            hamburgerMenu.classList.remove('active');
            menuPopup.classList.remove('active');
        }
    });
}

// ============================================
// FORMULARIO DE CONTACTO
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const datos = {
            nombre: document.getElementById('nombre').value,
            telefono: document.getElementById('telefono').value,
            email: document.getElementById('email').value,
            equipo: document.getElementById('equipo').value,
            problema: document.getElementById('problema').value,
            fecha: firebase.firestore.FieldValue.serverTimestamp(),
            estado: 'pendiente',
            categoria: 'general'
        };
        
        try {
            // Guardar en Firestore
            await db.collection('solicitudes').add(datos);
            
            // Mostrar mensaje de éxito
            alert('✅ Solicitud enviada exitosamente. Te contactaremos pronto.');
            
            // Limpiar formulario
            contactForm.reset();
            
        } catch (error) {
            console.error('Error al enviar solicitud:', error);
            alert('❌ Error al enviar la solicitud. Por favor, intenta de nuevo.');
        }
    });
}

// ============================================
// COTIZADOR FLOTANTE
// ============================================

function abrirCalculadoraDesdeMenu() {
    const panel = document.getElementById("calculadora-panel");
    panel.style.display = "block";
    const menu = document.getElementById("menu-popup");
    const burger = document.querySelector(".hamburger-menu");
    if(menu) menu.style.display = "none";
    if(burger) burger.classList.remove("active");
    actualizarFormularioCalculadora();
    ajustarPanelCalculadoraAlViewport();
}

function cerrarCalculadora() {
    const panel = document.getElementById("calculadora-panel");
    panel.style.display = "none";
}

function redondearResultado(valor) {
    return Number(valor.toFixed(4));
}

let calculadoraUltimoResultado = null;

function mostrarResultadoCalculadora(valor, descripcion) {
    calculadoraUltimoResultado = Number(valor);
    const resultado = document.getElementById("calc-result");
    resultado.value = `${descripcion}: ${redondearResultado(Number(valor)).toLocaleString("es-SV", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
    })}`;
}

function obtenerValorCalculadora(indice) {
    return parseFloat(document.getElementById(`calc-input-${indice}`).value) || 0;
}

const calculadoraOperaciones = {
    suma: { campos: [{label: "Valor 1", placeholder: "0"}, {label: "Valor 2", placeholder: "0"}] },
    resta: { campos: [{label: "Valor 1", placeholder: "0"}, {label: "Valor 2", placeholder: "0"}] },
    multiplicacion: { campos: [{label: "Valor 1", placeholder: "0"}, {label: "Valor 2", placeholder: "0"}] },
    division: { campos: [{label: "Dividendo", placeholder: "0"}, {label: "Divisor", placeholder: "0"}] },
    porcentaje_de: { campos: [{label: "Cantidad", placeholder: "0"}, {label: "Porcentaje (%)", placeholder: "0"}] },
    sumar_porcentaje: { campos: [{label: "Cantidad", placeholder: "0"}, {label: "Porcentaje (%)", placeholder: "0"}] },
    restar_porcentaje: { campos: [{label: "Cantidad", placeholder: "0"}, {label: "Porcentaje (%)", placeholder: "0"}] },
    total_con_iva: { campos: [{label: "Subtotal", placeholder: "0"}, {label: "IVA (%)", placeholder: "13", defaultValue: "13"}] },
    total_cotizacion: { campos: [{label: "Costo Unitario", placeholder: "0"}, {label: "Margen (%)", placeholder: "0"}, {label: "Cantidad", placeholder: "1", defaultValue: "1"}, {label: "IVA (%)", placeholder: "13", defaultValue: "13"}] }
};

function actualizarFormularioCalculadora() {
    const operacion = document.getElementById("calc-op")?.value || "suma";
    const config = calculadoraOperaciones[operacion] || calculadoraOperaciones.suma;

    for (let i = 1; i <= 4; i++) {
        const field = document.getElementById(`calc-field-${i}`);
        const label = document.getElementById(`calc-label-${i}`);
        const input = document.getElementById(`calc-input-${i}`);
        const campo = config.campos[i - 1];

        if (!field || !label || !input) continue;

        if (campo) {
            field.style.display = "flex";
            label.textContent = campo.label;
            input.placeholder = campo.placeholder;
            input.value = campo.defaultValue || "";
        } else {
            field.style.display = "none";
            input.value = "";
        }
    }

    document.getElementById("calc-result").value = "";
    calculadoraUltimoResultado = null;
}

function calcularCalculadoraSimple() {
    const operacion = document.getElementById("calc-op")?.value || "suma";
    const a = obtenerValorCalculadora(1);
    const b = obtenerValorCalculadora(2);
    const c = obtenerValorCalculadora(3);
    const d = obtenerValorCalculadora(4);

    let resultado = 0;
    let texto = "Resultado";

    if (operacion === "suma") {
        resultado = a + b;
        texto = "Suma";
    } else if (operacion === "resta") {
        resultado = a - b;
        texto = "Resta";
    } else if (operacion === "multiplicacion") {
        resultado = a * b;
        texto = "Multiplicación";
    } else if (operacion === "division") {
        if (b === 0) {
            mostrarResultadoCalculadora(0, "No se puede dividir entre 0");
            return;
        }
        resultado = a / b;
        texto = "División";
    } else if (operacion === "porcentaje_de") {
        resultado = a * (b / 100);
        texto = `${b}% de ${a}`;
    } else if (operacion === "sumar_porcentaje") {
        resultado = a + a * (b / 100);
        texto = `${a} + ${b}%`;
    } else if (operacion === "restar_porcentaje") {
        resultado = a - a * (b / 100);
        texto = `${a} - ${b}%`;
    } else if (operacion === "total_con_iva") {
        resultado = a * (1 + b / 100);
        texto = "Subtotal con IVA";
    } else if (operacion === "total_cotizacion") {
        const margenDecimal = b / 100;
        const cantidad = Math.max(1, Math.round(c || 1));
        const ivaPorcentaje = d || 13;

        if (a <= 0 || margenDecimal < 0 || margenDecimal >= 1) {
            mostrarResultadoCalculadora(0, "Verifica costo y margen (0% a 99.99%)");
            return;
        }

        const precioUnitario = a / (1 - margenDecimal);
        const subtotal = precioUnitario * cantidad;
        resultado = subtotal * (1 + ivaPorcentaje / 100);
        texto = `Total cotización (${cantidad} und)`;
    }

    mostrarResultadoCalculadora(resultado, texto);
}

function limpiarCalculadora() {
    const selectorOperacion = document.getElementById("calc-op");
    if (selectorOperacion) selectorOperacion.value = "suma";

    for (let i = 1; i <= 4; i++) {
        const input = document.getElementById(`calc-input-${i}`);
        if (input) input.value = "";
    }

    document.getElementById("calc-result").value = "";
    calculadoraUltimoResultado = null;
    actualizarFormularioCalculadora();
}

let calculadoraDragActiva = false;
let calculadoraDragOffsetX = 0;
let calculadoraDragOffsetY = 0;

function ajustarPanelCalculadoraAlViewport() {
    const panel = document.getElementById("calculadora-panel");
    if (!panel || panel.style.display === "none") return;

    const margen = 8;
    const maxX = Math.max(margen, window.innerWidth - panel.offsetWidth - margen);
    const maxY = Math.max(margen, window.innerHeight - panel.offsetHeight - margen);

    const left = parseFloat(panel.style.left || "80");
    const top = parseFloat(panel.style.top || "110");

    panel.style.left = `${Math.min(Math.max(left, margen), maxX)}px`;
    panel.style.top = `${Math.min(Math.max(top, margen), maxY)}px`;
}

function iniciarDragCalculadora(event) {
    const panel = document.getElementById("calculadora-panel");
    if (!panel || panel.style.display === "none") return;
    if (event.target.closest("button") || event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') return;

    calculadoraDragActiva = true;
    const rect = panel.getBoundingClientRect();
    calculadoraDragOffsetX = event.clientX - rect.left;
    calculadoraDragOffsetY = event.clientY - rect.top;
    panel.classList.add("dragging");
    event.preventDefault();
}

function moverCalculadora(event) {
    if (!calculadoraDragActiva) return;

    const panel = document.getElementById("calculadora-panel");
    const margen = 8;
    const maxX = Math.max(margen, window.innerWidth - panel.offsetWidth - margen);
    const maxY = Math.max(margen, window.innerHeight - panel.offsetHeight - margen);

    let nuevoLeft = event.clientX - calculadoraDragOffsetX;
    let nuevoTop = event.clientY - calculadoraDragOffsetY;

    nuevoLeft = Math.min(Math.max(nuevoLeft, margen), maxX);
    nuevoTop = Math.min(Math.max(nuevoTop, margen), maxY);

    panel.style.left = `${nuevoLeft}px`;
    panel.style.top = `${nuevoTop}px`;
}

function terminarDragCalculadora() {
    if (!calculadoraDragActiva) return;
    const panel = document.getElementById("calculadora-panel");
    panel.classList.remove("dragging");
    calculadoraDragActiva = false;
}

function inicializarDragCalculadora() {
    const handle = document.querySelector(".calc-drag-handle");
    if (!handle) return;

    handle.addEventListener("mousedown", iniciarDragCalculadora);
    document.addEventListener("mousemove", moverCalculadora);
    document.addEventListener("mouseup", terminarDragCalculadora);
    window.addEventListener("resize", ajustarPanelCalculadoraAlViewport);
}

// Event Listeners básicos al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    inicializarDragCalculadora();
    const selectOp = document.getElementById("calc-op");
    if(selectOp) selectOp.addEventListener("change", actualizarFormularioCalculadora);
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .stat-card, .info-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================================
// INICIALIZACIÓN
// ============================================
console.log('RODIRAH // RIGS - Landing Page Inicializada');