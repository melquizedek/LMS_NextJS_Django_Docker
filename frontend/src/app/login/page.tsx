'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Landmark, LogIn, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { setSession, type AuthSession } from '@/lib/auth';
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const [loginError, setLoginError] = useState<string | null>(null);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLogin = async (values: LoginFormValues) => {
        // TODO: Implement actual login logic with the validated values
        console.log("handleLogin:", values);
        const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();
        // console.log("Login response:", data);
        if (response.ok && response.status === 200) {
            setSession(data as AuthSession);
            router.push('/dashboard');
        } else {
            setLoginError(data.detail || "Invalid email or password. Please try again.");
            form.setValue('password', '');
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-4 text-center">
                    <div className="inline-flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                            <Landmark className="h-8 w-8 text-primary-foreground" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold font-headline">Welcome Back</CardTitle>
                    <CardDescription>Enter your credentials to access your LendFlow account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
                            {loginError && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Login Failed</AlertTitle>
                                    <AlertDescription>
                                        {loginError}
                                    </AlertDescription>
                                </Alert>
                            )}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="m@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center">
                                            <FormLabel>Password</FormLabel>
                                            <Link href="#" className="ml-auto inline-block text-sm underline">
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? 'Logging in...' : <><LogIn className="mr-2" /> Log In</>}
                            </Button>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/signup">
                                    Sign up for an account
                                </Link>
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
