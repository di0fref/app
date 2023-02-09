const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./src/**/*.{html,js}",
        "./node_modules/@di0fref/tailwind-datepicker-react/dist/**/*.js", // <--- Add this line
    ],
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
            borderRadius:{
                box: "3px"
            },
            colors: {
                "modal-dark": "#ebecef",
                modal: "#F4F5F7",
                base: "#172b4d",
                "blue-btn": "#127bbd",
                "dark-blue-btn": "#2d68a2",
                warning: "#e95b4c"
            },
            fontSize: {
                base: "16px",
                md: "0.95em",
            },
            // fontFamily: {
            //     sans: ['-apple-system,,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif'],
            // },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}

// -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
