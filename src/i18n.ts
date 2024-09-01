import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            header: {
                title: 'Tic-Tac-Toe 3D'
            },
            controls: {
                restart: 'Restart game',
                start: 'Start game',
                playgroundDimension: 'Playground dimension from {{from}} to {{to}}',
                firstPlayer: 'First player',
                cpu: 'CPU',
                person: 'Person',
                activePlayer: 'Active player',
                working: 'Working ...',
                language: 'Language',
                en: 'English',
                sk: 'Slovenčina'
            },
            result: {
                winner: 'Winner',
                confirm: 'Ok'
            },
            github: 'Github repository',
            openMenu: 'Open menu',
            closeMenu: 'Close menu'
        }
    },
    sk: {
        translation: {
            header: {
                title: 'Piškvorky 3D'
            },
            controls: {
                restart: 'Reštartovať hru',
                start: 'Začať hru',
                playgroundDimension: 'Rozmer hracej plochy od {{from}} do {{to}}',
                firstPlayer: 'Začínajúci hráč',
                cpu: 'Počítač',
                person: 'Osoba',
                activePlayer: 'Hráč na ťahu',
                working: 'Pracujem ...',
                language: 'Jazyk',
                en: 'English',
                sk: 'Slovenčina'
            },
            result: {
                winner: 'Víťaz',
                confirm: 'Ok'
            },
            github: 'Github repozitár',
            openMenu: 'Otvoriť menu',
            closeMenu: 'Zatvoriť menu'
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'sk',
    interpolation: {
        escapeValue: false
    },
    supportedLngs: ['en', 'sk']
});

export default i18n;
