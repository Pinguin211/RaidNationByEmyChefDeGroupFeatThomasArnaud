class AppLayout extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="layout-root">
                <app-bar></app-bar>
                <main class="layout-content">
                    <slot name="content"></slot>
                </main>
            </div>
        `;
    }
}

customElements.define("app-layout", AppLayout);
