import type { NextPage } from 'next'
import Image from 'next/image'

interface profileProps {
    src: string,
    size: number,
    alt?: string,
}

const profile: NextPage<profileProps> = ({ src, size, alt }) => {
    return (
        <Image
            loader={() => src}
            src={src}
            alt={alt || 'Profile image'}
            width={size}
            height={size}
        />
    );
}

export default profile
