import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Password mismatch':'Password mismatch',
                'Username':'Username',
                'Display Name': 'Display Name',
                'Password': 'Password',
                'Password Repeat': 'Password Repeat',
                'Login': 'Login',
                'Logout': 'Logout',
                'Users': 'Users',
                'Next': 'next >',
                'Previous': '< previous',
                'Load Failure': 'Load Failure',
                'User Not Found!': 'User Not Found!',
                'Edit': 'Edit',
                'Change Display Name': 'Change Display Name',
                'Save': 'Save',
                'Cancel': 'Cancel',
                'My Profile': 'My Profile',
                'There are no hoaxes': 'There are no hoaxes',
                'Load old hoaxes': 'Load old hoaxes'
            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Password mismatch': 'Şifre Uyuşmuyor',
                'Username': 'Kullanıcı Adı',
                'Display Name': 'Tercih Edilen İsim',
                'Password': 'Şifre',
                'Password Repeat': 'Şifre Tekrarı',
                'Login': 'Giriş Yap',
                'Logout': 'Çıkış Yap',
                'Users': 'Kullanıcılar',
                'Next': 'sonraki >',
                'Previous': '< önceki',
                'Load Failure': 'Liste Yüklenemedi',
                'User Not Found!': 'Kullanıcı Bulunamadı!',
                'Edit': 'Düzenle',
                'Change Display Name': 'Tercih Edilen İsminizi Değiştirin',
                'Save': 'Kaydet',
                'Cancel': 'İptal Et',
                'My Profile': 'Profilim',
                'There are no hoaxes': 'Hoax bulunamadı',
                'Load old hoaxes': 'Eski Hoaxları getir'
            }
        }
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
})

export default i18n;