
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, X, Landmark, Wallet, CalendarRange, ArrowDown } from 'lucide-react';
import {
  calculateLoan,
  formatCurrency,
  clampLoanAmount,
  parseLoanAmount,
  LOAN_CONSTANTS,
  type LoanCalculationResult,
  type AmortizationRow,
} from '@/lib/loan-calculator';

const { TERM_OPTIONS, INTEREST_RATE_OPTIONS } = LOAN_CONSTANTS;

export default function LoanCalculatorPage() {
    const [loanAmountText, setLoanAmountText] = useState('');
    const [interestRate, setInterestRate] = useState(2);
    const [loanTerm, setLoanTerm] = useState(12);

    const loanAmount = parseLoanAmount(loanAmountText);

    const [results, setResults] = useState<LoanCalculationResult | null>(null);

    const handleLoanAmountBlur = () => {
        if (Number.isNaN(loanAmount) || loanAmount === 0) {
            setLoanAmountText('');
            return;
        }
        const clamped = clampLoanAmount(loanAmount);
        setLoanAmountText(formatCurrency(clamped));
    };

    const handleCalculate = () => {
        const calculation = calculateLoan(loanAmount, interestRate, loanTerm);
        if (calculation) {
            setResults(calculation);
        }
    };

    const clearCalculator = () => {
        setLoanAmountText('');
        setInterestRate(2);
        setLoanTerm(12);
        setResults(null);
    };

    const pieData = results ? [
        { name: 'Principal', value: loanAmount },
        { name: 'Interest', value: results.totalInterest },
    ] : [];

    const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))'];

    const scrollToCalculator = () => {
        const el = document.getElementById('calculator');
        if (!el) return;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    };


    return (
        <div className="space-y-10">
            <div className="max-w-3xl space-y-4">
                <div className="flex items-center gap-2 text-primary">
                    <Landmark className="h-4 w-4" aria-hidden="true" />
                    <p className="text-xs font-bold uppercase tracking-[0.2em]">ZedLendingCorp Personal Loans</p>
                </div>
                <h1 className="font-headline text-4xl font-bold leading-tight text-foreground md:text-5xl">
                    Personal Loan{' '}
                    <span className="relative inline-block italic text-primary">
                        Calculator
                        <span
                            aria-hidden="true"
                            className="absolute inset-x-0 -bottom-1 -z-10 h-3 -rotate-1 rounded-sm bg-primary/15"
                        />
                    </span>
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground">
                    Estimate your monthly payments before you apply. Enter an amount, choose a term and
                    monthly rate, and get an instant breakdown of principal and interest.
                </p>
            </div>

            <dl className="flex flex-wrap gap-x-8 gap-y-3 border-y py-4">
                <div className="flex items-baseline gap-2">
                    <dt className="text-sm text-muted-foreground">Borrow</dt>
                    <dd className="font-bold">₱30,000 – ₱2,000,000</dd>
                </div>
                <div className="flex items-baseline gap-2">
                    <dt className="text-sm text-muted-foreground">Terms</dt>
                    <dd className="font-bold">12 – 36 months</dd>
                </div>
                <div className="flex items-baseline gap-2">
                    <dt className="text-sm text-muted-foreground">Monthly rate</dt>
                    <dd className="font-bold">2% – 5%</dd>
                </div>
            </dl>

            <div className="space-y-6">
                <h2 className="font-headline text-2xl font-semibold">How it works</h2>
                <ol className="grid gap-6 md:grid-cols-3">
                    {HOW_IT_WORKS.map((step, index) => (
                        <li key={step.title} className="space-y-3 border-t-2 border-primary/20 pt-5">
                            <div className="flex items-center gap-3">
                                <span aria-hidden="true" className="font-headline text-3xl font-bold italic text-primary/70">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <step.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                            </div>
                            <h3 className="font-headline text-lg font-semibold">{step.title}</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-muted-foreground">
                    Plan your budget around a number you can actually afford.
                </p>
                <Button onClick={scrollToCalculator} size="lg">
                    Estimate my payments <ArrowDown className="ml-2" aria-hidden="true" />
                </Button>
            </div>
            <Card id="calculator">
                <CardHeader>
                    <CardTitle>Enter Loan Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="loanAmount">Amount to Borrow</Label>
                            <Input
                                id="loanAmount"
                                type="text"
                                inputMode="decimal"
                                value={loanAmountText}
                                onChange={(e) => setLoanAmountText(e.target.value)}
                                onBlur={handleLoanAmountBlur}
                                placeholder="e.g., ₱ 100,000.00"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="loanTerm">Loan Term (in Months)</Label>
                            <Select value={String(loanTerm)} onValueChange={(v) => setLoanTerm(Number(v))}>
                                <SelectTrigger id="loanTerm">
                                    <SelectValue placeholder="Select term" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TERM_OPTIONS.map((months) => (
                                        <SelectItem key={months} value={String(months)}>
                                            {months} months
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="interestRate">Interest Rate Per Month</Label>
                            <Select value={String(interestRate)} onValueChange={(v) => setInterestRate(Number(v))}>
                                <SelectTrigger id="interestRate">
                                    <SelectValue placeholder="Select rate" />
                                </SelectTrigger>
                                <SelectContent>
                                    {INTEREST_RATE_OPTIONS.map((rate) => (
                                        <SelectItem key={rate} value={String(rate)}>
                                            {rate}%
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end gap-2">
                            <Button onClick={handleCalculate} className="w-full">
                                <Calculator /> Calculate
                            </Button>
                            <Button onClick={clearCalculator} variant="outline" className="w-full">
                                <X /> Clear
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {results && (
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Calculation Results</CardTitle>
                            <CardDescription>Here is a summary of your loan calculation.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="text-muted-foreground">Monthly Payment</span>
                                    <span className="font-bold text-lg">{formatCurrency(results.monthlyPayment)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="text-muted-foreground">Total Payments</span>
                                    <span className="font-medium">{formatCurrency(results.totalPayment)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="text-muted-foreground">Total Interest</span>
                                    <span className="font-medium">{formatCurrency(results.totalInterest)}</span>
                                </div>
                            </div>
                            <div>
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Amortization Schedule</CardTitle>
                            <CardDescription>A month-by-month breakdown of your loan payments.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="max-h-[600px] overflow-auto">
                                <Table>
                                    <TableHeader className="sticky top-0 bg-muted">
                                        <TableRow>
                                            <TableHead className="w-[100px]">Month</TableHead>
                                            <TableHead>Beginning Balance</TableHead>
                                            <TableHead>Principal</TableHead>
                                            <TableHead>Interest</TableHead>
                                            <TableHead>Ending Balance</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {results.amortizationSchedule.map((row) => (
                                            <TableRow key={row.month}>
                                                <TableCell>{row.month}</TableCell>
                                                <TableCell>{formatCurrency(row.beginningBalance)}</TableCell>
                                                <TableCell>{formatCurrency(row.principal)}</TableCell>
                                                <TableCell>{formatCurrency(row.interest)}</TableCell>
                                                <TableCell>{formatCurrency(row.endingBalance)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
