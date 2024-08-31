import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            header: {
                title: 'Tic-Tac-Toe 3D'
            },
            controls: {
                newGame: 'New game',
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
            github: 'Github repository'
        }
    },
    sk: {
        translation: {
            header: {
                title: 'Piškôrky 3D'
            },
            controls: {
                newGame: 'Nová hra',
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
            github: 'Github repozitár'
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
