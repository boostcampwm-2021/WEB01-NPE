import React from 'react';
import ProfileSummary from "./index";

export default {
    title: 'Molecules/ProfileSummary',
    component: ProfileSummary,
};

export const Default = () => {
    return (
        <ProfileSummary
            src={'https://avatars.githubusercontent.com/u/67536413'}
            name={'hwangwoojin'}
            rank={'master'}
        />
    );
};

export const LongId = () => {
    return (
        <ProfileSummary
            src={'https://avatars.githubusercontent.com/u/67536413'}
            name={'longnicknamehwangwoojin'}
            rank={'platinum'}
        />
    );
};

export const ShortId = () => {
    return (
        <ProfileSummary
            src={'https://avatars.githubusercontent.com/u/67536413'}
            name={'ab'}
            rank={'platinum'}
        />
    );
};