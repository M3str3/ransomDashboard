export const fetchRansomwareData = async () => {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/joshhighet/ransomwatch/main/posts.json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ransomware data:", error);
    return [];
  }
};
