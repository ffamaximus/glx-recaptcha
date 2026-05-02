let scriptLoaded = false;

export function loadRecaptcha(
    siteKey: string,
    version: "v2" | "v3" = "v2"
): Promise<void> {
    return new Promise((resolve, reject) => {
        if (typeof window === "undefined" || typeof document === "undefined") {
            return resolve();
        }

        if (scriptLoaded) return resolve();

        const script = document.createElement("script");
        script.src =
            version === "v2"
                ? "https://www.google.com/recaptcha/api.js?render=explicit"
                : `https://www.google.com/recaptcha/api.js?render=${siteKey}`;

        script.async = true;
        script.defer = true;

        script.onload = () => {
            scriptLoaded = true;
            resolve();
        };

        script.onerror = (err) => reject(err);

        document.head.appendChild(script);
    });
}
