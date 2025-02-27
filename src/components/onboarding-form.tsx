"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { onboardingProfileDetails, validateCorporationNumber } from "~/api/onboarding";
import { Button } from "~/components/ui/button";
import { Form as ReactForm, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { canadianPhoneRegex } from "~/utilities/onboarding";

export const onboardingSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  phone: z.string().min(1, "Phone number is required").regex(canadianPhoneRegex, "Invalid phone number"),
  corporationNumber: z.string().min(1, "Corporation number is required").length(9, "Corporation number must be 9 characters long"),
});

export type Onboarding = z.infer<typeof onboardingSchema>;

export default function OnboardingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<Onboarding>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { firstName: "", lastName: "", phone: "", corporationNumber: "" },
  });

  async function onSubmit(values: Onboarding) {
    setIsSubmitting(true);

    try {
      await validateCorporationNumber(values.corporationNumber);
    } catch {
      form.setError("corporationNumber", { message: "Corporation number is invalid" });
      setIsSubmitting(false);
      return;
    }

    try {
      await onboardingProfileDetails(values);
    } catch {
      setIsSubmitting(false);
    }

    setIsSubmitting(false);
  }
  return (
    <ReactForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="noValidate grid grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <Label>First Name</Label>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <Label>Last Name</Label>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <Label>Phone Number</Label>
              <FormControl>
                <Input {...field} inputMode="numeric" maxLength={12} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="corporationNumber"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <Label>Corporation Number</Label>
              <FormControl>
                <Input {...field} inputMode="numeric" maxLength={9} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting} type="submit" className="col-span-2 w-full">
          Submit
        </Button>
      </form>
    </ReactForm>
  );
}
