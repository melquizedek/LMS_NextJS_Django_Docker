"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

// Dummy data for loan applications
const loanApplicationsData = [
    {
        id: 1,
        loanAppNumber: "LN2024001",
        accountType: "Personal Loan",
        applicationDate: "2024-01-15",
        status: "Approved",
        outstandingBalance: 15000.00,
        monthsToPay: 24,
        firstDueDate: "2024-02-15",
        amortization: 678.32,
        remainingBalance: 12500.00
    },
    {
        id: 2,
        loanAppNumber: "LN2024002",
        accountType: "Auto Loan",
        applicationDate: "2024-02-10",
        status: "Processing",
        outstandingBalance: 25000.00,
        monthsToPay: 36,
        firstDueDate: "2024-03-10",
        amortization: 750.00,
        remainingBalance: 25000.00
    },
    {
        id: 3,
        loanAppNumber: "LN2024003",
        accountType: "Home Loan",
        applicationDate: "2024-03-05",
        status: "Approved",
        outstandingBalance: 150000.00,
        monthsToPay: 180,
        firstDueDate: "2024-04-05",
        amortization: 1200.00,
        remainingBalance: 145000.00
    },
    {
        id: 4,
        loanAppNumber: "LN2024004",
        accountType: "Business Loan",
        applicationDate: "2024-03-20",
        status: "Pending",
        outstandingBalance: 50000.00,
        monthsToPay: 60,
        firstDueDate: "2024-04-20",
        amortization: 950.00,
        remainingBalance: 50000.00
    },
    {
        id: 5,
        loanAppNumber: "LN2024005",
        accountType: "Personal Loan",
        applicationDate: "2024-04-01",
        status: "Rejected",
        outstandingBalance: 0,
        monthsToPay: 0,
        firstDueDate: "-",
        amortization: 0,
        remainingBalance: 0
    },
    {
        id: 6,
        loanAppNumber: "LN2024006",
        accountType: "Auto Loan",
        applicationDate: "2024-04-05",
        status: "Approved",
        outstandingBalance: 30000.00,
        monthsToPay: 48,
        firstDueDate: "2024-05-05",
        amortization: 700.00,
        remainingBalance: 28500.00
    },
    {
        id: 7,
        loanAppNumber: "LN2024007",
        accountType: "Personal Loan",
        applicationDate: "2024-04-06",
        status: "Done",
        outstandingBalance: 10000.00,
        monthsToPay: 12,
        firstDueDate: "2024-05-06",
        amortization: 875.00,
        remainingBalance: 10000.00
    }
];

const ITEMS_PER_PAGE = 5;

const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
        case "approved":
            return "default";
        case "processing":
            return "secondary";
        case "pending":
            return "outline";
        case "rejected":
            return "destructive";
        default:
            return "outline";
    }
};

export default function LoanApplicationsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter data based on search query across multiple columns
    const filteredData = useMemo(() => {
        if (!searchQuery) return loanApplicationsData;

        const query = searchQuery.toLowerCase();
        return loanApplicationsData.filter((loan) => {
            return (
                loan.loanAppNumber.toLowerCase().includes(query) ||
                loan.accountType.toLowerCase().includes(query) ||
                loan.applicationDate.includes(query) ||
                loan.status.toLowerCase().includes(query) ||
                loan.outstandingBalance.toString().includes(query) ||
                loan.monthsToPay.toString().includes(query) ||
                loan.firstDueDate.toLowerCase().includes(query) ||
                loan.amortization.toString().includes(query) ||
                loan.remainingBalance.toString().includes(query)
            );
        });
    }, [searchQuery]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Reset to page 1 when search query changes
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-headline font-bold tracking-tight">Loan Applications</h1>
                <p className="text-muted-foreground">View and track all your loan applications</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>My Applications</CardTitle>
                    <CardDescription>A complete list of your loan applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Search Field */}
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search applications..."
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Loan Application Number</TableHead>
                                    <TableHead>Account Type</TableHead>
                                    <TableHead>Application Date</TableHead>
                                    <TableHead>Loan Status</TableHead>
                                    <TableHead className="text-right">Outstanding Balance</TableHead>
                                    <TableHead className="text-center">Months to Pay</TableHead>
                                    <TableHead>First Due Date</TableHead>
                                    <TableHead className="text-right">Amortization</TableHead>
                                    <TableHead className="text-right">Remaining Balance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((loan) => (
                                        <TableRow key={loan.id}>
                                            <TableCell className="font-medium">{loan.loanAppNumber}</TableCell>
                                            <TableCell>{loan.accountType}</TableCell>
                                            <TableCell>{loan.applicationDate}</TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusBadgeVariant(loan.status)}>
                                                    {loan.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                ${loan.outstandingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </TableCell>
                                            <TableCell className="text-center">{loan.monthsToPay}</TableCell>
                                            <TableCell>{loan.firstDueDate}</TableCell>
                                            <TableCell className="text-right">
                                                {loan.amortization > 0 ? `$${loan.amortization.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                ${loan.remainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                                            No loan applications found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls */}
                    {filteredData.length > 0 && (
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
