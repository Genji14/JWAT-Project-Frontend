import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { DARK_THEME, LIGHT_THEME } from '@/lib/constants/SettingSystem'

const ModeToggle = () => {
    const { theme, setTheme } = useTheme()

    return (
        <>
            {theme === LIGHT_THEME ? (
                <Button
                    variant={'ghost'}
                    onClick={() => {
                        setTheme(DARK_THEME)
                    }}
                    className='p-2.5'
                >
                    <Sun size={20} />
                </Button>
            ) : (
                <Button
                    variant={'ghost'}
                    onClick={() => {
                        setTheme(LIGHT_THEME)
                    }}
                    className='p-2.5'
                >
                    <Moon size={20} />
                </Button>
            )}
        </>
    )
}

export default ModeToggle
