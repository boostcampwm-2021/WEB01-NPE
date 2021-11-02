import ProfileImage from './index'

export default {
    Component: ProfileImage,
    title: 'Atoms/ProfileImage'
}

export const normal = () => {
    return (
        <ProfileImage src={'https://avatars.githubusercontent.com/u/50866506?v=4'} size={24} />
    );
};

export const large = () => {
    return (
        <ProfileImage src={'https://avatars.githubusercontent.com/u/50866506?v=4'} size={48} />
    );
};
