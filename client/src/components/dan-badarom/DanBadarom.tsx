import dayjs from "dayjs";
import { GetRecentPosts } from "../../common/queriess/GetDanBadarom";
import { HEBREW } from "../../common/consts/hebrew";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const DanBadarom = () => {
  const { data, isPending, mutateAsync } = GetRecentPosts();

  const onAccept = async (value: dayjs.Dayjs | null) => {
    if (value) {
      await mutateAsync(value.format("YYYY/MM/DD"));
    }
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      <DatePicker onAccept={onAccept} />
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
