class PlayerManageContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="player-manage-content">
                <header class="page-header">
                    <div>
                        <h1>Players disponibles</h1>
                        <p>Gere les players et leurs classes associees.</p>
                    </div>
                    <button id="open-modal-btn" class="primary-btn" type="button">Ajouter</button>
                </header>

                <div class="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Classes associees</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody id="players-table-body">
                        <tr>
                            <td colspan="4" class="empty-row">Chargement...</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <p id="global-message" class="global-message"></p>
            </section>

            <div id="player-modal" class="modal-backdrop hidden" aria-hidden="true">
                <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                    <div class="modal-header">
                        <h2 id="modal-title">Ajouter un player</h2>
                        <button id="close-modal-btn" class="icon-btn" type="button" aria-label="Fermer">×</button>
                    </div>

                    <form id="player-create-form" novalidate>
                        <div class="field">
                            <label for="nom">Nom du player</label>
                            <input id="nom" name="nom" type="text" placeholder="Ex: Arthas" required maxlength="60">
                            <small class="error" data-error-for="nom"></small>
                        </div>

                        <div class="field">
                            <label>Classes a associer</label>
                            <div id="classes-choices" class="choices-box">
                                <p class="empty-choice">Chargement des classes...</p>
                            </div>
                            <small class="helper">Selection multiple autorisee.</small>
                        </div>

                        <div class="actions">
                            <button id="submit-player-btn" class="primary-btn" type="submit">Creer le player</button>
                        </div>
                    </form>
                </div>
            </div>
            <style>
                .player-manage-content {
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

                .classes-badges {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                }

                .class-badge {
                    background: #eff6ff;
                    color: #1d4ed8;
                    border: 1px solid #bfdbfe;
                    border-radius: 999px;
                    padding: 3px 9px;
                    font-size: 12px;
                    font-weight: 700;
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

                .edit-btn {
                    border: none;
                    background: #0ea5e9;
                    color: #ffffff;
                    padding: 8px 10px;
                    border-radius: 8px;
                    font-weight: 700;
                    cursor: pointer;
                    margin-right: 6px;
                }

                .edit-btn:hover {
                    background: #0284c7;
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
                    max-width: 560px;
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

                #player-create-form {
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

                .choices-box {
                    max-height: 180px;
                    overflow: auto;
                    border: 1px solid #cbd5e1;
                    border-radius: 10px;
                    background: #f8fafc;
                    padding: 10px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .choice-tag {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    user-select: none;
                }

                .choice-tag input {
                    position: absolute;
                    opacity: 0;
                    width: 0;
                    height: 0;
                    pointer-events: none;
                }

                .choice-tag-label {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 12px;
                    border-radius: 999px;
                    border: 1px solid #cbd5e1;
                    background: #ffffff;
                    color: #334155;
                    font-size: 13px;
                    font-weight: 600;
                    transition: all 120ms ease-in-out;
                }

                .choice-tag input:checked + .choice-tag-label {
                    background: #eff6ff;
                    border-color: #60a5fa;
                    color: #1d4ed8;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
                }

                .choice-tag:hover .choice-tag-label {
                    border-color: #93c5fd;
                }

                .empty-choice {
                    margin: 0;
                    color: #64748b;
                    font-size: 14px;
                }

                .helper {
                    color: #64748b;
                    font-size: 12px;
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

        const tableBody = this.querySelector("#players-table-body");
        const openModalBtn = this.querySelector("#open-modal-btn");
        const closeModalBtn = this.querySelector("#close-modal-btn");
        const modal = this.querySelector("#player-modal");
        const modalTitle = this.querySelector("#modal-title");
        const form = this.querySelector("#player-create-form");
        const submitPlayerBtn = this.querySelector("#submit-player-btn");
        const nomInput = this.querySelector("#nom");
        const classesChoices = this.querySelector("#classes-choices");
        const messageEl = this.querySelector("#global-message");

        let availableClasses = [];
        let playersCache = [];
        let editingPlayerId = null;

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

        const setModalMode = (isEditMode) => {
            if (isEditMode) {
                modalTitle.textContent = "Modifier un player";
                submitPlayerBtn.textContent = "Modifier le player";
            } else {
                modalTitle.textContent = "Ajouter un player";
                submitPlayerBtn.textContent = "Creer le player";
            }
        };

        const openModal = () => {
            setModalMode(false);
            editingPlayerId = null;
            modal.classList.remove("hidden");
            modal.setAttribute("aria-hidden", "false");
            nomInput.focus();
        };

        const openEditModal = (player) => {
            setModalMode(true);
            editingPlayerId = player.id;
            modal.classList.remove("hidden");
            modal.setAttribute("aria-hidden", "false");
            nomInput.value = player.nom ?? "";

            const selectedIds = new Set((player.classes ?? []).map((classe) => Number(classe.id)));
            form.querySelectorAll("input[name='classeIds']").forEach((input) => {
                input.checked = selectedIds.has(Number(input.value));
            });
            nomInput.focus();
        };

        const closeModal = () => {
            modal.classList.add("hidden");
            modal.setAttribute("aria-hidden", "true");
            editingPlayerId = null;
            setModalMode(false);
            form.reset();
            setFieldError(nomInput, "");
        };

        const renderClassChoices = () => {
            if (availableClasses.length === 0) {
                classesChoices.innerHTML = "<p class='empty-choice'>Aucune classe disponible.</p>";
                return;
            }

            classesChoices.innerHTML = availableClasses
                .map((classe) => `
                    <label class="choice-tag">
                        <input type="checkbox" name="classeIds" value="${classe.id}">
                        <span class="choice-tag-label">${classe.nom} (${classe.role})</span>
                    </label>
                `)
                .join("");
        };

        const renderRows = (players) => {
            playersCache = Array.isArray(players) ? players : [];
            if (!Array.isArray(players) || players.length === 0) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="4" class="empty-row">Aucun player disponible.</td>
                    </tr>
                `;
                return;
            }

            tableBody.innerHTML = players
                .map((player) => {
                    const classes = Array.isArray(player.classes) ? player.classes : [];
                    const classesHtml = classes.length === 0
                        ? "<span class='empty-choice'>Aucune</span>"
                        : `<div class="classes-badges">${classes.map((classe) =>
                            `<span class="class-badge">${classe.nom}</span>`).join("")}</div>`;
                    return `
                        <tr>
                            <td>${player.id ?? "-"}</td>
                            <td>${player.nom ?? "-"}</td>
                            <td>${classesHtml}</td>
                            <td>
                                <button class="edit-btn" data-id="${player.id}">Modifier</button>
                                <button class="delete-btn" data-id="${player.id}">
									<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
									  <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
									</svg>
								</button>
                            </td>
                        </tr>
                    `;
                })
                .join("");
        };

        const loadPlayers = async () => {
            try {
                const response = await fetch("/api/players");
                if (!response.ok) {
                    renderRows([]);
                    showMessage("Impossible de charger les players.", "error");
                    return;
                }
                const data = await response.json();
                renderRows(data);
            } catch (error) {
                renderRows([]);
                showMessage("Erreur reseau lors du chargement des players.", "error");
            }
        };

        const loadClasses = async () => {
            try {
                const response = await fetch("/api/classes");
                if (!response.ok) {
                    availableClasses = [];
                    renderClassChoices();
                    return;
                }
                availableClasses = await response.json();
                renderClassChoices();
            } catch (error) {
                availableClasses = [];
                renderClassChoices();
            }
        };

        const deletePlayer = async (id) => {
            try {
                const response = await fetch(`/api/players/${id}`, { method: "DELETE" });
                if (!response.ok) {
                    showMessage("Suppression impossible.", "error");
                    return;
                }
                showMessage("Player supprime.", "success");
                await loadPlayers();
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

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const isNomValid = validateField(nomInput);
            if (!isNomValid) {
                return;
            }

            const selectedClasseIds = Array.from(form.querySelectorAll("input[name='classeIds']:checked"))
                .map((input) => input.value);

            try {
                if (editingPlayerId !== null) {
                    const updateResponse = await fetch(`/api/players/${editingPlayerId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            nom: nomInput.value.trim(),
                            classeIds: selectedClasseIds
                        })
                    });

                    if (!updateResponse.ok) {
                        showMessage("Modification impossible. Verifie les informations.", "error");
                        return;
                    }

                    closeModal();
                    showMessage("Player modifie avec succes.", "success");
                    await loadPlayers();
                    return;
                }

                const createResponse = await fetch("/api/players", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nom: nomInput.value.trim() })
                });

                if (!createResponse.ok) {
                    showMessage("Creation impossible. Verifie les informations.", "error");
                    return;
                }

                const createdPlayer = await createResponse.json();
                if (selectedClasseIds.length > 0) {
                    await Promise.all(selectedClasseIds.map((classeId) =>
                        fetch(`/api/players/${createdPlayer.id}/classes/${classeId}`, { method: "POST" })
                    ));
                }

                closeModal();
                showMessage("Player cree avec succes.", "success");
                await loadPlayers();
            } catch (error) {
                showMessage("Erreur reseau pendant la creation.", "error");
            }
        });

        tableBody.addEventListener("click", async (event) => {
            if (event.target.matches(".edit-btn")) {
                const id = event.target.getAttribute("data-id");
                if (!id) {
                    return;
                }
                const player = playersCache.find((item) => String(item.id) === id);
                if (!player) {
                    showMessage("Player introuvable pour edition.", "error");
                    return;
                }
                openEditModal(player);
                return;
            }

            if (event.target.matches(".delete-btn")) {
                const id = event.target.getAttribute("data-id");
                if (!id) {
                    return;
                }
                await deletePlayer(id);
            }
        });

        loadClasses();
        loadPlayers();
    }
}

customElements.define("player-manage-content", PlayerManageContent);
