import StyledCard from '@/components/general/StyledCard';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useExpandedStore } from '@/hooks/zustand';
import { createUserSchema } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { Gender, UserRole } from '@/types/enums';
import { ICreateUserForm } from '@/types/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';

const CreateUserForm = () => {

    const expanded = useExpandedStore(state => state.expanded);
    const createForm = useForm<ICreateUserForm>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            email: "",
            gender: Gender.OTHER,
            dob: new Date(),
            address: "",
            username: "",
            password: "",
            roles: UserRole.EMPLOYEE,
        }
    })

    async function onSubmit(values: ICreateUserForm) {
        console.log(values);
    }

    return (
        <StyledCard className={cn("w-full mt-8 p-10 mx-auto transition-all", !expanded && "w-[calc(100%-24rem)]")}>
            <Form {...createForm}>
                <form onSubmit={createForm.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
                    <FormField
                        control={createForm.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel className="text-base font-semibold text-foreground">Full Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Employee's name..." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={createForm.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem className="col-span-2" >
                                <FormLabel className="text-base font-semibold text-foreground">Address</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Type employee's address..." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={createForm.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold text-foreground">Gender</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select gender..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={Gender.MALE}>Male</SelectItem>
                                            <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                                            <SelectItem value={Gender.OTHER}>Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={createForm.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel className="text-base font-semibold text-foreground">Date Of Birth</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={"outline"} className={cn("w-full text-left font-normal", !field.value && "text-muted-foreground")}>
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Chọn ngày sinh</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0" align="end">
                                            <Calendar
                                                mode="single"
                                                captionLayout="dropdown-buttons"
                                                fromYear={1960}
                                                toYear={2030}
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
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
                        control={createForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel className="text-base font-semibold text-foreground">Phone Number</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Type phone number..." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={createForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel className="text-base font-semibold text-foreground">Employee Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="example@gmail.com" />
                                </FormControl>
                                <FormDescription>Created employee will receive the account, make sure it's correct.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={createForm.control}
                        name="roles"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold text-foreground">Role</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select role..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={UserRole.EMPLOYEE}>Employee</SelectItem>
                                            <SelectItem value={UserRole.MANAGER}>Manager</SelectItem>
                                            <SelectItem value={UserRole.ADMIN}>Administrator</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>Depend on role, user can access their features.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={createForm.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel className="text-base font-semibold text-foreground">Username</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Type username..." />
                                </FormControl>
                                <FormDescription>Username is unique.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={createForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel className="text-base font-semibold text-foreground">Password</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="*******" type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='mt-6 col-start-3'>Complete Create</Button>
                </form>
            </Form>
        </StyledCard>
    )
}

export default CreateUserForm;
