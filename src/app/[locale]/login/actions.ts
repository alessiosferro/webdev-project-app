'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {createClient} from '@/utils/supabase/server'
import {z} from 'zod';

export async function login(prevState: State | null, formData: FormData) {
    const supabase = createClient();

    const validatedFields = LoginSchema.safeParse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid fields. Failed to login."
        }
    }

    const {error} = await supabase.auth.signInWithPassword(validatedFields.data);

    if (error) {
        return {
            errors: {},
            message: error.message
        }
    }

    revalidatePath('/')
    redirect('/')
}

export async function signup(prevState: State | null, formData: FormData) {
    const supabase = createClient();

    const validatedFields = SignUpSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid fields. Failed to create a new account.",
        }
    }

    const {error} = await supabase.auth.signUp(validatedFields.data);

    if (error) {
        return {
            errors: {},
            message: error.message
        }
    }

    revalidatePath('/')
    redirect('/')
}

export type State = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string;
}

const LoginSchema = z.object({
    email: z.string().min(1, 'Email is required.'),
    password: z.string().min(1, 'Password is required.')
})

const SignUpSchema = z.object({
    email: z.string().email("The email provided has not a valid format."),
    password: z.string().min(4, "The password should have at least 4 characters.")
});
