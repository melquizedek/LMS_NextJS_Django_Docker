'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, User, LogOut, Settings } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { notifications } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clearSession, getUserProfile, getUserDisplayName, type UserProfile } from '@/lib/auth';

export function UserNav() {
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        setProfile(getUserProfile());
    }, []);

    const displayName = profile ? getUserDisplayName(profile) : '';
    const email = profile?.email ?? '';

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('');
    }

    const handleLogout = () => {
        clearSession();
        router.push('/login');
    };

    return (
        <div className="flex items-center gap-4">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        {notifications.length > 0 && (
                            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                        )}
                        <span className="sr-only">Notifications</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Notifications</h4>
                            <p className="text-sm text-muted-foreground">
                                You have {notifications.length} new messages.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            {notifications.map((notification) => (
                                <div key={notification.id} className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium">{notification.title}</p>
                                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                                        <p className="text-xs text-muted-foreground">{notification.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" alt={displayName} data-ai-hint="person portrait" />
                            <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{displayName}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Link href="/profile"><User className="mr-2"/>Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2"/>
                            Settings
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2"/>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
