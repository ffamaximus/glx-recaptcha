declare global {
    interface Window {
        grecaptcha?: any;
        grecaptchaSiteKey?: string;
    }
}

/**
 * Render a reCAPTCHA v2 (checkbox or invisible) in a container.
 */
export function renderV2(
    containerId: string,
    siteKey: string,
    callback: (token: string) => void,
    options: Record<string, any> = {}
) {
    if (!window.grecaptcha) {
        throw new Error("grecaptcha not allowed. Asegúrate de llamar antes a loadRecaptcha().");
    }

    const params = {
        sitekey: siteKey,
        callback,
        ...options,
    };

    return window.grecaptcha.render(containerId, params);
}

/**
 * Configurer the global siteKey for v3.
 */
export function setV3SiteKey(siteKey: string) {
    window.grecaptchaSiteKey = siteKey;
}

/**
 * Execute any action v3 and return the token.
 */
export async function executeV3(action: string): Promise<string> {
    if (!window.grecaptcha) {
        throw new Error("grecaptcha not allowed. Ensure you've called loadRecaptcha() before executing v3.");
    }
    if (!window.grecaptchaSiteKey) {
        throw new Error("grecaptchaSiteKey not configured. Call setV3SiteKey(siteKey) first.");
    }

    return window.grecaptcha.execute(window.grecaptchaSiteKey, { action });
}
