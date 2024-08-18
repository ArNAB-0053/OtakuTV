export const Duration = (duration) => {
  if (
    typeof duration !== "string" ||
    duration === "Unknown" ||
    duration === null
  ) {
    return "N/A";
  }
  let parts = [],
    inMin = 0;
  if (duration.includes("hr") && duration.includes("min")) {
    parts = duration.split(" ");
    const hr = parts[0];
    const minn = parts[2];
    inMin = Number(hr) * 60 + Number(minn);
    return inMin + " Min";
  }
  return duration.substring(0, 7);
};

export const rated = {
  "PG-13 - Teens 13 or older": "PG-13",
  "R - 17+ (violence & profanity)": "R-17+",
  "R+ - Mild Nudity": "R+",
  "PG - Children": "PG",
  "G - All Ages": "G",
  "Rx - Hentai": "RX",
};
