export const fetchIssuers = async () => {
    try {
      const response = await fetch("http://localhost:4500/stock/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error fetching issuers:", error);
      throw error; 
    }
  };
  