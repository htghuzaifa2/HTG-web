"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CustomSizePage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8">
                <Button asChild variant="ghost" className="pl-0 hover:pl-2 transition-all">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>

            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center space-y-4">
                    <Badge variant="secondary" className="px-4 py-1 text-sm">Free Service</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">Custom Size Available</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Don't fit into standard sizes? No problem. We offer custom sizing for all our products absolutely free of charge.
                    </p>
                </div>

                <div className="bg-muted/30 p-8 rounded-2xl border border-border/50 mt-12">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Ruler className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">How it works</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                When placing your order, simply select "Custom Size" if available, or mention your specific measurements in the order notes at checkout. Our team will tailor the product to your exact body measurements for the perfect fit.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 space-y-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-6">Standard Size Charts</h2>
                        <p className="text-muted-foreground">Use these charts as a reference. If your measurements match a standard size, you can order directly. If not, go Custom!</p>
                    </div>

                    {/* Men's Size Chart */}
                    <div className="border rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-muted p-4 border-b">
                            <h3 className="font-bold text-lg text-center">Men's Apparel (Inches)</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Size</th>
                                        <th className="px-6 py-4">Chest</th>
                                        <th className="px-6 py-4">Waist</th>
                                        <th className="px-6 py-4">Hips</th>
                                        <th className="px-6 py-4">Length</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    <tr className="bg-background">
                                        <td className="px-6 py-4 font-medium">S</td>
                                        <td className="px-6 py-4">36-38</td>
                                        <td className="px-6 py-4">28-30</td>
                                        <td className="px-6 py-4">36-38</td>
                                        <td className="px-6 py-4">27</td>
                                    </tr>
                                    <tr className="bg-background">
                                        <td className="px-6 py-4 font-medium">M</td>
                                        <td className="px-6 py-4">39-41</td>
                                        <td className="px-6 py-4">31-33</td>
                                        <td className="px-6 py-4">39-41</td>
                                        <td className="px-6 py-4">28</td>
                                    </tr>
                                    <tr className="bg-background">
                                        <td className="px-6 py-4 font-medium">L</td>
                                        <td className="px-6 py-4">42-44</td>
                                        <td className="px-6 py-4">34-36</td>
                                        <td className="px-6 py-4">42-44</td>
                                        <td className="px-6 py-4">29</td>
                                    </tr>
                                    <tr className="bg-background">
                                        <td className="px-6 py-4 font-medium">XL</td>
                                        <td className="px-6 py-4">45-47</td>
                                        <td className="px-6 py-4">37-39</td>
                                        <td className="px-6 py-4">45-47</td>
                                        <td className="px-6 py-4">30</td>
                                    </tr>
                                    <tr className="bg-background">
                                        <td className="px-6 py-4 font-medium">XXL</td>
                                        <td className="px-6 py-4">48-50</td>
                                        <td className="px-6 py-4">40-42</td>
                                        <td className="px-6 py-4">48-50</td>
                                        <td className="px-6 py-4">31</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Women's Size Chart */}
                    <div className="border rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-muted p-4 border-b">
                            <h3 className="font-bold text-lg text-center">Women's Apparel (Inches)</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Size</th>
                                        <th className="px-6 py-4">Bust</th>
                                        <th className="px-6 py-4">Waist</th>
                                        <th className="px-6 py-4">Hips</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    <tr className="bg-background">
                                        <td className="px-6 py-4 font-medium">S</td>
                                        <td className="px-6 py-4">33-35</td>
                                        <td className="px-6 py-4">26-28</td>
                                        <td className="px-6 py-4">36-38</td>
                                    </tr>
                                    <tr className="bg-background">
                                        <td className="px-6 py-4 font-medium">M</td>
                                        <td className="px-6 py-4">36-38</td>
                                        <td className="px-6 py-4">29-31</td>
                                        <td className="px-6 py-4">39-41</td>
                                    </tr>
                                    <tr className="bg-background">
                                        <td className="px-6 py-4 font-medium">L</td>
                                        <td className="px-6 py-4">39-41</td>
                                        <td className="px-6 py-4">32-34</td>
                                        <td className="px-6 py-4">42-44</td>
                                    </tr>
                                    <tr className="bg-background">
                                        <td className="px-6 py-4 font-medium">XL</td>
                                        <td className="px-6 py-4">42-44</td>
                                        <td className="px-6 py-4">35-37</td>
                                        <td className="px-6 py-4">45-47</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                <div className="text-center mt-12">
                    <p className="text-lg font-medium mb-6">Need help measuring?</p>
                    <Button size="lg" asChild>
                        <Link href="/contact">Contact Support</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
