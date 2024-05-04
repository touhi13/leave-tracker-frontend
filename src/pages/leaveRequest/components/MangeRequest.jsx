import { Button } from '@/components/custom/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea';
import { useManageLeaveRequestMutation } from '@/features/leaveRequest/leaveRequestApi';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Approve, Reject } from './Icons';

const MangeRequest = ({ id, action, comment }) => {
    const leaveRequestCacheKey = useSelector((state) => state.cacheKey.leaveRequest);
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);


    const [formData, setFormData] = useState({
        id: id,
        action: action,
        admin_comment: comment

    });
    const [manageLeaveRequest, { data, isLoading, isError, error }] = useManageLeaveRequestMutation();

    const handleManageRequest = async () => {

        await manageLeaveRequest({ formData, leaveRequestCacheKey });
    }

    useEffect(() => {
        isLoading &&
            setLoader(isLoading);
        data &&
            setOpen(false)

    }, [isLoading, data]);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    {action === 'Approved' ? <Approve /> : <Reject />}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Admin Comment
                        </Label>
                        <h1></h1>
                        <Textarea className="col-span-3" name="admin_comment" value={formData?.admin_comment}
                            onChange={(e) => {
                                setFormData({ ...formData, admin_comment: e.target.value });
                            }} />
                    </div>
                </div>
                <DialogFooter>
                    <Button loading={loader} onClick={() => handleManageRequest()}>{action === 'Approved' ? 'Approve' : ' Reject'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};

export default MangeRequest;