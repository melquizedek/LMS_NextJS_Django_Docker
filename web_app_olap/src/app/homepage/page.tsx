'use client';

import Link from 'next/link';
import {
    Landmark,
    Calculator,
    Wallet,
    CalendarRange,
    Banknote,
    ShieldCheck,
    Percent,
    CheckCircle2,
    ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const NAV_LINKS = [
    { label: 'Calculator', href: '/calculator' },
    { label: 'How it works', id: 'how-it-works' },
    { label: 'FAQ', id: 'faq' },
];

const STEPS = [
    {
        icon: Wallet,
        title: 'Choose your loan',
        description: 'Pick an amount from ₱30,000 to ₱2,000,000, a repayment term, and a monthly rate that fits your budget.',
    },
    {
        icon: CheckCircle2,
        title: 'Apply in minutes',
        description: 'Submit your application and get a decision on your request without the paperwork hassle.',
    },
    {
        icon: Banknote,
        title: 'Receive your funds',
        description: 'Money is released to you, repaid in fixed monthly installments you knew about from day one.',
    },
] as const;

const FEATURES = [
    {
        icon: Percent,
        title: 'Clear rates',
        description: 'Fixed monthly rates of 2%, 3.5%, or 5% — the rate you see is the rate you get.',
    },
    {
        icon: CalendarRange,
        title: 'Flexible terms',
        description: 'Choose 12, 18, 24, or 36 months to match the way your cash flow actually works.',
    },
    {
        icon: CheckCircle2,
        title: 'Know your cost',
        description: 'See principal, interest, and the full amortization schedule before you commit.',
    },
    {
        icon: ShieldCheck,
        title: 'Borrow with confidence',
        description: 'Transparent terms and a fixed monthly installment — no surprises down the road.',
    },
] as const;

const FAQS = [
    {
        question: 'How much can I borrow?',
        answer: 'You can request between ₱30,000 and ₱2,000,000. Your final approved amount will depend on your profile.',
    },
    {
        question: 'What are the interest rates?',
        answer: 'Monthly rates of 2%, 3.5%, or 5%, depending on the option you choose. Rates are fixed, so your installment stays the same for the whole term.',
    },
    {
        question: 'What repayment terms are available?',
        answer: 'You can repay over 12, 18, 24, or 36 months. Use the calculator to see how different terms change your monthly payment.',
    },
    {
        question: 'How is my monthly payment calculated?',
        answer: 'Each installment covers principal plus interest using a standard amortization schedule. The calculator gives you an instant estimate before you apply.',
    },
    {
        question: 'When will I receive the funds?',
        answer: 'Once your application is approved, funds are released as quickly as possible. Timelines vary from case to case.',
    },
];

export default function Homepage() {
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                    <Link href="/homepage" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                            <Landmark className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                        </div>
                        <span className="font-headline text-xl font-bold">LendFlow</span>
                    </Link>
                    <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex" aria-label="Primary">
                        <Link href="/calculator" className="transition-colors hover:text-foreground">
                            Calculator
                        </Link>
                        <button onClick={() => scrollTo('how-it-works')} className="transition-colors hover:text-foreground">
                            How it works
                        </button>
                        <button onClick={() => scrollTo('faq')} className="transition-colors hover:text-foreground">
                            FAQ
                        </button>
                    </nav>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" asChild className="hidden sm:inline-flex">
                            <Link href="/login">Sign in</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">Apply now</Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main>
                <section className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 md:pt-32">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
                                    <Landmark className="h-4 w-4 text-primary" aria-hidden="true" />
                                    <p className="text-xs font-bold uppercase tracking-wider text-primary">LendFlow Personal Loans</p>
                                </div>
                                <h1 className="font-headline text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                                    Loans as simple as{' '}
                                    <span className="relative inline-block text-primary">
                                        your monthly payment
                                        <svg
                                            aria-hidden="true"
                                            className="absolute -bottom-2 left-0 h-3 w-full text-primary/20"
                                            viewBox="0 0 100 10"
                                            preserveAspectRatio="none"
                                        >
                                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                        </svg>
                                    </span>
                                </h1>
                                <p className="max-w-xl text-xl leading-relaxed text-muted-foreground">
                                    Borrow from ₱30,000 to ₱2,000,000. Pick a term and a monthly rate,
                                    and see exactly what you&rsquo;ll owe each month — before you apply.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <Button size="lg" className="h-14 px-8 text-lg" asChild>
                                    <Link href="/calculator">
                                        Estimate my payment <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                                    </Link>
                                </Button>
                                <Button 
                                    size="lg" 
                                    variant="ghost" 
                                    className="h-14 px-8 text-lg" 
                                    onClick={() => scrollTo('how-it-works')}
                                >
                                    How it works
                                </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-6 rounded-2xl bg-muted/50 p-6">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Borrow</p>
                                    <p className="font-headline text-2xl font-bold">₱30k – ₱2M</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Terms</p>
                                    <p className="font-headline text-2xl font-bold">12 – 36 mo</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Monthly rate</p>
                                    <p className="font-headline text-2xl font-bold">2% – 5%</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div
                                aria-hidden="true"
                                className="absolute -top-12 -right-12 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
                            />
                            <div className="rounded-3xl border-2 bg-card p-8 shadow-2xl">
                                <div className="mb-6 flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Your monthly payment</p>
                                        <p className="mt-3 flex items-baseline gap-2">
                                            <span className="font-headline text-6xl font-bold text-primary">₱3,740</span>
                                            <span className="text-lg text-muted-foreground">/month</span>
                                        </p>
                                    </div>
                                    <Badge className="bg-primary/10 text-primary border-primary/20">Example</Badge>
                                </div>

                                <div className="mb-8 space-y-3">
                                    <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
                                        <div className="h-full bg-primary transition-all duration-500" style={{ width: '67%' }} />
                                        <div className="h-full bg-accent transition-all duration-500" style={{ width: '33%' }} />
                                    </div>
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="flex items-center gap-2 text-muted-foreground">
                                            <span className="h-3 w-3 rounded-full bg-primary" aria-hidden="true" /> Principal ₱60,000
                                        </span>
                                        <span className="flex items-center gap-2 text-muted-foreground">
                                            <span className="h-3 w-3 rounded-full bg-accent" aria-hidden="true" /> Interest ₱29,700
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-6 flex flex-wrap gap-2">
                                    <Badge className="bg-muted text-foreground border-0">₱60,000 loan</Badge>
                                    <Badge className="bg-muted text-foreground border-0">24 months</Badge>
                                    <Badge className="bg-muted text-foreground border-0">3.5% /month</Badge>
                                </div>

                                <div className="rounded-lg bg-muted/50 p-4">
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        <span className="font-semibold text-foreground">Example estimate</span> for illustration only. Open the calculator to see your own numbers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="scroll-mt-24 bg-muted/30 py-24 md:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6">
                        <div className="mx-auto max-w-2xl space-y-4 text-center">
                            <p className="text-sm font-bold uppercase tracking-widest text-primary">How it works</p>
                            <h2 className="font-headline text-4xl font-bold md:text-5xl">Three steps to your loan</h2>
                            <p className="text-lg text-muted-foreground">
                                A straightforward process built around one promise: you always know your cost before you commit.
                            </p>
                        </div>
                        <ol className="mt-16 grid gap-12 md:grid-cols-3">
                            {STEPS.map((step, index) => (
                                <li key={step.title} className="relative space-y-6">
                                    <div className="flex items-center gap-4">
                                        <span aria-hidden="true" className="font-headline text-5xl font-bold text-primary/20">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                                            <step.icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                                        </div>
                                    </div>
                                    <h3 className="font-headline text-2xl font-semibold">{step.title}</h3>
                                    <p className="text-base leading-relaxed text-muted-foreground">{step.description}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section className="py-24 md:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6">
                        <div className="mx-auto max-w-2xl space-y-4 text-center">
                            <p className="text-sm font-bold uppercase tracking-widest text-primary">Why LendFlow</p>
                            <h2 className="font-headline text-4xl font-bold md:text-5xl">Built for the way you budget</h2>
                            <p className="text-lg text-muted-foreground">
                                No confusing fine print. Just a clear loan you can plan around.
                            </p>
                        </div>
                        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {FEATURES.map((feature) => (
                                <div key={feature.title} className="group rounded-2xl border bg-card p-8 transition-all hover:shadow-xl hover:-translate-y-1">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                                        <feature.icon className="h-7 w-7 text-primary" aria-hidden="true" />
                                    </div>
                                    <h3 className="mt-6 font-headline text-xl font-semibold">{feature.title}</h3>
                                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-t bg-muted/30 py-24 md:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6">
                        <div className="grid items-center gap-12 rounded-3xl border bg-card p-12 lg:grid-cols-2">
                            <div className="space-y-4">
                                <h2 className="font-headline text-4xl font-bold md:text-5xl">Know your number before you commit</h2>
                                <p className="text-lg text-muted-foreground">
                                    Estimate your monthly payment, total interest, and full repayment schedule in seconds — no application needed.
                                </p>
                            </div>
                            <Button size="lg" className="h-14 px-8 text-lg" asChild>
                                <Link href="/calculator">
                                    Open the calculator <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <section id="faq" className="scroll-mt-24 py-24 md:py-32">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6">
                        <div className="mb-12 space-y-4 text-center">
                            <p className="text-sm font-bold uppercase tracking-widest text-primary">FAQ</p>
                            <h2 className="font-headline text-4xl font-bold md:text-5xl">Questions, answered</h2>
                            <p className="text-lg text-muted-foreground">Everything you need to know before applying.</p>
                        </div>
                        <Accordion type="single" collapsible className="space-y-4">
                            {FAQS.map((faq) => (
                                <AccordionItem key={faq.question} value={faq.question} className="rounded-2xl border bg-card px-6">
                                    <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="pt-4 text-base text-muted-foreground">{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                <section className="bg-primary py-24 text-primary-foreground md:py-32">
                    <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 text-center sm:px-6">
                        <h2 className="font-headline text-4xl font-bold md:text-5xl">Ready to see your number?</h2>
                        <p className="max-w-xl text-xl text-primary-foreground/90">
                            Estimate your monthly payment in seconds, then apply when you&rsquo;re ready.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg" asChild>
                                <Link href="/calculator">Estimate my payment</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-8 text-lg border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                                asChild
                            >
                                <Link href="/signup">Apply now</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t py-16">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 sm:flex-row sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                            <Landmark className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                        </div>
                        <span className="font-headline text-xl font-bold">LendFlow</span>
                    </div>
                    <nav className="flex items-center gap-8 text-sm font-medium text-muted-foreground" aria-label="Footer">
                        <Link href="/calculator" className="transition-colors hover:text-foreground">Calculator</Link>
                        <button onClick={() => scrollTo('how-it-works')} className="transition-colors hover:text-foreground">How it works</button>
                        <button onClick={() => scrollTo('faq')} className="transition-colors hover:text-foreground">FAQ</button>
                    </nav>
                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} LendFlow</p>
                </div>
            </footer>
        </div>
    );
}
