class AppBar extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname;
        const isHome = currentPath === "/" || currentPath === "/index.html";
        const isClasses = currentPath === "/classes" || currentPath === "/classes.html";

        this.innerHTML = `
            <aside class="app-bar">
                <h2>RaidNation</h2>
                <nav>
                    <a href="/" ${isHome ? "aria-current='page'" : ""}>Page principale</a>
                    <a href="/classes" ${isClasses ? "aria-current='page'" : ""}>Ajouter une classe</a>
                </nav>
            </aside>
        `;
    }
}

customElements.define("app-bar", AppBar);
