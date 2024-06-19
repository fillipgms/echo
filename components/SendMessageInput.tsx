"use client";
import React, { startTransition } from "react";
import { AutosizeTextarea } from "./ui/autosize-textarea";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormControl } from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SendMessageInput = ({
    messageFrom,
    messageTo,
}: {
    messageFrom: string;
    messageTo: string;
}) => {
    const from = JSON.parse(messageFrom);
    const to = JSON.parse(messageTo);

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
            console.log(values);
        });
    };

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                onSubmit={form.handleSubmit(onSubmit)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        form.handleSubmit(onSubmit);
                    }
                }}
            >
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <AutosizeTextarea
                                    placeholder={`send message to @${to.userName}`}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full md:w-fit">
                    Send Friend Request
                </Button>
            </form>
        </Form>
    );
};

export default SendMessageInput;
