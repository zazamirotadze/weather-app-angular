import { Language, SupportedLanguages } from "../types/weather.types";

const languages: Language[] = [
    { name: 'en', label: 'English', iconUrl: 'flags/en.svg' },
    { name: 'ka', label: 'ქართული', iconUrl: 'flags/ge.svg' }
]

const SUPPORTED_LANGUAGES: SupportedLanguages[] = ['ka', 'en'];

export { languages, SUPPORTED_LANGUAGES };