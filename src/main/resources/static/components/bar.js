class AppBar extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname;
        const isHome = currentPath === "/" || currentPath === "/index.html";
        const isClasses = currentPath === "/classes" || currentPath === "/classes.html";
        const isGroupes = currentPath === "/groupes" || currentPath === "/groupes.html"; // <-- AJOUT

        this.innerHTML = `
            <aside class="app-bar">
                <h2>RaidNation</h2>
                <nav>
                    <a href="/" ${isHome ? "aria-current='page'" : ""}>Page principale</a>
                    <a href="/classes" ${isClasses ? "aria-current='page'" : ""}>Ajouter une classe</a>
                    <a href="/groupes" ${isGroupes ? "aria-current='page'" : ""}>Ajouter un groupe</a> </nav>
            </aside>
        `;
    }
}

customElements.define("app-bar", AppBar);