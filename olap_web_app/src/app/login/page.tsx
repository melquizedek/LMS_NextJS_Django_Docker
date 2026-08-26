'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Landmark, LogIn, AlertCircle, Eye, EyeOff } from "lucide-react";
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
        const baseUrl = process.env.NEXT_PUBLIC_API_HOST || window.location.origin;
        const response = await fetch(`${baseUrl}/api/auth/login/`, {
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

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex min-h-screen">
            {/* Left Column - Image Section */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#004d4d]/50 via-[#006666]/45 to-[#008080]/40"></div>
                <div className="relative z-10 text-center max-w-lg backdrop-blur-0 bg-black/20 rounded-2xl p-8">
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
                            <Landmark className="w-14 h-14 text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-extrabold text-gray-100 mb-6 tracking-tight">
                        ZedLendingCorp
                    </h1>
                    <p className="text-xl text-gray-200 leading-relaxed font-body">
                        Your trusted partner in financial growth. Secure lending solutions tailored to your needs.
                    </p>
                    <div className="mt-12 grid grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-100 mb-2">10K+</div>
                            <div className="text-gray-300 text-sm">Happy Clients</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-100 mb-2">$50M+</div>
                            <div className="text-gray-300 text-sm">Loans Approved</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-100 mb-2">98%</div>
                            <div className="text-gray-300 text-sm">Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Form Section */}
            <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#006666]">
                                <Landmark className="h-7 w-7 text-white" />
                            </div>
                            <span className="text-2xl font-extrabold text-[#333333] tracking-tight">ZedLendingCorp</span>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-[#333333] mb-2">Log In</h2>
                        <p className="text-gray-600">Enter your email and password to log in to your dashboard.</p>
                    </div>

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

                            {/* Email Field */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="email" 
                                                placeholder="Enter your email" 
                                                className="h-12 border-gray-300 focus:border-[#006666] focus:ring-[#006666]"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password Field */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                                            <Link href="#" className="text-sm text-[#006666] hover:text-[#004d4d] font-medium">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <div className="relative">
                                                <Input 
                                                    type={showPassword ? "text" : "password"} 
                                                    placeholder="Enter your Password" 
                                                    className="h-12 border-gray-300 focus:border-[#006666] focus:ring-[#006666] pr-12"
                                                    {...field} 
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Sign In Button */}
                            <Button 
                                type="submit" 
                                className="w-full h-12 bg-[#006666] hover:bg-[#004d4d] text-white font-medium"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? 'Logging in...' : 'Sign In'}
                            </Button>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <span className="text-gray-600">Don't have an account? </span>
                                <Link href="/signup" className="text-[#006666] hover:text-[#004d4d] font-medium">
                                    Sign Up
                                </Link>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
