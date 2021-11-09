import React, { FunctionComponent } from "react";

import * as Molecule from "..";
import * as Styled from "./styled";

interface Props {
  viewCount: number;
  commentCount: number;
}

const ViewsAndComment: FunctionComponent<Props> = ({
  viewCount,
  commentCount,
}) => {
  return (
    <Styled.ViewsAndComment>
      <li>
        <Molecule.IconWithNumber type={"Views"} value={viewCount} />
      </li>
      <li>
        <Molecule.IconWithNumber type={"Comments"} value={commentCount} />
      </li>
    </Styled.ViewsAndComment>
  );
};

export default ViewsAndComment;
