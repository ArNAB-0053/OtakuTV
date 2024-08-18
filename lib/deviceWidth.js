// lib/deviceWidth.js
export function getDeviceWidth(width) {
  if (width < 640) return "sm"; // Tailwind's sm breakpoint
  if (width < 768) return "md"; // Tailwind's md breakpoint
  if (width < 1024) return "lg"; // Tailwind's lg breakpoint
  if (width < 1280) return "xl";
  return "2xl"; // Tailwind's xl breakpoint
}
