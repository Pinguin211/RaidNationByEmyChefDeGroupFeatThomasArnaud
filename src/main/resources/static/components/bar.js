class AppBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <aside class="app-bar">
                <h2>RaidNation</h2>
                <nav>
                    <a href="/">Page principale</a>
                </nav>
            </aside>
        `;
    }
}

customElements.define("app-bar", AppBar);
