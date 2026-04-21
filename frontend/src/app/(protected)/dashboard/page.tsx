'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { recentPayments, notifications, userProfile } from "@/lib/data";
import { ArrowRight, Bell, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from 'react';
import {getUserProfile, UserProfile} from "@/lib/auth";

export default function DashboardPage() {
    const loanProgress = 65;

    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        setProfile(getUserProfile());
    }, []);

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-headline font-bold tracking-tight">Welcome Back, {profile?.profile?.first_name ?? 'Guest'}!</h1>
                <p className="text-muted-foreground">Here's a summary of your lending activity.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Current Loan</span>
                            <Badge variant="secondary">Active</Badge>
                        </CardTitle>
                        <CardDescription>Auto Loan - #LN789123</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Paid Off</span>
                                <span>$16,250 / $25,000</span>
                            </div>
                            <Progress value={loanProgress} aria-label={`${loanProgress}% of loan paid off`} />
                        </div>
                        <div className="flex justify-between">
                            <div className="text-sm">
                                <p className="text-muted-foreground">Next Payment</p>
                                <p className="font-medium">$550.00</p>
                            </div>
                            <div className="text-sm text-right">
                                <p className="text-muted-foreground">Due Date</p>
                                <p className="font-medium">July 1, 2024</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="sm">Make a Payment</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="text-primary" />
                            <span>Payment History</span>
                        </CardTitle>
                        <CardDescription>Your most recent transactions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentPayments.slice(0, 4).map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell>{payment.date}</TableCell>
                                        <TableCell className="text-right font-medium">${payment.amount.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="text-primary" />
                            <span>Notifications</span>
                        </CardTitle>
                        <CardDescription>Recent updates and reminders.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {notifications.map((notification) => (
                            <div key={notification.id} className="flex items-start gap-3">
                                <div className="mt-1 flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                                    <p className="flex items-center text-xs text-muted-foreground"><Clock className="mr-1 h-3 w-3" /> {notification.date}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Need a new loan?</CardTitle>
                    <CardDescription>Explore our other loan products tailored for you.</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button asChild>
                        <Link href="/products">Browse Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </CardFooter>
            </Card>

        </div>
    );
}
