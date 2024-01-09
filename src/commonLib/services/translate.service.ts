import { Injectable } from '@angular/core';
import viDictionary from '../../assets/js/localization/vi.json';
import enDictionary from '../../assets/js/localization/en.json';
import { Locale } from 'src/commonLib/constants/types/locale';

const locales: Locale[] = [
    {
        text: 'English',
        icon: '../assets/icons/en.png',
        value: 'en',
    }, {
        text: 'Việt nam',
        icon: '../assets/icons/vi.png',
        value: 'vi',
    }
];

export class Dictionary {
    [key: string]: any;
}

const dictionary: Dictionary = {
    "vi": viDictionary["vi"],
    "en": enDictionary["en"],
}

@Injectable()
export class TranslationService {

    getLocales() {
        return locales;
    }

    getDictionary() {
        return dictionary;
    }

    getCurrentLanguage() {
        const locale = sessionStorage.getItem('locale');
        return locale ?? 'vi'
    }

    setLocale(locale) {
        sessionStorage.setItem('locale', locale);
    }
}
