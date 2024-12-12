import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0d6efd", // اللون الرئيسي
      contrastText: "#fff", // لون النصوص على الأزرار الأساسية
    },
    secondary: {
      main: "#6c757d", // لون ثانوي
      contrastText: "#fff",
    },
    background: {
      default: "#f5f7fc", // لون الخلفية الرئيسي
      paper: "#ffffff", // لون الحاويات
    },
    text: {
      primary: "#000000", // لون النصوص الرئيسية
      secondary: "#4a4a4a", // لون النصوص الثانوية
      disabled: "#9e9e9e", // لون النصوص المعطلة
    },
    divider: "#e0e0e0", // لون الخطوط الفاصلة
  },
  typography: {
    fontSize: 14, // حجم النص الافتراضي
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0d6efd",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6c757d",
      contrastText: "#ffffff",
    },
    background: {
      default: "#121212", // لون الخلفية الرئيسي الداكن
      paper: "#1e1e1e", // لون الحاويات
    },
    text: {
      primary: "#ffffff", // لون النصوص الرئيسية
      secondary: "#b0b0b0", // لون النصوص الثانوية
      disabled: "#6c6c6c", // لون النصوص المعطلة
    },
    divider: "#424242", // لون الخطوط الفاصلة
  },
  typography: {
    fontSize: 14,
  },
});

export { lightTheme, darkTheme };
