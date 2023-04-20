/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable import/no-relative-parent-imports */
import "./bootstrap";
import "../css/app.css";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import MetaMaskContextProvider from "@/Contexts/MetaMaskContext";

const appName = window.document.querySelector("title")?.innerText ?? "NFTer";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => await resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob("./Pages/**/*.tsx")),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <MetaMaskContextProvider>
                <App {...props} />
            </MetaMaskContextProvider>,
        );
    },
    progress: {
        color: "#4B5563",
    },
});
