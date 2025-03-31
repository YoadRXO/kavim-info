import dayjs from "dayjs";
import { GetRecentPosts } from "../../common/queriess/GetDanBadarom";

export const DanBadarom = () => {
  const date = dayjs().subtract(1, "day").format("YYYY/MM/DD"); // Replace with dynamic logic if needed
  const { data, isLoading, error } = GetRecentPosts(date);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return <div>DanBadarom + {JSON.stringify(data)}</div>;
};
