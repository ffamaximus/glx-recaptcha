export interface ReCaptchaOptions {
    theme?: "light" | "dark";
    size?: "normal" | "compact" | "invisible";
    tabindex?: number;
    badge?: "bottomright" | "bottomleft" | "inline";
}

interface ReCaptcha {
    render(containerId: string, params: Record<string, any>): number;
    execute(siteKey: string, options: { action: string }): Promise<string>;
    reset(widgetId?: number): void;
}

declare global {
    interface Window {
        grecaptcha?: ReCaptcha;
        grecaptchaSiteKey?: string;
    }
}

/**
 * Render a reCAPTCHA v2 (checkbox or invisible) in a container.
 * @returns The widget ID which can be used to reset the captcha.
 */
export function renderV2(
    containerId: string,
    siteKey: string,
    callback: (token: string) => void,
    options: ReCaptchaOptions = {}
): number {
    if (!window.grecaptcha) {
        throw new Error("grecaptcha not found. Ensure you call loadRecaptcha() before rendering.");
    }

    const params = {
        sitekey: siteKey,
        callback,
        ...options,
    };

    return window.grecaptcha.render(containerId, params);
}

/**
 * Resets the reCAPTCHA v2 widget.
 * @param widgetId - Optional widget ID. If not provided, resets the first created widget.
 */
export function resetV2(widgetId?: number) {
    if (window.grecaptcha) {
        window.grecaptcha.reset(widgetId);
    }
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
