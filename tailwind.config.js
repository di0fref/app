const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ["./src/**/*.{html,js}"],
    variants: {
        extend: {
            visibility: ["group-hover"],
        },
    },
    theme: {
        fontFamily: {
            sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        },
        extend: {
              fontSize: {
                base: "16px",
                md: "0.9em",
            },
            // fontFamily: {
            //     sans: ['-apple-system,,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif'],
            // },
        },
    },
    plugins: [],
}

// -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;