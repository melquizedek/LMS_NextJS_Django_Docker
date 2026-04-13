'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { loanProducts } from "@/lib/data";
import { Info, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

const loanTypes: {value: string; label: string; description: React.ReactNode}[] = [
    {
        value: 'new_client',
        label: 'NEW CLIENT',
        description: <>Applying for a loan for the <strong>first time</strong>.</>
    },
    {
        value: 'additional',
        label: 'ADDITIONAL',
        description: <>With an <strong>active, ongoing loan</strong>, applying for another separate loan.</>
    },
    {
        value: 'renewal',
        label: 'RENEWAL',
        description: <>With an <strong>active, ongoing loan</strong> at least <strong>50% paid</strong>. Applying for a new loan. <strong>Note:</strong> The remaining balance will be deducted from the new loan.</>
    },
    {
        value: 'reloan',
        label: 'RELOAN',
        description: <>With a previous loan <strong>fully paid</strong>. Applying again for a new loan.</>
    },
    {
        value: 'refinancing',
        label: 'REFINANCING',
        description: <>With an <strong>active, ongoing loan</strong>. Applying for <strong>re-computation</strong> for term extension and lighter amortization. <strong>Note:</strong> There is <strong>no cash release</strong>.</>
    },
];
const loanTerms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 18, 24];


export default function ApplyPage() {
    const searchParams = useSearchParams();
    const defaultProduct = searchParams.get('product');
    const { toast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        toast({
            title: "Application Submitted!",
            description: "We've received your loan application and will review it shortly.",
            variant: "default",
        });
        (event.target as HTMLFormElement).reset();
    };

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-headline font-bold tracking-tight">Apply for a Loan</h1>
                <p className="text-muted-foreground">Complete the form below to get started. It only takes a few minutes.</p>
            </div>

            <div className="bg-primary text-primary-foreground p-6 rounded-lg space-y-4">
                <h2 className="text-lg font-bold flex items-center">
                    <Info className="mr-2 h-5 w-5" />
                    Loan Type Definitions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-4 gap-y-3 pt-2">
                    {loanTypes.map((type) => (
                        <React.Fragment key={type.value}>
                            <div className="font-semibold uppercase">{type.label}</div>
                            <div className="text-sm text-primary-foreground/80 md:pl-2">{type.description}</div>
                        </React.Fragment>
                    ))}
                </div>
            </div>


            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Loan Application Form</CardTitle>
                        <CardDescription>Ensure all details are accurate for a faster approval process.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="loan-product">Loan Product</Label>
                                <Select name="loan-product" defaultValue={defaultProduct ?? undefined}>
                                    <SelectTrigger id="loan-product">
                                        <SelectValue placeholder="Select a loan product" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {loanProducts.map((product) => (
                                            <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="loan-amount">Loan Amount ($)</Label>
                                <Input id="loan-amount" name="loan-amount" type="number" placeholder="e.g., 10000" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="loan-type">Loan Type</Label>
                                <Select name="loan-type" required>
                                    <SelectTrigger id="loan-type">
                                        <SelectValue placeholder="Select a loan type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {loanTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="loan-term">Loan Term</Label>
                                <Select name="loan-term" required>
                                    <SelectTrigger id="loan-term">
                                        <SelectValue placeholder="Select a loan term" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {loanTerms.map((term) => (
                                            <SelectItem key={term} value={String(term)}>{term} {term === 1 ? 'month' : 'months'}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="loan-purpose">Purpose of the Loan</Label>
                            <Textarea id="loan-purpose" name="loan-purpose" placeholder="Briefly describe why you need this loan (e.g., home renovation, car purchase)." required />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="monthly-income">Monthly Income ($)</Label>
                                <Input id="monthly-income" name="monthly-income" type="number" placeholder="Your total monthly income" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="monthly-expenses">Monthly Expenses ($)</Label>
                                <Input id="monthly-expenses" name="monthly-expenses" type="number" placeholder="Your total monthly expenses" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="documents">Required Documents</Label>
                            <Input id="documents" name="documents" type="file" multiple />
                            <p className="text-xs text-muted-foreground">Upload payslips, bank statements, or other relevant documents.</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="ml-auto">
                            <Send className="mr-2" /> Submit Application
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
