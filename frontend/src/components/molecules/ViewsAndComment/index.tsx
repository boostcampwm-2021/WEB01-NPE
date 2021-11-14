import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import { IconWithNumber } from "@components/molecules";

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
      <Styled.IconContainer>
        <IconWithNumber type={"Views"} value={viewCount} />
      </Styled.IconContainer>
      <Styled.IconContainer>
        <IconWithNumber type={"Comments"} value={commentCount} />
      </Styled.IconContainer>
    </Styled.ViewsAndComment>
  );
};

export default ViewsAndComment;
