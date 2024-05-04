import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/custom/button';
import { PasswordInput } from '@/components/custom/password-input';
import { useRegisterMutation } from '@/features/auth/authApi';
import { useNavigate } from "react-router-dom";


const SignUpForm = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = yup.object().shape({
    name: yup.string().required('Please enter your name'),
    email: yup.string().required('Please enter your email').email('Invalid email address'),
    password: yup.string().required('Please enter your password').min(7, 'Password must be at least 7 characters long'),
    password_confirmation: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match."),
  });

  const [register, { data, isLoading: serverLoading, isError, error }] = useRegisterMutation();


  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const onSubmit = async (data) => {
    await register(data);
  };

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(serverLoading);

    if (isError) {
      if (error?.data?.errors) {
        Object.keys(error.data.errors).forEach(field => {
          form.setError(field, {
            message: error.data.errors[field][0],
          });
        });
      }
    }
    if (data) {
      navigate("/")
    }
  }, [serverLoading, data, isError, error])

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <div className='grid gap-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='John Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name='password_confirmation'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='********' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='mt-2' loading={isLoading} onClick={form.handleSubmit(onSubmit)}>
            Create Account
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;
