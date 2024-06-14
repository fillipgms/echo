"use client";
import React, { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import { addFriendRequestByUsername } from "@/lib/actions/friendRequest";
import FormSucces from "./FormSucess";
import FormError from "./FormError";

const AddFriendForm = () => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    if (!isLoaded || !userId) {
        return;
    }

    const formSchema = z.object({
        username: z.string().min(1, {
            message: "Please, insert a username",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        startTransition(() => {
            addFriendRequestByUsername(userId, values.username).then((data) => {
                setError(data.error);
                setSuccess(data.success);

                if (!data.error) {
                    form.reset();
                }
            });
        });
    };

    return (
        <Form {...form}>
            <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex md:flex-row flex-col w-full items-center gap-2">
                                    <Input
                                        placeholder="Insert a username"
                                        {...field}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full md:w-fit"
                                    >
                                        Send Friend Request
                                    </Button>
                                </div>
                            </FormControl>
                            <FormSucces message={success} />
                            <FormError message={error} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default AddFriendForm;
