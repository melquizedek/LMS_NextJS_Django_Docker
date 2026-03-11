import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { loanProducts } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-headline font-bold tracking-tight">Explore Our Loan Products</h1>
                <p className="text-muted-foreground">Find the perfect financial solution for your needs.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {loanProducts.map((product) => (
                    <Card key={product.id} className="flex flex-col overflow-hidden">
                        <CardHeader className="p-0">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={product.image.url}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={product.image.hint}
                                />
                            </div>
                        </CardHeader>
                        <div className="flex flex-1 flex-col p-6">
                            <CardTitle className="mb-2 flex items-center gap-2">
                                <product.icon className="h-6 w-6 text-primary" />
                                <span>{product.name}</span>
                            </CardTitle>
                            <CardDescription className="flex-1">{product.description}</CardDescription>
                            <CardFooter className="p-0 pt-6">
                                <Button asChild className="w-full">
                                    <Link href={`/apply?product=${product.id}`}>
                                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
