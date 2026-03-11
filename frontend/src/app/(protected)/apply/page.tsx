'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { loanProducts } from "@/lib/data";
import { Send } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ApplyPage() {
    const searchParams = useSearchParams();
    const defaultProduct = searchParams.get('product');
    const { toast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
                                <Input id="loan-amount" type="number" placeholder="e.g., 10000" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="loan-purpose">Purpose of the Loan</Label>
                            <Textarea id="loan-purpose" placeholder="Briefly describe why you need this loan (e.g., home renovation, car purchase)." required />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="monthly-income">Monthly Income ($)</Label>
                                <Input id="monthly-income" type="number" placeholder="Your total monthly income" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="monthly-expenses">Monthly Expenses ($)</Label>
                                <Input id="monthly-expenses" type="number" placeholder="Your total monthly expenses" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="documents">Required Documents</Label>
                            <Input id="documents" type="file" multiple />
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
