import SubTitleText from '../../components/atoms/text/subTitle';

export default {
    Component: SubTitleText,
    title: 'TextSubTitle'
}

export const normal = () => {
    return (
        <SubTitleText text='안녕, world!' />
    );
};

export const color = () => {
    return (
        <SubTitleText text='안녕, world!' color='red' />
    );
};

export const example = () => {
    return (
        <>
            <SubTitleText text="조회수" />
            <SubTitleText text="&nbsp;3" color='grey' />
            <SubTitleText text="&nbsp;작성일" />
            <SubTitleText text="&nbsp;2021-10-10" color='grey' />
        </>
    );
};
