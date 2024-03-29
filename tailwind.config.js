/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-muni': '#f5333f',
        'red-muni-100': '#f47a86',
        'red-muni-200': '#f4727e',
        'red-muni-300': '#f46a76',
        'red-muni-400': '#f4626e',
        'red-muni-500': '#f45b67',
        'red-muni-600': '#f4535f',
        'red-muni-700': '#f54b57',
        'red-muni-800': '#f5434f',
        'red-muni-900': '#f53b47',
        'lime-muni': '#97d700',
        'lime-muni-100': '#cbf25f',
        'lime-muni-200': '#c5ef54',
        'lime-muni-300': '#bfec4a',
        'lime-muni-400': '#bae93f',
        'lime-muni-500': '#b4e635',
        'lime-muni-600': '#aee32a',
        'lime-muni-700': '#a8e020',
        'lime-muni-800': '#a3dd15',
        'lime-muni-900': '#9dda0b',
        'yellow-muni': '#ffce00',
        'yellow-muni-100': '#fff1c5',
        'yellow-muni-200': '#ffedaf',
        'yellow-muni-300': '#ffe999',
        'yellow-muni-400': '#ffe583',
        'yellow-muni-500': '#ffe16d',
        'yellow-muni-600': '#ffde58',
        'yellow-muni-700': '#ffda42',
        'yellow-muni-800': '#ffd62c',
        'yellow-muni-900': '#ffd216',
        'orange-muni': '#ff9100',
        'orange-muni-100': '#fcddb9',
        'orange-muni-200': '#fcd5a4',
        'orange-muni-300': '#fdcc90',
        'orange-muni-400': '#fdc47b',
        'orange-muni-500': '#fdbb67',
        'orange-muni-600': '#feb352',
        'orange-muni-700': '#feaa3e',
        'orange-muni-800': '#fea229',
        'orange-muni-900': '#ff9915',
        'green-muni': '#00bc70',
        'green-muni-100': '#6fe2b0',
        'green-muni-200': '#63dea9',
        'green-muni-300': '#56daa2',
        'green-muni-400': '#4ad59b',
        'green-muni-500': '#3ed194',
        'green-muni-600': '#31cd8d',
        'green-muni-700': '#25c986',
        'green-muni-800': '#19c47f',
        'green-muni-900': '#0cc077',
        'sky-muni': '#54c8e8',
        'sky-muni-100': '#b7ebf7',
        'sky-muni-200': '#ace7f5',
        'sky-muni-300': '#a1e3f4',
        'sky-muni-400': '#96dff2',
        'sky-muni-500': '#8bdbf0',
        'sky-muni-600': '#80d8ee',
        'sky-muni-700': '#75d4ed',
        'sky-muni-800': '#6ad0eb',
        'sky-muni-900': '#5fcce9',
        'blue-muni': '#1700a5',
        'blue-muni-100': '#92b9ff',
        'blue-muni-200': '#84a4f5',
        'blue-muni-300': '#7790eb',
        'blue-muni-400': '#697be1',
        'blue-muni-500': '#5b67d7',
        'blue-muni-600': '#4e52cd',
        'blue-muni-700': '#403ec3',
        'blue-muni-800': '#3229b9',
        'blue-muni-900': '#2515af'
    }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

