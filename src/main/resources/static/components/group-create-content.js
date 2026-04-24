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

            <div id="groupe-modal" class="modal-backdrop hidden">
                <div class="modal-card">
                    <div class="modal-header">
                        <h2>Ajouter un groupe</h2>
                        <button id="close-modal-btn" class="icon-btn">×</button>
                    </div>
                    <form id="groupe-create-form">
                        <div class="field">
                            <label for="nom">Nom du groupe</label>
                            <input id="nom" name="nom" type="text" placeholder="Ex: Les tryharders" required>
                        </div>
                        <div class="actions">
                            <button class="primary-btn" type="submit">Créer le groupe</button>
                        </div>
                    </form>
                </div>
            </div>

            <div id="assign-modal" class="modal-backdrop hidden">
                <div class="modal-card">
                    <div class="modal-header">
                        <h2 id="assign-modal-title">Gérer les joueurs</h2>
                        <button id="close-assign-modal-btn" class="icon-btn">×</button>
                    </div>
                    <div id="players-list" class="players-list"></div>
                </div>
            </div>

            <div id="activite-modal" class="modal-backdrop hidden">
                <div class="modal-card">
                    <div class="modal-header">
                        <h2 id="activite-modal-title">Inscrire à une activité</h2>
                        <button id="close-activite-modal-btn" class="icon-btn">×</button>
                    </div>
                    <div id="activites-list" class="players-list"></div>
                </div>
            </div>

            <style>
                .class-create-content { max-width: 980px; width: 100%; background: #ffffff; border: 1px solid #dbe4ef; border-radius: 16px; padding: 28px; box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08); }
                .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
                .primary-btn { border: none; background: #2563eb; color: #ffffff; padding: 11px 16px; border-radius: 10px; font-weight: 700; cursor: pointer; }
                .table-wrapper { border: 1px solid #dbe4ef; border-radius: 12px; overflow: hidden; }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 13px 14px; text-align: left; border-bottom: 1px solid #e2e8f0; }
                .badge { background: #f1f5f9; color: #475569; padding: 4px 8px; border-radius: 6px; font-size: 13px; font-weight: 600; display: inline-block; margin-bottom: 4px;}
                .badge-act { background: #e0e7ff; color: #3730a3; padding: 4px 8px; border-radius: 6px; font-size: 13px; font-weight: 600; display: inline-block; }
                .modal-backdrop { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.5); display: flex; justify-content: center; align-items: center; z-index: 100; }
                .modal-backdrop.hidden { display: none; }
                .modal-card { width: 100%; max-width: 520px; background: #ffffff; border-radius: 14px; padding: 20px; max-height: 80vh; overflow-y: auto; }
                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
                .icon-btn { border: none; background: #e2e8f0; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; }
                .player-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 8px; background: #f8fafc; }
                .btn-add { background: #16a34a; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; }
                .btn-remove { background: #dc2626; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; }
                .modale-section h3 { font-size: 14px; margin: 15px 0 10px 0; border-bottom: 1px solid #eee; padding-bottom: 5px; }
            </style>
        `;

        const tableBody = this.querySelector("#groupes-table-body");
        const modal = this.querySelector("#groupe-modal");
        const assignModal = this.querySelector("#assign-modal");
        const activiteModal = this.querySelector("#activite-modal");
        const activitesListEl = this.querySelector("#activites-list");
        const playersListEl = this.querySelector("#players-list");
        const messageEl = this.querySelector("#global-message");

        let currentGroupes = [];
        let selectedGroupId = null;

        const loadGroupes = async () => {
            try {
                const response = await fetch("/api/groupes");
                currentGroupes = await response.json();
                renderTable();
            } catch (error) { console.error(error); }
        };

        const renderTable = () => {
            tableBody.innerHTML = currentGroupes.map(g => `
                <tr>
                    <td>${g.id}</td>
                    <td><strong>${g.nom}</strong></td>
                    <td>
                        <span class="badge">${g.players?.length || 0} joueur(s)</span><br/>
                        <span class="badge-act">${g.activites?.length || 0} activité(s)</span>
                    </td>
                    <td>
                        <button class="primary-btn btn-manage-players" data-id="${g.id}" style="background:#0ea5e9"> 
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
						  <circle cx="12" cy="7" r="4" />
						</svg>	
						Joueurs
						</button>
                        <button class="primary-btn btn-manage-activities" data-id="${g.id}" style="background:#8b5cf6">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
						</svg>
						Activités
						</button>
                        <button class="primary-btn btn-delete-group" data-id="${g.id}" style="background:#dc2626">
							<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
							  <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
							</svg>
						</button>
                    </td>
                </tr>
            `).join("");
        };

        // Rendu de la liste des activités avec DEUX SECTIONS
        this.renderActivitesList = async () => {
            try {
                const response = await fetch("/api/activites");
                const allActivites = await response.json();
                const group = currentGroupes.find(g => g.id == selectedGroupId);
                const currentIds = group.activites?.map(a => a.id) || [];

                const inscrites = allActivites.filter(act => currentIds.includes(act.id));
                const disponibles = allActivites.filter(act => !currentIds.includes(act.id));

                const itemHtml = (act, isIn) => `
                    <div class="player-item" style="${isIn ? 'border-left: 4px solid #8b5cf6;' : ''}">
                        <div><strong>${act.nom || act.type}</strong><br><small>ID: ${act.id}</small></div>
                        <button class="${isIn ? 'btn-remove' : 'btn-add'}" data-aid="${act.id}" data-action="${isIn ? 'remove' : 'add'}">
                            ${isIn ? 'Retirer' : 'Inscrire'}
                        </button>
                    </div>`;

                activitesListEl.innerHTML = `
                    <div class="modale-section">
                        <h3>
						<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
						  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
						</svg>

						 Inscrites (${inscrites.length})
						 </h3>
                        ${inscrites.length > 0 ? inscrites.map(a => itemHtml(a, true)).join("") : '<p>Aucune activité.</p>'}
                    </div>
                    <div class="modale-section">
                        <h3>
						<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
						  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
						</svg>

						 Disponibles (${disponibles.length})</h3>
                        ${disponibles.length > 0 ? disponibles.map(a => itemHtml(a, false)).join("") : '<p>Tout est inscrit !</p>'}
                    </div>`;
            } catch (e) { activitesListEl.innerHTML = "Erreur API"; }
        };

        this.renderPlayersList = async () => {
            try {
                const response = await fetch("/api/players");
                const allPlayers = await response.json();
                const group = currentGroupes.find(g => g.id == selectedGroupId);
                const currentIds = group.players?.map(p => p.id) || [];

                playersListEl.innerHTML = allPlayers.map(p => {
                    const isIn = currentIds.includes(p.id);
                    return `<div class="player-item">
                        <span><strong>${p.nom}</strong></span>
                        <button class="${isIn ? 'btn-remove' : 'btn-add'}" data-pid="${p.id}" data-action="${isIn ? 'remove' : 'add'}">
                            ${isIn ? 'Retirer' : 'Ajouter'}
                        </button>
                    </div>`;
                }).join("");
            } catch (e) { playersListEl.innerHTML = "Erreur API"; }
        };

        // Gestion des événements
        tableBody.addEventListener("click", (e) => {
            const btn = e.target.closest("button");
            if (!btn) return;
            const id = btn.dataset.id;
            if (btn.classList.contains("btn-manage-activities")) { selectedGroupId = id; activiteModal.classList.remove("hidden"); this.renderActivitesList(); }
            if (btn.classList.contains("btn-manage-players")) { selectedGroupId = id; assignModal.classList.remove("hidden"); this.renderPlayersList(); }
            if (btn.classList.contains("btn-delete-group")) this.deleteGroupe(id);
        });

        activitesListEl.addEventListener("click", async (e) => {
            const btn = e.target.closest("button");
            if (!btn) return;
            const method = btn.dataset.action === "add" ? "POST" : "DELETE";
            await fetch(`/api/groupes/${selectedGroupId}/activites/${btn.dataset.aid}`, { method });
            await loadGroupes(); await this.renderActivitesList();
        });

        playersListEl.addEventListener("click", async (e) => {
            const btn = e.target.closest("button");
            if (!btn) return;
            const method = btn.dataset.action === "add" ? "POST" : "DELETE";
            await fetch(`/api/groupes/${selectedGroupId}/players/${btn.dataset.pid}`, { method });
            await loadGroupes(); await this.renderPlayersList();
        });

        this.querySelector("#close-modal-btn").onclick = () => modal.classList.add("hidden");
        this.querySelector("#close-assign-modal-btn").onclick = () => assignModal.classList.add("hidden");
        this.querySelector("#close-activite-modal-btn").onclick = () => activiteModal.classList.add("hidden");
        this.querySelector("#open-modal-btn").onclick = () => modal.classList.remove("hidden");

        loadGroupes();
    }

    async deleteGroupe(id) {
        if (confirm("Supprimer ce groupe ?")) {
            await fetch(`/api/groupes/${id}`, { method: "DELETE" });
            window.location.reload();
        }
    }
}

if (!customElements.get("group-create-content")) {
    customElements.define("group-create-content", GroupCreateContent);
}