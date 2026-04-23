class AppBar extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname;
        const isHome = currentPath === "/" || currentPath === "/index.html";
        const isPlayers = currentPath === "/players" || currentPath === "/players.html";
        const isClasses = currentPath === "/classes" || currentPath === "/classes.html";

        this.innerHTML = `
            <aside class="app-bar">
                <h2>RaidNation</h2>
                <nav>
                    <a href="/" ${isHome ? "aria-current='page'" : ""}>Page principale</a>
                    <a href="/players" ${isPlayers ? "aria-current='page'" : ""}>Players</a>
                    <a href="/classes" ${isClasses ? "aria-current='page'" : ""}>Classes</a>
                </nav>
            </aside>
        `;
    }
}

customElements.define("app-bar", AppBar);
