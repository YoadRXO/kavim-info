import dayjs from "dayjs";
import { GetRecentPosts } from "../../common/queriess/GetDanBadarom";
import { HEBREW } from "../../common/consts/hebrew";

export const DanBadarom = () => {
  const date = dayjs().subtract(1, "day").format("YYYY/MM/DD"); // Replace with dynamic logic if needed
  const { data, isLoading, error } = GetRecentPosts(date);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div>
      {!!data ? (
        <div>
          {HEBREW.infoForToday} : {data.toString()}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
