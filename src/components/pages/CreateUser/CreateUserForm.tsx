import { LoaderButton } from '@/components/shared/LoaderButton'
import StyledCard from '@/components/shared/StyledCard'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useCreateUser } from '@/hooks/mutation'
import { useExpandedStore } from '@/hooks/zustand'
import { createUserSchema } from '@/lib/schemas'
import { USER_RESPONSE_MESSAGE } from '@/lib/constants/RequestMessage'
import { cn } from '@/lib/utils'
import { Gender, UserRole } from '@/types/enums'
import { ICreateUserForm } from '@/types/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { HttpStatusCode } from 'axios'

const CreateUserForm = () => {
    const { mutateCreateUser, isPendingCreateUser, isSuccessCreateUser } =
        useCreateUser()
    const expanded = useExpandedStore((state) => state.expanded)

    const createUserForm = useForm<ICreateUserForm>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            gender: Gender.OTHER,
            dob: new Date(),
            address: '',
            username: '',
            password: '',
            role: UserRole.EMPLOYEE,
        },
    })

    async function onSubmit(values: ICreateUserForm) {
        await mutateCreateUser(values).catch((ex) => {
            if (ex.response.status === HttpStatusCode.Conflict) {
                createUserForm.setError('username', {
                    message: USER_RESPONSE_MESSAGE.CREATE.CONFLICT,
                })
            } else if (ex.response.status !== 419) {
                toast.error(USER_RESPONSE_MESSAGE.CREATE.BAD_REQUEST)
            }
        })
    }

    useEffect(() => {
        if (isSuccessCreateUser) {
            createUserForm.reset()
            toast.success(USER_RESPONSE_MESSAGE.CREATE.SUCCESS)
        }
    }, [isSuccessCreateUser])

    return (
        <StyledCard
            className={cn(
                'mx-auto mt-4 w-full p-4 transition-all xl:mt-8 xl:p-10',
                !expanded && 'xl:w-[calc(100%-15.5rem)]'
            )}
        >
            <Form {...createUserForm}>
                <form
                    onSubmit={createUserForm.handleSubmit(onSubmit)}
                    className='space-y-4 xl:grid xl:grid-cols-3 xl:gap-4 xl:space-y-0'
                >
                    <FormField
                        control={createUserForm.control}
                        name='fullName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base font-semibold text-foreground'>
                                    Full Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Employee's name..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={createUserForm.control}
                        name='address'
                        render={({ field }) => (
                            <FormItem className='xl:col-span-2'>
                                <FormLabel className='text-base font-semibold text-foreground'>
                                    Address
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Type employee's address..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={createUserForm.control}
                        name='phoneNumber'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base font-semibold text-foreground'>
                                    Phone Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Type phone number...'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={createUserForm.control}
                        name='gender'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base font-semibold text-foreground'>
                                    Gender
                                </FormLabel>
                                <FormControl>
                                    <Select
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

                    <FormField
                        control={createUserForm.control}
                        name='dob'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base font-semibold text-foreground'>
                                    Date Of Birth
                                </FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-full text-left font-normal',
                                                        !field.value &&
                                                        'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            'PPP'
                                                        )
                                                    ) : (
                                                        <span>
                                                            Chọn ngày sinh
                                                        </span>
                                                    )}
                                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className='w-full p-0'
                                            align='end'
                                        >
                                            <Calendar
                                                mode='single'
                                                captionLayout='dropdown-buttons'
                                                fromYear={1960}
                                                toYear={2030}
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() ||
                                                    date <
                                                    new Date('1900-01-01')
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={createUserForm.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className='xl:col-span-3'>
                                <FormLabel className='text-base font-semibold text-foreground'>
                                    Employee Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='example@gmail.com'
                                    />
                                </FormControl>
                                <FormDescription>
                                    Created employee will receive the account,
                                    make sure it's correct.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={createUserForm.control}
                        name='role'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base font-semibold text-foreground'>
                                    Role
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select role...' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem
                                                value={UserRole.EMPLOYEE}
                                            >
                                                Employee
                                            </SelectItem>
                                            <SelectItem
                                                value={UserRole.MANAGER}
                                            >
                                                Manager
                                            </SelectItem>
                                            <SelectItem value={UserRole.ADMIN}>
                                                Administrator
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription className='hidden xl:block'>
                                    Depend on role, user can access their
                                    features.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={createUserForm.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base font-semibold text-foreground'>
                                    Username
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Type username...'
                                    />
                                </FormControl>
                                <FormDescription className='hidden xl:block'>
                                    Username is unique.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={createUserForm.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base font-semibold text-foreground'>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='*******'
                                        type='password'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <LoaderButton
                        isLoading={isPendingCreateUser}
                        type='submit'
                        className='col-start-3 mt-6 w-full'
                    >
                        Create
                    </LoaderButton>
                </form>
            </Form>
        </StyledCard>
    )
}

export default CreateUserForm
