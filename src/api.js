export const fetchRansomwareData = async () => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/data/posts.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching ransomware data:', error);
    return [];
  }
};
