let scriptLoaded = false;
let loadPromise: Promise<void> | null = null;

export function loadRecaptcha(
    siteKey: string,
    version: "v2" | "v3" = "v2"
): Promise<void> {
    if (loadPromise) {
        return loadPromise;
    }

    loadPromise = new Promise((resolve, reject) => {
        if (typeof window === "undefined" || typeof document === "undefined") {
            // Entorno SSR: no hacer nada, solo resolver
            return resolve();
        }

        const script = document.createElement("script");
        script.src =
            version === "v2"
                ? "https://www.google.com/recaptcha/api.js?render=explicit"
                : `https://www.google.com/recaptcha/api.js?render=${siteKey}`;

        script.async = true;
        script.defer = true;

        script.onload = () => {
            resolve();
        };

        script.onerror = (err) => {
            loadPromise = null; // Reset promise on error to allow retry
            reject(err);
        };

        document.head.appendChild(script);
    });

    return loadPromise;
}
