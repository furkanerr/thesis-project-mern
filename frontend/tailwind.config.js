module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          base: "hsl(203,89%,53%)",
          dark: "hsl(203,89%,46%)",
          ligth: "hsl(203,89%,96%)"
        },
        gray: {
          dark: "#657786",
          light: "#AAB8C2",
          extralight: "#E1E8ED",
          lightest: "#F5F8FA",
        },
        black: "#14171A"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
