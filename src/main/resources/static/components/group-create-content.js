class GroupCreateContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="class-create-content">
                <header class="page-header">
                    <div>
                        <h1>Groupes disponibles</h1>
                        <p>Gère la liste des groupes, leurs joueurs et leurs activités.</p>
                    </div>
                    <button id="open-modal-btn" class="primary-btn" type="button">Ajouter un groupe</button>
                </header>

                <div class="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Membres & Activités</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody id="groupes-table-body">
                        <tr>
                            <td colspan="4" class="empty-row">Chargement...</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <p id="global-message" class="global-message"></p>
            </section>

            <div id="groupe-modal" class="modal-backdrop hidden" aria-hidden="true">
                <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                    <div class="modal-header">
                        <h2 id="modal-title">Ajouter un groupe</h2>
                        <button id="close-modal-btn" class="icon-btn" type="button" aria-label="Fermer">×</button>
                    </div>
                    <form id="groupe-create-form" novalidate>
                        <div class="field">
                            <label for="nom">Nom du groupe</label>
                            <input id="nom" name="nom" type="text" placeholder="Ex: Les tryharders" required maxlength="60">
                            <small class="error" data-error-for="nom"></small>
                        </div>
                        <div class="actions">
                            <button class="primary-btn" type="submit">Créer le groupe</button>
                        </div>
                    </form>
                </div>
            </div>

            <div id="assign-modal" class="modal-backdrop hidden" aria-hidden="true">
                <div class="modal-card" role="dialog" aria-modal="true">
                    <div class="modal-header">
                        <h2 id="assign-modal-title">Gérer les joueurs</h2>
                        <button id="close-assign-modal-btn" class="icon-btn" type="button" aria-label="Fermer">×</button>
                    </div>
                    <div class="assign-list-container">
                        <div id="players-list" class="players-list">
                            <p class="empty-row">Chargement des joueurs...</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="activite-modal" class="modal-backdrop hidden" aria-hidden="true">
                <div class="modal-card" role="dialog" aria-modal="true">
                    <div class="modal-header">
                        <h2 id="activite-modal-title">Inscrire à une activité</h2>
                        <button id="close-activite-modal-btn" class="icon-btn" type="button" aria-label="Fermer">×</button>
                    </div>
                    <div class="assign-list-container">
                        <div id="activites-list" class="players-list">
                            <p class="empty-row">Chargement des activités...</p>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                /* --- CSS de base --- */
                .class-create-content { max-width: 980px; width: 100%; background: #ffffff; border: 1px solid #dbe4ef; border-radius: 16px; box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08); padding: 28px; }
                .page-header { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 18px; }
                .page-header h1 { margin: 0 0 6px 0; font-size: 30px; color: #0f172a; }
                .page-header p { margin: 0; color: #475569; }
                .primary-btn { border: none; background: #2563eb; color: #ffffff; padding: 11px 16px; border-radius: 10px; font-weight: 700; cursor: pointer; box-shadow: 0 8px 16px rgba(37, 99, 235, 0.25); }
                .primary-btn:hover { background: #1d4ed8; }
                .table-wrapper { border: 1px solid #dbe4ef; border-radius: 12px; overflow: hidden; background: #ffffff; }
                table { width: 100%; border-collapse: collapse; }
                thead { background: #f8fafc; }
                th, td { padding: 13px 14px; text-align: left; border-bottom: 1px solid #e2e8f0; }
                th { color: #334155; font-weight: 700; font-size: 14px; }
                tbody tr:last-child td { border-bottom: none; }
                .empty-row { text-align: center; color: #64748b; }
                
                /* --- Boutons et Badges --- */
                .delete-btn { border: none; background: #dc2626; color: #ffffff; padding: 8px 10px; border-radius: 8px; font-weight: 700; cursor: pointer; }
                .delete-btn:hover { background: #b91c1c; }
                .assign-btn { border: none; background: #0ea5e9; color: #ffffff; padding: 8px 10px; border-radius: 8px; font-weight: 700; cursor: pointer; margin-right: 6px; }
                .assign-btn:hover { background: #0284c7; }
                .activite-btn { border: none; background: #8b5cf6; color: #ffffff; padding: 8px 10px; border-radius: 8px; font-weight: 700; cursor: pointer; margin-right: 6px; }
                .activite-btn:hover { background: #7c3aed; }
                .badge { background: #f1f5f9; color: #475569; padding: 4px 8px; border-radius: 6px; font-size: 13px; font-weight: 600; display: inline-block; margin-bottom: 4px;}
                .badge-act { background: #e0e7ff; color: #3730a3; padding: 4px 8px; border-radius: 6px; font-size: 13px; font-weight: 600; display: inline-block; }
                
                /* --- CSS Modales --- */
                .global-message { min-height: 20px; margin-top: 12px; font-weight: 600; }
                .global-message.success { color: #166534; }
                .global-message.error { color: #b91c1c; }
                .modal-backdrop { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.52); display: flex; justify-content: center; align-items: center; padding: 20px; z-index: 20; }
                .modal-backdrop.hidden { display: none; }
                .modal-card { width: 100%; max-width: 520px; background: #ffffff; border-radius: 14px; box-shadow: 0 18px 40px rgba(15, 23, 42, 0.28); border: 1px solid #dbe4ef; padding: 20px; }
                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
                .modal-header h2 { margin: 0; font-size: 24px; }
                .icon-btn { border: none; background: #e2e8f0; color: #334155; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 22px; line-height: 1; }
                .icon-btn:hover { background: #cbd5e1; }
                #groupe-create-form { display: grid; gap: 14px; }
                .field { display: grid; gap: 6px; }
                label { font-weight: 700; color: #1e293b; }
                input { width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid #cbd5e1; background: #f8fafc; outline: none; transition: border-color 120ms ease-in-out, box-shadow 120ms ease-in-out; }
                input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15); }
                input.invalid { border-color: #dc2626; box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12); }
                .error { color: #b91c1c; min-height: 16px; font-size: 13px; }
                .actions { display: flex; justify-content: flex-end; }
                
                /* --- CSS Listes (Joueurs & Activités) --- */
                .assign-list-container { max-height: 350px; overflow-y: auto; padding-right: 8px; margin-top: 15px; }
                .players-list { display: flex; flex-direction: column; gap: 10px; }
                .player-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; border: 1px solid #e2e8f0; border-radius: 10px; background: #f8fafc; }
                .player-name { font-weight: 600; color: #0f172a; }
                .act-info { display: flex; flex-direction: column; }
                .act-type { font-size: 12px; color: #64748b; }
                .btn-add { background: #16a34a; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; }
                .btn-add:hover { background: #15803d; }
                .btn-remove { background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; }
                .btn-remove:hover { background: #dc2626; }
            </style>
        `;

        // --- Récupération des éléments du DOM ---
        const tableBody = this.querySelector("#groupes-table-body");
        const openModalBtn = this.querySelector("#open-modal-btn");
        const closeModalBtn = this.querySelector("#close-modal-btn");
        const modal = this.querySelector("#groupe-modal");
        const form = this.querySelector("#groupe-create-form");
        const nomInput = this.querySelector("#nom");
        const messageEl = this.querySelector("#global-message");

        const assignModal = this.querySelector("#assign-modal");
        const closeAssignModalBtn = this.querySelector("#close-assign-modal-btn");
        const playersListEl = this.querySelector("#players-list");
        const assignModalTitle = this.querySelector("#assign-modal-title");

        const activiteModal = this.querySelector("#activite-modal");
        const closeActiviteModalBtn = this.querySelector("#close-activite-modal-btn");
        const activitesListEl = this.querySelector("#activites-list");
        const activiteModalTitle = this.querySelector("#activite-modal-title");

        // Données en mémoire
        let currentGroupes = [];
        let selectedGroupId = null;

        // --- Utilitaires ---
        const setFieldError = (field, message) => {
            const errorEl = this.querySelector(`[data-error-for="${field.name}"]`);
            if (errorEl) errorEl.textContent = message;
            field.classList.toggle("invalid", Boolean(message));
        };

        const showMessage = (message, type = "") => {
            messageEl.textContent = message;
            messageEl.className = "global-message";
            if (type) messageEl.classList.add(type);
            setTimeout(() => messageEl.textContent = "", 4000); 
        };

        const validateField = (field) => {
            if (field.value.trim().length < 2) {
                setFieldError(field, "Minimum 2 caractères.");
                return false;
            }
            setFieldError(field, "");
            return true;
        };

        // --- Modale 1 : Création ---
        const openModal = () => {
            modal.classList.remove("hidden");
            nomInput.focus();
        };

        const closeModal = () => {
            modal.classList.add("hidden");
            form.reset();
            setFieldError(nomInput, "");
        };

        // --- Modale 2 : Joueurs ---
        const openAssignModal = async (groupId) => {
            selectedGroupId = groupId;
            const group = currentGroupes.find(g => g.id == groupId);
            assignModalTitle.textContent = `Joueurs : ${group.nom}`;
            assignModal.classList.remove("hidden");
            await renderPlayersList();
        };

        const closeAssignModal = () => {
            assignModal.classList.add("hidden");
            selectedGroupId = null;
        };

        const renderPlayersList = async () => {
            try {
                const response = await fetch("/api/players");
                const allPlayers = await response.json();
                const group = currentGroupes.find(g => g.id == selectedGroupId);
                const playersInGroupIds = group.players ? group.players.map(p => p.id) : [];

                if (allPlayers.length === 0) {
                    playersListEl.innerHTML = `<p class="empty-row">Aucun joueur dans la base de données.</p>`;
                    return;
                }

                playersListEl.innerHTML = allPlayers.map(player => {
                    const isInGroup = playersInGroupIds.includes(player.id);
                    return `
                        <div class="player-item">
                            <span class="player-name">${player.nom}</span>
                            ${isInGroup 
                                ? `<button class="btn-remove" data-action="remove-player" data-pid="${player.id}">Retirer</button>`
                                : `<button class="btn-add" data-action="add-player" data-pid="${player.id}">Ajouter</button>`
                            }
                        </div>
                    `;
                }).join("");

            } catch (error) {
                playersListEl.innerHTML = `<p class="error">Erreur lors du chargement des joueurs.</p>`;
            }
        };

        playersListEl.addEventListener("click", async (e) => {
            const action = e.target.getAttribute("data-action");
            const playerId = e.target.getAttribute("data-pid");
            if (!action || !playerId) return;

            const method = action === "add-player" ? "POST" : "DELETE";
            try {
                const response = await fetch(`/api/groupes/${selectedGroupId}/players/${playerId}`, { method });
                if (response.ok) {
                    await loadGroupes(); 
                    await renderPlayersList(); 
                } else { alert("Erreur lors de l'opération."); }
            } catch (err) { alert("Erreur réseau."); }
        });

        // --- Modale 3 : Activités ---
        const openActiviteModal = async (groupId) => {
            selectedGroupId = groupId;
            const group = currentGroupes.find(g => g.id == groupId);
            activiteModalTitle.textContent = `Activités : ${group.nom}`;
            activiteModal.classList.remove("hidden");
            await renderActivitesList();
        };

        const closeActiviteModal = () => {
            activiteModal.classList.add("hidden");
            selectedGroupId = null;
        };

        const renderActivitesList = async () => {
            try {
                const response = await fetch("/api/activites");
                const allActivites = await response.json();
                const group = currentGroupes.find(g => g.id == selectedGroupId);
                const activitesInGroupIds = group.activites ? group.activites.map(a => a.id) : [];

                if (allActivites.length === 0) {
                    activitesListEl.innerHTML = `<p class="empty-row">Aucune activité trouvée.</p>`;
                    return;
                }

                activitesListEl.innerHTML = allActivites.map(act => {
                    const isInGroup = activitesInGroupIds.includes(act.id);
                    // On gère l'affichage du type s'il existe (pour différencier Raid et Chasse)
                    const typeLabel = act.type ? act.type : "Activité";
                    return `
                        <div class="player-item">
                            <div class="act-info">
                                <span class="player-name">Activité #${act.id}</span>
                                <span class="act-type">${typeLabel}</span>
                            </div>
                            ${isInGroup 
                                ? `<button class="btn-remove" data-action="remove-act" data-aid="${act.id}">Retirer</button>`
                                : `<button class="btn-add" data-action="add-act" data-aid="${act.id}">Inscrire</button>`
                            }
                        </div>
                    `;
                }).join("");

            } catch (error) {
                activitesListEl.innerHTML = `<p class="error">Erreur lors du chargement des activités.</p>`;
            }
        };

        activitesListEl.addEventListener("click", async (e) => {
            const action = e.target.getAttribute("data-action");
            const activiteId = e.target.getAttribute("data-aid");
            if (!action || !activiteId) return;

            const method = action === "add-act" ? "POST" : "DELETE";
            try {
                const response = await fetch(`/api/groupes/${selectedGroupId}/activites/${activiteId}`, { method });
                if (response.ok) {
                    await loadGroupes(); 
                    await renderActivitesList(); 
                } else { alert("Erreur lors de l'opération."); }
            } catch (err) { alert("Erreur réseau."); }
        });


        // --- Tableau principal ---
        const renderRows = (groupes) => {
            if (!Array.isArray(groupes) || groupes.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="4" class="empty-row">Aucun groupe disponible.</td></tr>`;
                return;
            }

            tableBody.innerHTML = groupes.map((groupe) => {
                const nbJoueurs = groupe.players ? groupe.players.length : 0;
                const nbActivites = groupe.activites ? groupe.activites.length : 0;
                return `
                    <tr>
                        <td>${groupe.id}</td>
                        <td><strong>${groupe.nom}</strong></td>
                        <td>
                            <span class="badge">${nbJoueurs} joueur(s)</span><br/>
                            <span class="badge-act">${nbActivites} activité(s)</span>
                        </td>
                        <td>
                            <button class="assign-btn" data-assign-id="${groupe.id}">Joueurs</button>
                            <button class="activite-btn" data-act-id="${groupe.id}">Activités</button>
                            <button class="delete-btn" data-id="${groupe.id}">Supprimer</button>
                        </td>
                    </tr>
                `;
            }).join("");
        };

        const loadGroupes = async () => {
            try {
                const response = await fetch("/api/groupes");
                if (!response.ok) throw new Error();
                currentGroupes = await response.json();
                renderRows(currentGroupes);
            } catch (error) {
                renderRows([]);
                showMessage("Erreur réseau lors du chargement des groupes.", "error");
            }
        };

        const deleteGroupe = async (id) => {
            try {
                const response = await fetch(`/api/groupes/${id}`, { method: "DELETE" });
                if (!response.ok) throw new Error();
                showMessage("Groupe supprimé.", "success");
                await loadGroupes();
            } catch (error) {
                showMessage("Erreur pendant la suppression.", "error");
            }
        };

        // --- Events Listeners de base ---
        openModalBtn.addEventListener("click", openModal);
        closeModalBtn.addEventListener("click", closeModal);
        closeAssignModalBtn.addEventListener("click", closeAssignModal);
        closeActiviteModalBtn.addEventListener("click", closeActiviteModal);
        
        // Fermer les modales en cliquant à l'extérieur
        modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
        assignModal.addEventListener("click", (e) => { if (e.target === assignModal) closeAssignModal(); });
        activiteModal.addEventListener("click", (e) => { if (e.target === activiteModal) closeActiviteModal(); });

        nomInput.addEventListener("input", () => validateField(nomInput));

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            if (!validateField(nomInput)) return;

            try {
                const response = await fetch("/api/groupes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nom: nomInput.value.trim() })
                });

                if (!response.ok) throw new Error();

                closeModal();
                showMessage("Groupe créé avec succès.", "success");
                await loadGroupes();
            } catch (error) {
                showMessage("Erreur pendant la création.", "error");
            }
        });

        tableBody.addEventListener("click", async (event) => {
            if (event.target.matches(".delete-btn")) {
                const id = event.target.getAttribute("data-id");
                if (confirm("Supprimer ce groupe ?")) await deleteGroupe(id);
            }
            if (event.target.matches(".assign-btn")) {
                const id = event.target.getAttribute("data-assign-id");
                await openAssignModal(id);
            }
            if (event.target.matches(".activite-btn")) {
                const id = event.target.getAttribute("data-act-id");
                await openActiviteModal(id);
            }
        });

        // Chargement initial
        loadGroupes();
    }
}

customElements.define("group-create-content", GroupCreateContent);