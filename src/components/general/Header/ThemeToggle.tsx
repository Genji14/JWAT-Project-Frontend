import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import Hydration from '../../shared/Hydration'
import { DARK_THEME, LIGHT_THEME } from '@/lib/constants/SettingSystem'

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Hydration>
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
        </Hydration>
    )
}
