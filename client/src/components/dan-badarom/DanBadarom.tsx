import dayjs from "dayjs";
import { GetRecentPosts } from "../../common/queriess/GetDanBadarom";
import { HEBREW } from "../../common/consts/hebrew";

export const DanBadarom = () => {
  const date = dayjs().subtract(1, "day").format("YYYY/MM/DD"); // Replace with dynamic logic if needed
  const { data, isLoading, error } = GetRecentPosts(date);

  return (
    <div>
      {!!data ? (
        <div>
          {HEBREW.infoForToday} : {data.toString()}
        </div>
      ) : (
        <div>{HEBREW.noInfoForToday}</div>
      )}
    </div>
  );
};
