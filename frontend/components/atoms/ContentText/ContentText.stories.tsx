import ContentText from '.';

export default {
    Component: ContentText,
    title: 'Atoms/ContentText'
}

export const normal = () => {
    return (
        <ContentText text='안녕, world!' />
    );
};

export const color = () => {
    return (
        <ContentText text='안녕, world!' color='red' />
    );
};

export const example = () => {
    return (
        <>
            <ContentText text="I am implementing JQuery Select2() in my form. When I try to search, my ajax always returns 404 error. But the route exists in the web.php file." />
            <ContentText text="Here is my code." />
        </>
    )
}
