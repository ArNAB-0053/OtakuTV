// lib/deviceWidth.js
export function getDeviceWidth(width) {
  if (width < 640) return "sm";
  if (width < 768) return "md"; 
  if (width < 1024) return "lg";
  if (width < 1280) return "xl";
  return "2xl"; // Tailwind's xl breakpoint
}
