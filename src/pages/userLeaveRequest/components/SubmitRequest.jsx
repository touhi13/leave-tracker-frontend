import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Button } from "@/components/custom/button";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons"
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAddLeaveRequestMutation } from "@/features/leaveRequest/leaveRequestApi";
import { useSelector } from "react-redux";


const SubmitRequest = () => {
    const cacheKey = useSelector((state) => state.cacheKey.userLeaveRequest);

    const [loader, setLoading] = useState(false);

    const schema = yup.object().shape({
        leave_type: yup.string().required('Leave type is required'),
        start_date: yup.date().required('Start date is required'),
        end_date: yup.date().required('End date is required'),
        reason: yup.string().required('Reason is required'),
    });

    const [addRequest, {data, isLoading, isError, error}] = useAddLeaveRequestMutation()

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            leave_type: '',
            start_date: '',
            end_date: '',
            reason: '',
        },
    });

    const onSubmit = async (data) => {
        const formattedData = {
            ...data,
            start_date: data.start_date.toISOString().split('T')[0],
            end_date: data.end_date.toISOString().split('T')[0]
        };
        await addRequest({formattedData, cacheKey})
        // console.log(data)
      };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Submit Request</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Submit Leave Request</DialogTitle>
                    <DialogDescription>
                        Please fill out the form below to submit your leave request.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <div className="grid gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="leave_type"
                            render={({ field }) => (
                                <FormItem className='grid grid-cols-4 items-center gap-4'>
                                    <FormLabel className="text-right">Leave Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className="col-span-3">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a leave type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='Casual Leave'>Casual Leave</SelectItem>
                                            <SelectItem value='Sick Leave'>Sick Leave</SelectItem>
                                            <SelectItem value='Emergency Leave'>Emergency Leave</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="start_date"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <FormLabel className="text-right">Start Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "col-span-3 pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {/* <FormDescription>
                                        Your date of birth is used to calculate your age.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="end_date"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <FormLabel className="text-right">End Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "col-span-3 pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {/* <FormDescription>
                                        Your date of birth is used to calculate your age.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='reason'
                            render={({ field }) => (
                                <FormItem className='grid grid-cols-4 items-center gap-4'>
                                    <FormLabel className="text-right">Reason</FormLabel>
                                    <FormControl className="col-span-3">
                                        <Textarea placeholder='John Doe' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" loading={loader} onClick={form.handleSubmit(onSubmit)}>Submit</Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
};

export default SubmitRequest;