import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/custom/button';
import { PasswordInput } from '@/components/custom/password-input';
import { cn } from '@/lib/utils';
import { useLoginMutation } from '@/features/auth/authApi';
import { useNavigate } from "react-router-dom";

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your email')
      .email('Invalid email address'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(7, 'Password must be at least 7 characters long'),
  });

  const [login, { data, isLoading: serverLoading, isError, error }] = useLoginMutation();


  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    const response = await login(data)

    if (response.error) {
      const errorMessage = response.error.data.message || 'An error occurred';

      form.setError('email', { message: errorMessage });
      form.setError('password', { message: errorMessage });
      setIsLoading(false);
    }
  }
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(serverLoading);
    if (data) {
      // navigate('/');
    }
  }, [serverLoading, data]);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={isLoading}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
