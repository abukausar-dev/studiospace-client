export const getSafeRedirect = (value?: string) => {
    if (value && value.startsWith("/") && !value.startsWith("//")) {
        return value;
    }
    return "/";
};