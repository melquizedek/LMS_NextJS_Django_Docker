'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { countries } from '@/lib/countries';

const signupSchema = z
    .object({
        firstName: z.string().min(1, { message: 'First name is required.' }),
        middleName: z.string().min(1, { message: 'Middle name is required.' }),
        lastName: z.string().min(1, { message: 'Last name is required.' }),
        email: z.string().email({ message: 'Please enter a valid email address.' }),
        countryCode: z.string({ required_error: 'Please select a country.' }),
        mobileNumber: z.string().min(1, { message: 'Mobile number is required.' }).max(15, { message: 'Mobile number cannot be more than 15 digits.' }).regex(/^\d+$/, { message: 'Mobile number must contain only digits.'}),
        birthMonth: z.string({ required_error: 'Please select a month.' }),
        birthDay: z.string({ required_error: 'Please select a day.' }),
        birthYear: z.string({ required_error: 'Please select a year.' }),
        password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match.",
        path: ['confirmPassword'],
    }).refine(
        (data) => {
            const { birthYear, birthMonth, birthDay } = data;
            if (!birthYear || !birthMonth || !birthDay) {
                return false;
            }
            const year = parseInt(birthYear, 10);
            const month = parseInt(birthMonth, 10);
            const day = parseInt(birthDay, 10);
            const date = new Date(year, month - 1, day);
            return (
                date.getFullYear() === year &&
                date.getMonth() === month - 1 &&
                date.getDate() === day &&
                date < new Date() &&
                date > new Date('1900-01-01')
            );
        },
        {
            message: 'Please enter a valid date of birth.',
            path: ['birthDay'],
        }
    );

type SignupFormValues = z.infer<typeof signupSchema>;

const months = Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: new Date(0, i).toLocaleString('default', { month: 'long' }) }));
const years = Array.from({ length: 120 }, (_, i) => String(new Date().getFullYear() - i));
const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

export default function SignupPage() {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        mode: 'onChange',
        defaultValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            countryCode: undefined,
            mobileNumber: '',
        },
    });

    async function onSubmit(data: SignupFormValues) {
        const dateOfBirth = `${data.birthYear}-${String(data.birthMonth).padStart(2, '0')}-${String(data.birthDay).padStart(2, '0')}`;
        const selectedCountry = countries.find((country) => country.code === data.countryCode);
        const dialCode = selectedCountry?.dial_code ?? '';
        const mobilePhoneNumber = `${dialCode}${data.mobileNumber}`;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: data.firstName,
                    middle_name: data.middleName,
                    last_name: data.lastName,
                    email: data.email,
                    phone_number: mobilePhoneNumber,
                    date_of_birth: dateOfBirth,
                    password: data.password,
                    password_confirm: data.confirmPassword,
                }),
            });

            if (response.ok) {
                toast({
                    title: 'Account Created!',
                    description: 'Your account has been successfully created.',
                });
                router.push('/login');
            } else {
                const errorData = await response.json().catch(() => null);
                let errorMessage = 'An error occurred during signup. Please try again.';

                if (errorData) {
                    if (errorData.detail) {
                        errorMessage = errorData.detail;
                    } else {
                        const fieldErrors = Object.values(errorData).flat();
                        if (fieldErrors.length > 0 && typeof fieldErrors[0] === 'string') {
                            errorMessage = fieldErrors.join(' ');
                        }
                    }
                }

                toast({
                    title: 'Signup Failed',
                    description: errorMessage,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast({
                title: 'Signup Failed',
                description: 'Could not connect to the server. Please try again later.',
                variant: 'destructive',
            });
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-2xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold font-headline">Create an Account</CardTitle>
                            <CardDescription>Enter your details below to get started with LendFlow.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="middleName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Middle Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Michael" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="m@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-2">
                                <FormLabel>Mobile Phone Number</FormLabel>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[180px_1fr]">
                                    <FormField
                                        control={form.control}
                                        name="countryCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Country" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {countries.map((country) => (
                                                            <SelectItem key={country.code} value={country.code}>
                                                                {country.name} ({country.dial_code})
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="mobileNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="tel" maxLength={15} placeholder="Mobile Number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>


                            <div className="space-y-2">
                                <FormLabel>Date of birth</FormLabel>
                                <div className="grid grid-cols-3 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="birthMonth"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Month" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {months.map((month) => (
                                                            <SelectItem key={month.value} value={month.value}>
                                                                {month.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="birthDay"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Day" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {days.map((day) => (
                                                            <SelectItem key={day} value={day}>
                                                                {day}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="birthYear"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Year" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {years.map((year) => (
                                                            <SelectItem key={year} value={year}>
                                                                {year}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>


                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="********" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Re-type Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="********" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <Link href="/login" className="underline hover:text-primary">
                                    Log in
                                </Link>
                            </p>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? (
                                    'Creating Account...'
                                ) : (
                                    <>
                                        <UserPlus className="mr-2" /> Create Account
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
