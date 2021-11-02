import React from 'react';
import Indicator from './index';



export default {
    title: 'Atoms/Indicator',
    component: Indicator,
};


export const Default = () => {
    return (
        <Indicator
            type={true}
        />
    );
};

export const Offline = () => {
    return (
        <Indicator
            type={false}
        />
    );
}

export const BigButton = () => {
    return (
        <Indicator
            type={false}
            width={"30px"}
            height={"30px"}
        />
    );
}
