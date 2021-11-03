import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @font-face {
        font-family: 'NotoSansKR';
        url('./NotoSansKR/noto-sans-kr-v21-latin_korean-regular.wott') format('woff'),
        url('./NotoSansKR/noto-sans-kr-v21-latin_korean-regular.wott') format('woff2');
        font-weight: regular;
        font-style: normal;
    }

    @font-face {
        font-family: 'NotoSansKR';
        url('./NotoSansKR/noto-sans-kr-v21-latin_korean-bold.wott') format('woff'),
        url('./NotoSansKR/noto-sans-kr-v21-latin_korean-bold.wott2') format('woff2');
        font-weight: bold;
        font-style: normal;
    }
`;
