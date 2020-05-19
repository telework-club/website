import Typography from "typography";
import theme from "typography-theme-grand-view";

theme.overrideThemeStyles = ({ rhythm }, options) => ({
  blockquote: {
    fontSize: "1em",
  },
});
const typography = new Typography(theme);

// Export helper functions
export const { scale, rhythm, options } = typography;
export default typography;
