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
							<svg viewBox="0 0 91 91" enable-background="new 0 0 91 91" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M43.77,52.37c14.094,0,25.563-11.551,25.563-25.746S57.863,0.88,43.77,0.88 c-14.092,0-25.555,11.549-25.555,25.744S29.678,52.37,43.77,52.37z M52.189,20.823h3.5c1.43,0,2.592,1.16,2.592,2.594 s-1.162,2.594-2.592,2.594h-3.5c-1.434,0-2.594-1.16-2.594-2.594S50.756,20.823,52.189,20.823z M32.301,20.823h3.502 c1.432,0,2.594,1.16,2.594,2.594s-1.162,2.594-2.594,2.594h-3.502c-1.436,0-2.594-1.16-2.594-2.594S30.865,20.823,32.301,20.823z M31.412,31.599c1.355-0.459,2.83,0.26,3.293,1.613c1.344,3.932,4.988,6.572,9.066,6.572c4.074,0,7.721-2.641,9.07-6.574 c0.465-1.354,1.93-2.074,3.291-1.609c1.357,0.465,2.08,1.939,1.613,3.293c-2.068,6.027-7.686,10.076-13.975,10.076 c-6.297,0-11.912-4.049-13.973-10.08C29.334,33.536,30.057,32.062,31.412,31.599z" fill="#ffffff"></path> <path d="M65.572,48.407C60,54.052,52.287,57.556,43.77,57.556c-8.432,0-16.076-3.438-21.637-8.986 c-6.846,3.301-10.23,8.203-10.23,14.992v17.645c3.43,1.9,11.766,8.836,32.285,8.836c20.705,0,29.332-6.783,31.904-8.619V63.558 C76.092,56.64,72.613,51.685,65.572,48.407z" fill="#ffffff"></path> </g> </g> </g></svg>
							Joueurs
						</button>
                        <button class="primary-btn btn-manage-activities" data-id="${g.id}" style="background:#8b5cf6">
						<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 0H13L3.70711 9.29289L2.20711 7.79289L0.792893 9.20711L3.08579 11.5L1.5835 13.0023C1.55586 13.0008 1.52802 13 1.5 13C0.671573 13 0 13.6716 0 14.5C0 15.3284 0.671573 16 1.5 16C2.32843 16 3 15.3284 3 14.5C3 14.472 2.99923 14.4441 2.99771 14.4165L4.5 12.9142L6.79289 15.2071L8.20711 13.7929L6.70711 12.2929L16 3V0Z" fill="#ffffff"></path> </g></svg>
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