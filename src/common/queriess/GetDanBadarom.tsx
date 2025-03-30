import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import * as cheerio from "cheerio";

export const GetDanBadarom = () => {
  return useQuery({
    queryKey: ["danBadarom"],
    queryFn: async () => {
      const today = dayjs().format("YYYY/MM/DD");
      try {
        const { data } = await axios.get(`/api/${today}`, {
          headers: {
            Accept: "text/html",
          },
        });

        const $ = cheerio.load(data);
        const h1Text = $("h1.entry-title").text().trim();

        console.log("Extracted h1:", h1Text);
        return h1Text;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    enabled: true,
  });
};
