const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Lato", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    50: "#F2F5FC",
                    100: "#E2E8F7",
                    200: "#CBD6F2",
                    300: "#A8BCE8",
                    400: "#7E9ADC",
                    500: "#5F7AD2",
                    600: "#4A5EC4",
                    700: "#414EB4",
                    800: "#3A4293",
                    900: "#333A75",
                },
                secondary: {
                    50: "#FCFDFD",
                    100: "#F7FAFB",
                    200: "#EEF3F5",
                    300: "#DBDEE5",
                    400: "#C4C8CF",
                    500: "#A5ADB9",
                    600: "#7E8A9C",
                    700: "#637282",
                    800: "#3C4249",
                    900: "#212225",
                },
                red: {
                    50: "#FFF5F2",
                    600: "#B01E20",
                },
            },
            fontSize: {
                "3xl": "32px",
            },
        },
        screens: {
            xs: "480px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1440px",
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        function ({ addComponents }) {
            addComponents({
                ".container": {
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    "@screen sm": {
                        width: "610px",
                    },
                    "@screen md": {
                        width: "728px",
                    },
                    "@screen lg": {
                        width: "957px",
                    },
                    "@screen xl": {
                        width: "1198px",
                    },
                },
            });
        },
    ],
};
