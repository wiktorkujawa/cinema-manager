import { useColorMode, Switch, Center } from '@chakra-ui/react'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Center>
    <Switch
      color="green"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
    </Center>
  )
}
