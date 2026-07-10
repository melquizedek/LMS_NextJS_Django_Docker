
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, X } from 'lucide-react';

interface AmortizationRow {
    month: number;
    beginningBalance: number;
    monthlyPayment: number;
    principal: number;
    interest: number;
    endingBalance: number;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

export default function LoanCalculatorPage() {
    const [loanAmount, setLoanAmount] = useState(100000);
    const [interestRate, setInterestRate] = useState(5);
    const [loanTerm, setLoanTerm] = useState(30);

    const [results, setResults] = useState<{
        monthlyPayment: number;
        totalPayment: number;
        totalInterest: number;
        amortizationSchedule: AmortizationRow[];
    } | null>(null);

    const calculateLoan = () => {
        const principal = loanAmount;
        const annualInterestRate = interestRate / 100;
        const monthlyInterestRate = annualInterestRate / 12;
        const numberOfPayments = loanTerm * 12;

        if (principal > 0 && annualInterestRate > 0 && numberOfPayments > 0) {
            const monthlyPayment =
                (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

            const totalPayment = monthlyPayment * numberOfPayments;
            const totalInterest = totalPayment - principal;

            let schedule: AmortizationRow[] = [];
            let beginningBalance = principal;

            for (let i = 1; i <= numberOfPayments; i++) {
                const interest = beginningBalance * monthlyInterestRate;
                const principalPaid = monthlyPayment - interest;
                const endingBalance = beginningBalance - principalPaid;

                schedule.push({
                    month: i,
                    beginningBalance: beginningBalance,
                    monthlyPayment: monthlyPayment,
                    principal: principalPaid,
                    interest: interest,
                    endingBalance: endingBalance,
                });

                beginningBalance = endingBalance;
            }

            setResults({
                monthlyPayment,
                totalPayment,
                totalInterest,
                amortizationSchedule: schedule,
            });
        }
    };

    const clearCalculator = () => {
        setLoanAmount(100000);
        setInterestRate(5);
        setLoanTerm(30);
        setResults(null);
    };

    const pieData = results ? [
        { name: 'Principal', value: loanAmount },
        { name: 'Interest', value: results.totalInterest },
    ] : [];

    const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))'];


    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold">Loan Calculator</h1>
                <p className="text-muted-foreground">
                    Estimate your loan payments and see how the principal and interest change over time.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Enter Loan Details</CardTitle>
                    <CardDescription>Provide the loan amount, interest rate, and term to calculate your payments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                            <Input
                                id="loanAmount"
                                type="number"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                placeholder="e.g., 100000"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                            <Input
                                id="interestRate"
                                type="number"
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                step="0.1"
                                placeholder="e.g., 5"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                            <Input
                                id="loanTerm"
                                type="number"
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(Number(e.target.value))}
                                placeholder="e.g., 30"
                            />
                        </div>
                        <div className="flex items-end gap-2">
                            <Button onClick={calculateLoan} className="w-full">
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
