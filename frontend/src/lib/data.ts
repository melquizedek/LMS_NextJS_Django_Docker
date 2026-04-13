import { type LucideIcon, Home, Briefcase, Car, FileText, User, Shield, Calculator, FolderOpen } from 'lucide-react';

export type NavLink = {
    href: string;
    label: string;
    icon: LucideIcon;
};

export const navLinks: NavLink[] = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/products', label: 'Loan Products', icon: Briefcase },
    { href: '/calculator', label: 'Calculator', icon: Calculator },
    { href: '/apply', label: 'Apply for Loan', icon: FileText },
    { href: '/loan-applications', label: 'My Loan Applications', icon: FolderOpen },
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/admin/generate-schedule', label: 'Admin Tool', icon: Shield },
];

export const loanProducts = [
    {
        id: 'prod_mortgage',
        name: 'Home Mortgage',
        description: 'Competitive rates for purchasing or refinancing your dream home. Our experts guide you every step of the way.',
        image: {
            url: 'https://picsum.photos/seed/loan1/600/400',
            hint: 'house key',
            id: 'loan-mortgage'
        },
        icon: Home,
    },
    {
        id: 'prod_personal',
        name: 'Personal Loan',
        description: 'Flexible personal loans for your unique needs, from debt consolidation to major purchases.',
        image: {
            url: 'https://picsum.photos/seed/loan3/600/400',
            hint: 'personal finances',
            id: 'loan-personal'
        },
        icon: Briefcase,
    },
    {
        id: 'prod_auto',
        name: 'Auto Loan',
        description: 'Get on the road faster with our quick and easy auto financing solutions for new or used cars.',
        image: {
            url: 'https://picsum.photos/seed/loan2/600/400',
            hint: 'car dashboard',
            id: 'loan-auto'
        },
        icon: Car,
    },
];

export const recentPayments = [
    {
        id: 'PAY-001',
        date: '2024-06-01',
        amount: 550.00,
        status: 'Completed',
    },
    {
        id: 'PAY-002',
        date: '2024-05-01',
        amount: 550.00,
        status: 'Completed',
    },
    {
        id: 'PAY-003',
        date: '2024-04-01',
        amount: 550.00,
        status: 'Completed',
    },
    {
        id: 'PAY-004',
        date: '2024-03-01',
        amount: 550.00,
        status: 'Completed',
    },
];

export const notifications = [
    {
        id: 'notif-1',
        title: 'Payment Reminder',
        description: 'Your next payment of $550.00 is due on July 1, 2024.',
        date: '3 days ago',
    },
    {
        id: 'notif-2',
        title: 'Payment Successful',
        description: 'Your payment of $550.00 for June was successfully processed.',
        date: '27 days ago',
    },
    {
        id: 'notif-3',
        title: 'Application Approved',
        description: 'Congratulations! Your auto loan application has been approved.',
        date: '2 months ago',
    }
];

export const userProfile = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA 12345',
    employment: 'Software Engineer at TechCorp',
    memberSince: '2023-01-15'
};
