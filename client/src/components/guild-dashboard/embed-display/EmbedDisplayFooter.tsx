"use client";

import { ReactElement } from "react";

const EmbedDisplayFooter = ({ data }: { data: string | ReactElement }) => {
  return <div className="footer text-white font-semibold">{data}</div>;
};

export default EmbedDisplayFooter;
