import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Gender } from '@/types/enums'
import { IUpdateUserForm } from '@/types/interfaces/Form'
import React, { FC, PropsWithChildren } from 'react'
import { UseFormReturn } from 'react-hook-form'

type IPersonalFormProps = PropsWithChildren<{
    isPending: boolean
    form: UseFormReturn<IUpdateUserForm, any, undefined>
}>

const PersonalForm: FC<IPersonalFormProps> = ({ isPending, form }) => {
    return (
        <>
            <div className='grid gap-x-4 gap-y-2'>
                <h4 className='mb-2 font-bold uppercase'>
                    Personal Information
                </h4>
                <div className='grid gap-4 xl:grid-cols-2 '>
                    <FormField
                        control={form.control}
                        name='phoneNumber'
                        render={({ field }) => (
                            <FormItem className='space-y-1'>
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        placeholder='Require Vietnam Phone (+84)'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='gender'
                        render={({ field }) => (
                            <FormItem className='space-y-1'>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <Select
                                        disabled={isPending}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select gender...' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={Gender.MALE}>
                                                Male
                                            </SelectItem>
                                            <SelectItem value={Gender.FEMALE}>
                                                Female
                                            </SelectItem>
                                            <SelectItem value={Gender.OTHER}>
                                                Other
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                        <FormItem className='space-y-1'>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    placeholder='Type new Adress ...'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </>
    )
}

export default PersonalForm
