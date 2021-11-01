import HeaderText from '../../components/atoms/text/header';

export default {
    Component: HeaderText,
    title: 'TextHeader'
}

export const normal = () => {
    return (
        <HeaderText text='안녕, world!' />
    );
};

export const color = () => {
    return (
        <HeaderText text='안녕, world!' color='red' />
    );
};

export const example = () => {
    return (
        <>
            <HeaderText text="Questions"/>
            <HeaderText text="질문 페이지"/>
            <HeaderText text="Ajax returns 404 error in Laravel 8 but the route exists" />
        </>
    );
};
