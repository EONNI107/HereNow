import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      colors: {
        blue0: '#DBEEFF',
        blue4: '#118DFF',
        orange0: '#FFF4F0',
        orange1: '#FED1BE',
        orange3: '#FD8B59',
        orange5: '#EC4A03',
        gray0: '#F9FAFA',
        gray3: '#C2C6CB',
        gray8: '#7D8591',
        gray12: '#4D535B',
        gray14: '#35393F',
        white: '#FFFFFF',
        main: '#212125',
        sub1: '#505050',
        sub2: '#767676',
        disabled: '#999999',
      },
    },
  },
  plugins: [],
};
export default config;
