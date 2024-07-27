"use client";
import { ReactElement } from "react";

const EmbedDisplayTitle = ({ data }: { data: string | ReactElement }) => {
  return (
    <div className="title  text-transparent text-white font-semibold">
      {data}
    </div>
  );
};

export default EmbedDisplayTitle;
