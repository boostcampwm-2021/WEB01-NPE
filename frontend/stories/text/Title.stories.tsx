import TitleText from '../../components/atoms/text/title';

export default {
    Component: TitleText,
    title: 'TextTitle'
}

export const normal = () => {
    return (
        <TitleText text='안녕, world!' />
    );
};

export const color = () => {
    return (
        <TitleText text='안녕, world!' color='red' />
    );
};

export const example = () => {
    return (
        <>
            <TitleText text="Ajax returns 404 error in Laravel 8 but the route exists" />
            <TitleText text="Prevent line-break of span element [duplicate]" />
            <TitleText text="Map aggregate query result to correct attributes of POJO" />
        </>
    );
}
