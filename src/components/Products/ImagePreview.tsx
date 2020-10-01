import React from "react";

type Props = {
  id: string;
  path: any;
};
const ImagePreview: React.FC<Props> = (props) => {
  return (
    <div className="p-media__thumb">
      <img alt="プレビュー画像" src={props.path} />
    </div>
  );
};

export default ImagePreview;
