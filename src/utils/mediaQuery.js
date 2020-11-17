const sizes = {
    xs: '575.98px',
    sm: '767.98px',
    md: '991.98px',
    lg: '1199.98px',
    xl: '1600px',
};

export default {
    down(size) {
        return `@media (max-width: ${sizes[size]})`;
    },
};
