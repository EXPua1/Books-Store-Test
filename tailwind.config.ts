module.exports = {
    content: [
        './src/**/*.{ts,tsx}', // Убедись, что Tailwind сканирует все твои файлы
    ],
    theme: {
        extend: {
            container: {
                center: true, // Центрирует контейнер
                padding: '1rem', // Добавляет отступы по краям
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1440px', // Устанавливаем максимальную ширину 1440px
                    '2xl': '1440px', // Устанавливаем максимальную ширину 1440px для больших экранов
                },
            },
        },
    },
    plugins: [],
};