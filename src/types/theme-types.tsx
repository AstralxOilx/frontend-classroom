type ThemeColors = "Violet" | "Blue" | "Green" | "Rose"; // เพิ่มสีอื่น ๆ ที่จำเป็น

interface ThemeColorsStateParams {
    themeColor: ThemeColors; // ธีมสีปัจจุบัน
    setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>; // ฟังก์ชันสำหรับเปลี่ยนสีธีม
}
