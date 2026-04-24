class ActivityDetailContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="activity-detail">
                <header class="page-header">
                    <h1>Détail de l'activité</h1>
                    <p id="subtitle">Chargement...</p>
                </header>
                <div id="status" class="status">Connexion au serveur...</div>
                <div id="content" class="content hidden">
                    <section class="card">
                        <h2>Récapitulatif</h2>
                        <div class="meta-grid" id="meta-grid"></div>
                    </section>
                    <section class="card">
                        <h2>Groupes Inscrits</h2>
                        <div id="groups-list" class="stack"></div>
                    </section>
                    <section class="card">
                        <h2>Joueurs Participants</h2>
                        <div id="players-list" class="stack"></div>
                    </section>
                </div>
            </section>
            <style>
                .activity-detail { display: grid; gap: 20px; padding: 20px; }
                .card { background: white; border-radius: 12px; padding: 20px; border: 1px solid #dbe4ef; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
                .hidden { display: none; }
                .meta-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
                .meta-item { background: #f8fafc; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0; }
                .meta-item strong { display: block; font-size: 11px; color: #64748b; text-transform: uppercase; }
                .stack { display: grid; gap: 8px; }
                .row { padding: 10px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
            </style>
        `;

        this.load();
    }

    async load() {
        const id = window.location.pathname.split("/").pop();
        try {
            const response = await fetch(`/api/activites/${id}/detail`);
            if (!response.ok) throw new Error();
            const data = await response.json();
            this.render(data);
        } catch (e) {
            this.querySelector("#status").textContent = "Activité introuvable.";
        }
    }

    render(data) {
        this.querySelector("#status").classList.add("hidden");
        this.querySelector("#content").classList.remove("hidden");
        this.querySelector("#subtitle").textContent = `ID #${data.id} - ${data.horaire || ''}`;

        const grid = this.querySelector("#meta-grid");
        grid.innerHTML = `
            <div class="meta-item"><strong>Nom</strong>${data.nom || '-'}</div>
            <div class="meta-item"><strong>Type</strong>${data.type || '-'}</div>
            <div class="meta-item"><strong>Catégorie</strong>${data.categorie}</div>
            <div class="meta-item"><strong>Difficulté</strong>${data.difficulte || '-'}</div>
        `;

        this.querySelector("#groups-list").innerHTML = data.groupes.map(g => 
            `<div class="row"><strong>${g.nom}</strong> (${g.players.length} joueurs)</div>`).join("");
        
        this.querySelector("#players-list").innerHTML = data.players.map(p => 
            `<div class="row"><strong>${p.nom}</strong></div>`).join("");
    }
}

if (!customElements.get("activity-detail-content")) {
    customElements.define("activity-detail-content", ActivityDetailContent);
}