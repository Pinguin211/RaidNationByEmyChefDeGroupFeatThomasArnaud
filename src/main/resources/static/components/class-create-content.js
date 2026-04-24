class ClassCreateContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="class-create-content">
                <header class="page-header">
                    <div>
                        <h1>Classes disponibles</h1>
                        <p>Gere la liste des classes de l'application.</p>
                    </div>
                    <button id="open-modal-btn" class="primary-btn" type="button">Ajouter</button>
                </header>

                <div class="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Role</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody id="classes-table-body">
                        <tr>
                            <td colspan="4" class="empty-row">Chargement...</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <p id="global-message" class="global-message"></p>
            </section>

            <div id="class-modal" class="modal-backdrop hidden" aria-hidden="true">
                <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                    <div class="modal-header">
                        <h2 id="modal-title">Ajouter une classe</h2>
                        <button id="close-modal-btn" class="icon-btn" type="button" aria-label="Fermer">×</button>
                    </div>

                    <form id="class-create-form" novalidate>
                        <div class="field">
                            <label for="nom">Nom de la classe</label>
                            <input id="nom" name="nom" type="text" placeholder="Ex: Guerrier" required maxlength="60">
                            <small class="error" data-error-for="nom"></small>
                        </div>

                        <div class="field">
                            <label for="role">Role de la classe</label>
                            <input id="role" name="role" type="text" placeholder="Ex: Tank" required maxlength="40">
                            <small class="error" data-error-for="role"></small>
                        </div>

                        <div class="actions">
                            <button class="primary-btn" type="submit">Creer la classe</button>
                        </div>
                    </form>
                </div>
            </div>
            <style>
                .class-create-content {
                    max-width: 980px;
                    width: 100%;
                    background: #ffffff;
                    border: 1px solid #dbe4ef;
                    border-radius: 16px;
                    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
                    padding: 28px;
                }

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 18px;
                }

                .page-header h1 {
                    margin: 0 0 6px 0;
                    font-size: 30px;
                    color: #0f172a;
                }

                .page-header p {
                    margin: 0;
                    color: #475569;
                }

                .primary-btn {
                    border: none;
                    background: #2563eb;
                    color: #ffffff;
                    padding: 11px 16px;
                    border-radius: 10px;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 8px 16px rgba(37, 99, 235, 0.25);
                }

                .primary-btn:hover {
                    background: #1d4ed8;
                }

                .table-wrapper {
                    border: 1px solid #dbe4ef;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #ffffff;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                thead {
                    background: #f8fafc;
                }

                th, td {
                    padding: 13px 14px;
                    text-align: left;
                    border-bottom: 1px solid #e2e8f0;
                }

                th {
                    color: #334155;
                    font-weight: 700;
                    font-size: 14px;
                }

                tbody tr:last-child td {
                    border-bottom: none;
                }

                .empty-row {
                    text-align: center;
                    color: #64748b;
                }

                .delete-btn {
                    border: none;
                    background: #dc2626;
                    color: #ffffff;
                    padding: 8px 10px;
                    border-radius: 8px;
                    font-weight: 700;
                    cursor: pointer;
                }

                .delete-btn:hover {
                    background: #b91c1c;
                }

                .global-message {
                    min-height: 20px;
                    margin-top: 12px;
                    font-weight: 600;
                }

                .global-message.success {
                    color: #166534;
                }

                .global-message.error {
                    color: #b91c1c;
                }

                .modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.52);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    z-index: 20;
                }

                .modal-backdrop.hidden {
                    display: none;
                }

                .modal-card {
                    width: 100%;
                    max-width: 520px;
                    background: #ffffff;
                    border-radius: 14px;
                    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.28);
                    border: 1px solid #dbe4ef;
                    padding: 20px;
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                }

                .modal-header h2 {
                    margin: 0;
                    font-size: 24px;
                }

                .icon-btn {
                    border: none;
                    background: #e2e8f0;
                    color: #334155;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 22px;
                    line-height: 1;
                }

                .icon-btn:hover {
                    background: #cbd5e1;
                }

                #class-create-form {
                    display: grid;
                    gap: 14px;
                }

                .field {
                    display: grid;
                    gap: 6px;
                }

                label {
                    font-weight: 700;
                    color: #1e293b;
                }

                input {
                    width: 100%;
                    padding: 12px 14px;
                    border-radius: 10px;
                    border: 1px solid #cbd5e1;
                    background: #f8fafc;
                    outline: none;
                    transition: border-color 120ms ease-in-out, box-shadow 120ms ease-in-out;
                }

                input:focus {
                    border-color: #2563eb;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
                }

                input.invalid {
                    border-color: #dc2626;
                    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
                }

                .error {
                    color: #b91c1c;
                    min-height: 16px;
                    font-size: 13px;
                }

                .actions {
                    display: flex;
                    justify-content: flex-end;
                }
            </style>
        `;

        const tableBody = this.querySelector("#classes-table-body");
        const openModalBtn = this.querySelector("#open-modal-btn");
        const closeModalBtn = this.querySelector("#close-modal-btn");
        const modal = this.querySelector("#class-modal");
        const form = this.querySelector("#class-create-form");
        const nomInput = this.querySelector("#nom");
        const roleInput = this.querySelector("#role");
        const messageEl = this.querySelector("#global-message");

        const setFieldError = (field, message) => {
            const errorEl = this.querySelector(`[data-error-for="${field.name}"]`);
            if (errorEl) {
                errorEl.textContent = message;
            }
            field.classList.toggle("invalid", Boolean(message));
        };

        const showMessage = (message, type = "") => {
            messageEl.textContent = message;
            messageEl.className = "global-message";
            if (type) {
                messageEl.classList.add(type);
            }
        };

        const validateField = (field) => {
            const value = field.value.trim();
            if (value.length < 2) {
                setFieldError(field, "Minimum 2 caracteres.");
                return false;
            }
            setFieldError(field, "");
            return true;
        };

        const openModal = () => {
            modal.classList.remove("hidden");
            modal.setAttribute("aria-hidden", "false");
            nomInput.focus();
        };

        const closeModal = () => {
            modal.classList.add("hidden");
            modal.setAttribute("aria-hidden", "true");
            form.reset();
            setFieldError(nomInput, "");
            setFieldError(roleInput, "");
        };

        const renderRows = (classes) => {
            if (!Array.isArray(classes) || classes.length === 0) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="4" class="empty-row">Aucune classe disponible.</td>
                    </tr>
                `;
                return;
            }

            tableBody.innerHTML = classes
                .map((classe) => `
                    <tr>
                        <td>${classe.id ?? "-"}</td>
                        <td>${classe.nom ?? "-"}</td>
                        <td>${classe.role ?? "-"}</td>
                        <td>
                            <button class="delete-btn" data-id="${classe.id}">
								<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
								  <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
								</svg>
							</button>
                        </td>
                    </tr>
                `)
                .join("");
        };

        const loadClasses = async () => {
            try {
                const response = await fetch("/api/classes");
                if (!response.ok) {
                    renderRows([]);
                    showMessage("Impossible de charger les classes.", "error");
                    return;
                }
                const data = await response.json();
                renderRows(data);
            } catch (error) {
                renderRows([]);
                showMessage("Erreur reseau lors du chargement des classes.", "error");
            }
        };

        const deleteClasse = async (id) => {
            try {
                const response = await fetch(`/api/classes/${id}`, { method: "DELETE" });
                if (!response.ok) {
                    showMessage("Suppression impossible.", "error");
                    return;
                }
                showMessage("Classe supprimee.", "success");
                await loadClasses();
            } catch (error) {
                showMessage("Erreur reseau pendant la suppression.", "error");
            }
        };

        openModalBtn.addEventListener("click", openModal);
        closeModalBtn.addEventListener("click", closeModal);
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        nomInput.addEventListener("input", () => validateField(nomInput));
        roleInput.addEventListener("input", () => validateField(roleInput));

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const isNomValid = validateField(nomInput);
            const isRoleValid = validateField(roleInput);
            if (!isNomValid || !isRoleValid) {
                return;
            }

            const payload = {
                nom: nomInput.value.trim(),
                role: roleInput.value.trim()
            };

            try {
                const response = await fetch("/api/classes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    showMessage("Creation impossible. Verifie les informations.", "error");
                    return;
                }

                closeModal();
                showMessage("Classe creee avec succes.", "success");
                await loadClasses();
            } catch (error) {
                showMessage("Erreur reseau pendant la creation.", "error");
            }
        });

        tableBody.addEventListener("click", async (event) => {
            if (!event.target.matches(".delete-btn")) {
                return;
            }
            const id = event.target.getAttribute("data-id");
            if (!id) {
                return;
            }
            await deleteClasse(id);
        });

        loadClasses();
    }
}

customElements.define("class-create-content", ClassCreateContent);
