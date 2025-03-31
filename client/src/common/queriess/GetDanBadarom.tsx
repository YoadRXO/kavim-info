import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const GetRecentPosts = (date: string) => {
  return useQuery({
    queryKey: ["recentPosts", date],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/${date}`, {
          headers: {
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          },
        });
        console.log("data:", data);
        return data;
      } catch (error) {
        console.error("Error fetching recent posts:", error);
        throw error;
      }
    },
    enabled: !!date, // Ensures query runs only when date is provided
  });
};
