import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const GetRecentPosts = (date: string) => {
  return useQuery({
    queryKey: ["recentPosts", date],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://kavim-info-1.onrender.com/api/dan-badarom`, // Fixed URL format
          {
            params: { date },
            headers: {
              Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            },
          }
        );
        if (data)
          return {
            page1Content: data.page1Content,
            page2Content: data.page2Content,
          };
      } catch (error) {
        console.error("Error fetching recent posts:", error);
        throw error;
      }
    },
    enabled: !!date, // Ensures query runs only when date is provided
  });
};
