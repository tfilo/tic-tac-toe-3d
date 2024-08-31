import React from 'react';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
    const { t } = useTranslation();

    return (
        <header className='text-center p-4'>
            <h1 className='text-3xl font-bold'>{t('header.title')}</h1>
        </header>
    );
};

export default Header;
