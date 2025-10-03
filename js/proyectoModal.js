const ProyectoModal = {
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
        });
    },

    setupEventListeners() {
        document.querySelectorAll('button[title="Ver Detalles del Proyecto"]').forEach(button => {
            button.addEventListener('click', () => this.abrirModal(button));
        });
    },

    obtenerDatosProyecto(fila) {
        const participantes = Array.from(fila.querySelectorAll('td:nth-child(2) span'))
            .map(span => span.textContent.trim())
            .filter(texto => !texto.includes('estudiantes'));
        const fechas = fila.querySelectorAll('td:nth-child(5) p');

        return {
            titulo: fila.querySelector('.font-semibold').textContent.trim(),
            descripcion: fila.querySelector('.line-clamp-2').textContent.trim(),
            estado: fila.querySelector('.rounded-full').textContent.trim(),
            area: fila.querySelector('td:nth-child(3)').textContent.trim(),
            fechaInicio: fechas[0]?.textContent.replace('Inicio:', '').trim() || '',
            fechaFin: fechas[1]?.textContent.replace('Fin:', '').trim() || '',
            participantes,
            lider: participantes[0] || '',
            inversion: (Math.random() * 50000 + 10000).toFixed(2),
            ultimaActualizacion: new Date().toLocaleString()
        };
    },

    crearModal(proyecto) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 p-4 overflow-y-auto';
        
        const estadoColor = proyecto.estado.toLowerCase().includes('curso') ? 'blue' :
                          proyecto.estado.toLowerCase().includes('finalizado') ? 'green' : 'gray';

        modal.innerHTML = `
            <div class="min-h-full flex items-center justify-center p-4">
                <div class="bg-[var(--card-light)] rounded-2xl shadow-2xl w-full max-w-3xl transform transition-all duration-300 scale-100 opacity-100 overflow-hidden my-8">
                    <!-- Encabezado -->
                    <div class="relative bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/80 p-8">
                        <h2 class="text-3xl font-bold text-white mb-2">${proyecto.titulo}</h2>
                        <button class="absolute top-4 right-4 text-white/90 hover:text-white transition-colors cerrar-modal">
                            <span class="material-symbols-outlined text-3xl">close</span>
                        </button>
                    </div>

                    <div class="p-8 space-y-8">
                        <!-- Descripción -->
                        <div class="bg-[var(--primary)]/5 rounded-xl p-6 transition-transform hover:scale-[1.02]">
                            <div class="flex items-center gap-3 mb-3">
                                <span class="material-symbols-outlined text-[var(--primary)] text-2xl">description</span>
                                <h3 class="text-lg font-semibold text-[var(--text-light)]">Descripción del Proyecto</h3>
                            </div>
                            <p class="text-[var(--text-light)] text-xl leading-relaxed">${proyecto.descripcion}</p>
                        </div>

                        <!-- Estado y Área -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="bg-[var(--primary)]/5 rounded-xl p-6 transition-transform hover:scale-[1.02]">
                                <div class="flex items-center gap-3 mb-3">
                                    <span class="material-symbols-outlined text-[var(--primary)] text-2xl">radio_button_checked</span>
                                    <h3 class="text-lg font-semibold text-[var(--text-light)]">Estado</h3>
                                </div>
                                <span class="inline-flex items-center px-4 py-2 rounded-full text-base font-medium bg-${estadoColor}-100 text-${estadoColor}-800 dark:bg-${estadoColor}-900 dark:text-${estadoColor}-200 shadow-sm">
                                    <span class="w-2 h-2 mr-2 bg-${estadoColor}-500 rounded-full"></span>
                                    ${proyecto.estado}
                                </span>
                            </div>
                            <div class="bg-[var(--primary)]/5 rounded-xl p-6 transition-transform hover:scale-[1.02]">
                                <div class="flex items-center gap-3 mb-3">
                                    <span class="material-symbols-outlined text-[var(--primary)] text-2xl">category</span>
                                    <h3 class="text-lg font-semibold text-[var(--text-light)]">Área</h3>
                                </div>
                                <p class="text-[var(--text-light)] text-xl">${proyecto.area}</p>
                            </div>
                        </div>

                        <!-- Inversión y Última Actualización -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="bg-[var(--primary)]/5 rounded-xl p-6 transition-transform hover:scale-[1.02]">
                                <div class="flex items-center gap-3 mb-3">
                                    <span class="material-symbols-outlined text-[var(--primary)] text-2xl">payments</span>
                                    <h3 class="text-lg font-semibold text-[var(--text-light)]">Inversión</h3>
                                </div>
                                <p class="text-2xl font-bold text-[var(--text-light)]">$${proyecto.inversion}</p>
                            </div>
                            <div class="bg-[var(--primary)]/5 rounded-xl p-6 transition-transform hover:scale-[1.02]">
                                <div class="flex items-center gap-3 mb-3">
                                    <span class="material-symbols-outlined text-[var(--primary)] text-2xl">update</span>
                                    <h3 class="text-lg font-semibold text-[var(--text-light)]">Última Actualización</h3>
                                </div>
                                <p class="text-[var(--text-secondary-light)]">${proyecto.ultimaActualizacion}</p>
                            </div>
                        </div>

                        <!-- Fechas -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="bg-[var(--primary)]/5 rounded-xl p-6 transition-transform hover:scale-[1.02]">
                                <div class="flex items-center gap-3 mb-3">
                                    <span class="material-symbols-outlined text-[var(--primary)] text-2xl">calendar_today</span>
                                    <h3 class="text-lg font-semibold text-[var(--text-light)]">Fecha de Inicio</h3>
                                </div>
                                <p class="text-[var(--text-light)] text-lg">${proyecto.fechaInicio}</p>
                            </div>
                            <div class="bg-[var(--primary)]/5 rounded-xl p-6 transition-transform hover:scale-[1.02]">
                                <div class="flex items-center gap-3 mb-3">
                                    <span class="material-symbols-outlined text-[var(--primary)] text-2xl">event_available</span>
                                    <h3 class="text-lg font-semibold text-[var(--text-light)]">Fecha de Finalización</h3>
                                </div>
                                <p class="text-[var(--text-light)] text-lg">${proyecto.fechaFin}</p>
                            </div>
                        </div>

                        <!-- Participantes -->
                        <div class="bg-[var(--primary)]/5 rounded-xl p-6">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="material-symbols-outlined text-[var(--primary)] text-2xl">group</span>
                                <h3 class="text-lg font-semibold text-[var(--text-light)]">Participantes</h3>
                            </div>
                            <div class="space-y-4">
                                <!-- Líder del proyecto -->
                                <div class="flex items-center gap-4 p-4 rounded-lg bg-[var(--primary)]/10 transition-transform hover:scale-[1.02]">
                                    <div class="w-12 h-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                                        <span class="material-symbols-outlined text-[var(--primary)] text-3xl">person_pin</span>
                                    </div>
                                    <div>
                                        <span class="inline-block px-2 py-1 text-xs bg-[var(--primary)]/20 text-[var(--primary)] rounded-full mb-1">Líder del Proyecto</span>
                                        <p class="text-[var(--text-light)] font-medium text-lg">${proyecto.lider}</p>
                                    </div>
                                </div>
                                <!-- Resto de participantes -->
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    ${proyecto.participantes.slice(1).map(participante => `
                                        <div class="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 transition-transform hover:scale-[1.02]">
                                            <div class="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                                                <span class="material-symbols-outlined text-[var(--primary)] text-2xl">person</span>
                                            </div>
                                            <span class="text-[var(--text-light)] font-medium">${participante}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Pie del modal -->
                    <div class="flex items-center justify-end gap-4 p-6 border-t border-[var(--border-light)]">
                        <button class="px-6 py-3 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-colors font-medium cerrar-modal">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;

        return modal;
    },

    abrirModal(button) {
        const proyecto = this.obtenerDatosProyecto(button.closest('tr'));
        const modal = this.crearModal(proyecto);
        document.body.appendChild(modal);

        // Setup event listeners for closing
        const cerrarModal = () => modal.remove();
        modal.querySelectorAll('.cerrar-modal').forEach(btn => {
            btn.addEventListener('click', cerrarModal);
        });
        modal.addEventListener('click', e => {
            if (e.target === modal) cerrarModal();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') cerrarModal();
        }, { once: true });
    }
};

// Initialize the modal system
ProyectoModal.init();