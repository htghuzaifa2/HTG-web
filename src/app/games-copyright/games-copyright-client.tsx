"use client";

import { Gamepad2, AlertTriangle, Copyright, FileWarning, Clock, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/whatsapp-icon";
import Link from "next/link";

export default function GamesCopyrightClient() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-16 content-fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <Gamepad2 className="h-12 w-12 mx-auto text-primary mb-4" />
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Games Copyright & Disclaimer</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Important information about the games available on our platform.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Disclaimer */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                                <AlertTriangle className="h-8 w-8 text-primary" />
                                <span>Disclaimer</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-base dark:prose-invert max-w-none text-muted-foreground">
                            <p>
                                <strong>HTG does not own, host, or claim ownership of any games</strong> available in our games section. All games displayed on this website are <strong>embedded from third-party sources</strong> that are already publicly available on the internet and permitted for embedding.
                            </p>
                            <ul>
                                <li>We do not host any game files on our servers.</li>
                                <li>All games are embedded using iframe technology from external sources.</li>
                                <li>We do not modify, distribute, or claim any rights over these games.</li>
                                <li>Games are provided purely for entertainment purposes.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Copyright Notice */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                                <Copyright className="h-8 w-8 text-primary" />
                                <span>Copyright Notice</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-base dark:prose-invert max-w-none text-muted-foreground">
                            <p>
                                <strong>All copyrights, trademarks, and intellectual property rights</strong> for the games belong to their respective <strong>original creators, developers, and publishers</strong>.
                            </p>
                            <p>
                                We fully respect the rights of game developers and content creators. If you are the rightful owner of any game and have concerns about its presence on our platform, we encourage you to contact us.
                            </p>
                        </CardContent>
                    </Card>

                    {/* DMCA / Takedown Policy */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                                <FileWarning className="h-8 w-8 text-primary" />
                                <span>Removal & Takedown Policy</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-base dark:prose-invert max-w-none text-muted-foreground">
                            <p>
                                If you are the <strong>owner, developer, or authorized representative</strong> of any game and wish to have it removed from our website, we will gladly comply with your request.
                            </p>
                            <p><strong>We accept all removal requests</strong> from legitimate rights holders. To request a game removal, please contact us with:</p>
                            <ul>
                                <li>The name or URL of the game you want removed</li>
                                <li>Proof of ownership or authorization (if applicable)</li>
                                <li>Your contact information</li>
                            </ul>
                            <p>
                                We take all copyright concerns seriously and will process your request promptly.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Response Time */}
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline text-2xl text-primary">
                                <Clock className="h-8 w-8" />
                                <span>48-Hour Response Guarantee</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            <p>
                                We are committed to responding to all copyright and removal requests within <strong>48 hours</strong>. Your concerns are important to us, and we strive to resolve any issues as quickly as possible.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Contact Section */}
                    <Card className="border-2 border-primary/30">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl text-center">
                                Contact Us for Copyright Concerns
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center text-muted-foreground mb-6">
                                If you have any questions, concerns, or removal requests regarding the games on our platform, please reach out to us using one of the methods below:
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" variant="outline" className="gap-2">
                                    <a href="mailto:contact@htg.com.pk">
                                        <Mail className="h-5 w-5" />
                                        Email Us
                                    </a>
                                </Button>
                                <Button asChild size="lg" className="gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white">
                                    <Link href="https://wa.me/message/BY3URMYOW3OMH1" target="_blank" rel="noopener noreferrer">
                                        <WhatsappIcon className="h-5 w-5" />
                                        WhatsApp Us
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
