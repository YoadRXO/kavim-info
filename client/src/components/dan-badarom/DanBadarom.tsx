import dayjs from "dayjs";
import { GetRecentPosts } from "../../common/queriess/GetDanBadarom";
import { HEBREW } from "../../common/consts/hebrew";

export const DanBadarom = () => {
  const date = dayjs().subtract(1, "day").format("YYYY/MM/DD"); // Replace with dynamic logic if needed
  const { data, isLoading } = GetRecentPosts(date);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {!!data ? (
        <div>
          {HEBREW.infoForToday} : {data.page1Content.toString()}
          <div>
            {HEBREW.infoForToday} : {data.page2Content.toString()}
          </div>
        </div>
      ) : (
        <div>{HEBREW.noInfoForToday}</div>
      )}
    </div>
  );
};
