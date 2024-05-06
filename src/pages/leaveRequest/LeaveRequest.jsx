import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useDispatch, useSelector } from 'react-redux';
import { useGetLeaveRequestsQuery } from '@/features/leaveRequest/leaveRequestApi';
import { updateCacheKey } from '@/features/cacheKey/cacheKeySlice';
import MangeRequest from './components/MangeRequest';

const LeaveRequest = () => {
    const leaveRequestCacheKey = useSelector((state) => state.cacheKey.leaveRequest);
    const dispatch = useDispatch();

    console.log(leaveRequestCacheKey)

    const { data, isLoading, isError, error, } = useGetLeaveRequestsQuery(leaveRequestCacheKey);

    const handlePagination = (e, page) => {
        e.preventDefault();
        console.log(typeof (page))
        dispatch(updateCacheKey({
            key: 'leaveRequest', payload: { "page": page }
        }))
    }

    return (
        <>
            <div className='mb-2 flex items-center justify-between space-y-2'>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'>Leave Requests</h2>
                    {/* <p className='text-muted-foreground'>
                        Here&apos;s a list of your tasks for this month!
                    </p> */}
                </div>
            </div>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <Table>
                    <TableCaption>A list of your recent Requests.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Leave Type</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Admin Comment</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.data?.map((leaveRequest) => (
                            <TableRow key={leaveRequest.id}>
                                <TableCell>{leaveRequest.name}</TableCell>
                                <TableCell>{leaveRequest.email}</TableCell>
                                <TableCell>{leaveRequest.leave_type}</TableCell>
                                <TableCell>{leaveRequest.start_date}</TableCell>
                                <TableCell>{leaveRequest.end_date}</TableCell>
                                <TableCell>{leaveRequest.reason}</TableCell>
                                <TableCell>{leaveRequest.status}</TableCell>
                                <TableCell>{leaveRequest.admin_comment}</TableCell>
                                <TableCell className="text-right">
                                    <MangeRequest id={leaveRequest.id} action="Approved" comment = {leaveRequest.admin_comment}/>
                                    <MangeRequest id={leaveRequest.id} action="Rejected" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={10}>
                                <Pagination>
                                    <PaginationContent>
                                        {data?.data.prev_page_url !== null &&
                                            <PaginationItem >

                                                <PaginationPrevious href="#" onClick={(e) => handlePagination(e, data?.data?.current_page - 1)} />

                                            </PaginationItem>
                                        }
                                        {data?.data?.links
                                            .filter((_, index, array) => index !== 0 && index !== array.length - 1)
                                            .map((link) => (
                                                <PaginationItem key={link.label}>
                                                    {link.active === true ?
                                                        <PaginationLink href="#" onClick={(e) => handlePagination(e, parseInt(link.label))} isActive>{link.label}
                                                        </PaginationLink> :
                                                        <PaginationLink href="#" onClick={(e) => handlePagination(e, parseInt(link.label))} >{link.label}
                                                        </PaginationLink>
                                                    }
                                                </PaginationItem>
                                            ))}
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        {data?.data.next_page_url !== null &&

                                            <PaginationItem>
                                                <PaginationNext href="#" onClick={(e) => handlePagination(e, data?.data?.current_page + 1)} />
                                            </PaginationItem>
                                        }
                                    </PaginationContent>
                                </Pagination>
                            </TableCell>
                            {/* <TableCell className="text-right">$2,500.00</TableCell> */}
                        </TableRow>

                    </TableFooter>
                </Table>
            </div>
        </>
    );
};

export default LeaveRequest;