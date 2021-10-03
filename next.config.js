/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['openweathermap.org'],
  },
  i18n: {
    locales: ['en-US', 'ru-RU', 'fr-FR'],
    defaultLocale: 'ru-RU',
  },
}
