import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/custom/button"
import { useUpdateUserStatusMutation } from '@/features/user/userApi';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const UpdateUserStatus = ({ user_id, status }) => {
    const userCacheKey = useSelector((state) => state.cacheKey.user);

    const [formData, setFormData] = useState({
        user_id: user_id,
        status: status === 'Active' ? 'Blocked' : 'Active',
    });

    const [updateUserStatus, { data, isLoading, isError, error }] = useUpdateUserStatusMutation();

    const handleUpdateUserStatus = async () => {

        await updateUserStatus({ formData, userCacheKey });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">
                    {status === 'Inactive' || status === 'Blocked' ? 'Active' : 'Block'}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm User Status Change</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to change the status?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleUpdateUserStatus}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default UpdateUserStatus;