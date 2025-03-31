import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const GetRecentPosts = () => {
  return useMutation({
    mutationKey: ["recentPosts"],
    mutationFn: async (date: string) => {
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
  });
};
