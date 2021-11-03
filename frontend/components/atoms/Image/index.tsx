import type { NextPage } from 'next'
import Image from 'next/image'

interface Props {
    src: string,
    width: number,
    height: number,
    alt?: string,
}

const image: NextPage<Props> = ({ src, width, height, alt }) => {
    return (
        <Image
            loader={() => src}
            src={src}
            width={width}
            height={height}
            alt={alt || 'Profile image'}
            objectFit={'contain'}
         />
    );
}

export default image
