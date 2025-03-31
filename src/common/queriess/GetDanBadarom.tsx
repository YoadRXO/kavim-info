import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import axios from "axios";

export const GetDanBadarom = () => {
  return useQuery({
    queryKey: ["danBadarom"],
    queryFn: async () => {
      const yesterday = dayjs().subtract(1, "day").format("YYYY/MM/DD");

      try {
        const { data } = await axios.get(
          "https://www.danbadarom.co.il/wp-json/"
        );

        console.log("Fetched Data:", data);
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    enabled: true,
  });
};
