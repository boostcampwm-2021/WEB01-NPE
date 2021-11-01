import type { NextPage } from 'next'
import { profileProps } from './profileInterface'
import Image from 'next/image'

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
