import React, { FunctionComponent } from "react"
import { Button, ImageBox, TextBox } from './styled'
import ProfileImage from '../../atoms/ProfileImage'
import SubTitleText from '../../atoms/Text'

interface Props {
    src: string,
    text: string,
    onClick: Function,
}

const ProfileHeader: FunctionComponent<Props> = ({ src, text, onClick }) => {
    return (
        <Button onClick={() => onClick()}>
            <ImageBox size={24}>
                <ProfileImage src={src} size={24} />
            </ImageBox>
            <TextBox>
                <SubTitleText text={text} ellipsis={true} fontSize={12} fontWeight={'bold'} />
            </TextBox>
        </Button>
    );
}

export default ProfileHeader;
