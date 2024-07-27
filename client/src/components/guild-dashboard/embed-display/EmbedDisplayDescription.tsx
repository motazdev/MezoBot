import { ReactElement } from "react";

const EmbedDisplayDescription = ({ data }: { data: string | ReactElement }) => {
  return <div className="description font-light text-gray-400">{data}</div>;
};

export default EmbedDisplayDescription;
