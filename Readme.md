# React Native Expo project preconfigured with Material You, React Native Paper and Prettier

This is a React Native Expo template preconfigured with [NativeWind](https://www.nativewind.dev/), [React Native Paper](https://callstack.github.io/react-native-paper/), and [Prettier](https://prettier.io/). NativeWind NativeWind uses Tailwind CSS as scripting language to create a universal style system for React Native, while React Native Paper is a Cross-platform Material Design for React Native. Prettier is a code formatter that helps ensure consistent code formatting across the project.

_This project is a Tab based starter._

## Installation

1. Clone the repository to your local machine.
2. Install dependencies by running `npm install` or `yarn`.
3. Start the development server by running `npm start` or `yarn start`.

## Project Structure

```
project
├── app
│   ├── (tabs)
│   │   ├── _layout
│   │   ├── index.tsx
│   │   └── two.tsx
│   ├── _layout.tsx
│   ├── [...missing].tsx
│   └── modal.tsx
├── assets
│   ├── fonts
│   └── images
├── components
│   ├── ExternalLink.tsx
│   ├── StyledText.tsx
│   └── Themed.tsx
├── constants
│   └── Colors.tsx
├── .gitignore
├── .prettierignore
├── .prettierrc
├── app.json
├── babel.config.js
├── index.ts
├── nativewind.d.ts
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## Usage

### Tailwinds

Tailwinds comes preconfigured in this template, so no additional configuration needs to be done in order to start using it.

```jsx
import { View, Text } from 'react-native'

const MyComponent = () => {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-2xl font-bold text-center'>Hello World!</Text>
    </View>
  )
}
```

### React Native Paper

To use React Native Paper, import it at the top of the file and use its components as necessary:

```jsx
import { Button } from 'react-native-paper'
import { Alert } from 'react-native'

const MyComponent = () => {
  return (
    <Button mode='contained' onPress={() => Alert.alert('Paper button is working!')}>
      Paper button
    </Button>
  )
}
```

### Prettier

Prettier is preconfigured with this project to format the code on save. You can modify the Prettier configuration by editing the `.prettierrc` file.

## License

This project is licensed under the MIT License.
