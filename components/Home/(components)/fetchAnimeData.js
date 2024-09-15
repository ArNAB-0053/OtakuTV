export async function fetchAnimeData() {
  try {
    const response = await fetch(
      "https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=1&limit=10"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch anime data");
    }
    const data = await response.json();

    return data?.data?.map((anime) => ({
      mal_id: anime.mal_id,
      url: anime?.images?.jpg?.large_image_url || anime?.images?.jpg?.image_url,
      title: anime.title_english || anime.title,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}