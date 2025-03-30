import { GetDanBadarom } from "../../common/queriess/GetDanBadarom";
import "./dan-badarom.scss";

export const DanBadarom = () => {
  const { data, isLoading, error } = GetDanBadarom();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return <div>DanBadarom + {JSON.stringify(data)}</div>;
};
