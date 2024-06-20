"use client";
import React, { startTransition } from "react";
import { AutosizeTextarea } from "./ui/autosize-textarea";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormControl } from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiSendPlane2Fill } from "react-icons/ri";
import TextareaAutosize from "react-textarea-autosize";
import { sendMessage } from "@/lib/actions/message";

const SendMessageInput = ({
    messageFrom,
    messageTo,
}: {
    messageFrom: string;
    messageTo: string;
}) => {
    const from = JSON.parse(messageFrom) as models.User;
    const to = JSON.parse(messageTo) as models.User;

    const formSchema = z.object({
        message: z.string().min(1, {
            message: "Please, insert a username",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        startTransition(() => {
            sendMessage(from, to, values.message).then((data) => {
                form.reset();
            });
        });
    };

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                onSubmit={form.handleSubmit(onSubmit)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        form.handleSubmit(onSubmit)();
                    }
                }}
            >
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="grid md:grid-cols-1 grid-cols-[1fr_min-content] gap-3 items-center">
                                    <TextareaAutosize
                                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        {...field}
                                        placeholder={`Envie uma mensagem para @${to.userName}`}
                                    />
                                    <Button
                                        type="submit"
                                        className="md:hidden flex items-center justify-center"
                                    >
                                        <RiSendPlane2Fill />
                                    </Button>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default SendMessageInput;
