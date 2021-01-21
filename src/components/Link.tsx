import React from "react";
import "../css/Link.css";

export interface LinkI {
  id: number;
  url: string;
  company: string;
  note: string | null | undefined;
  userId: number;
}

interface Props {
  link: LinkI;
  handleDel: (id: number) => void;
}

export default function Link({ link, handleDel }: Props) {
  return (
    <div className="Link-div">
      <div className="left-Link-div">
        <a href={link.url}>link</a>
      </div>
      <div className="right-Link-div">
        <div className="delete-link" onClick={() => handleDel(link.id)}>
          del
        </div>
        <div className="mark-as-read">mark as read</div>
      </div>
    </div>
  );
}
