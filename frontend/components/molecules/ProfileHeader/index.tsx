import React, { FunctionComponent } from "react"
import { Button, ImageBox, TextBox } from './styled'
import Image from '../../atoms/Image'
import Text from '../../atoms/Text'

interface Props {
    src: string,
    text: string,
    onClick: Function,
}

const ProfileHeader: FunctionComponent<Props> = ({ src, text, onClick }) => {
    return (
        <Button onClick={() => onClick()}>
            <ImageBox size={24}>
                <Image src={src} width={24} height={24} />
            </ImageBox>
            <TextBox>
                <Text text={text} ellipsis={true} fontSize={12} fontWeight={'bold'} />
            </TextBox>
        </Button>
    );
}

export default ProfileHeader;
