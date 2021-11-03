import React, { FunctionComponent } from "react";
import { Button, ImageBox, TextBox } from './styled';
import Image from '../../atoms/Image'
import Text from '../../atoms/Text'

interface Props {
    src: string;
    name: string;
    rank: string;
}

const ProfileSummary : FunctionComponent<Props> = ({ src, name, rank }) => {
    return (
        <Button>
            <ImageBox size={48}>
                <Image src={src} width={48} height={48} />
            </ImageBox>
            <TextBox>
                <Text text={name} ellipsis={true} fontSize={10} fontWeight={'bold'} />
                <Text text={rank} fontSize={10} />
            </TextBox>
        </Button>
    );
}

export default ProfileSummary;
