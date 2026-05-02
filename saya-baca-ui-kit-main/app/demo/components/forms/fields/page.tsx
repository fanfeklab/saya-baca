'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { NeoText } from '@/components/atoms/neo-text';
import { FormField } from '@/components/molecules/form-field';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
});

export default function FieldsDemoPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <NeoText variant="title">Form Field Molecule</NeoText>
      <NeoText variant="body" className="text-muted-foreground">
        Molekul pembungkus <code>FormField</code> digunakan untuk menyatukan label, input, dan error message.
      </NeoText>

      <section className="space-y-6">
        <NeoText variant="subtitle">Basic Usage with React Hook Form</NeoText>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Register Dummy</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-6">
              <FormField 
                id="username"
                label="Username"
                placeholder="Masukkan nama panggilan..."
                error={form.formState.errors.username?.message}
                {...form.register("username")}
              />

              <FormField 
                id="email"
                type="email"
                label="Email Orang Tua"
                placeholder="email@contoh.com"
                error={form.formState.errors.email?.message}
                {...form.register("email")}
              />

              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
