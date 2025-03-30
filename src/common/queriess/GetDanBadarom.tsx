import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";

export const GetDanBadarom = () => {
  return useQuery({
    queryKey: ["danBadarom"],
    queryFn: async () => {
      const today = dayjs().format("YYYY/MM/DD");
      try {
        const { data } = await axios.get(
          `https://www.danbadarom.co.il/${today}`,
          {
            headers: {
              Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
              "Accept-Encoding": "gzip, deflate, br, zstd",
              "Accept-Language": "en-US,en;q=0.5",
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Referer: "https://www.google.com/",
              "Sec-Fetch-Dest": "document",
              "Sec-Fetch-Mode": "navigate",
              "Sec-Fetch-Site": "cross-site",
              TE: "trailers",
              "Upgrade-Insecure-Requests": "1",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0",
            },
          }
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
