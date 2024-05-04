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
import { useGetUsersQuery } from '@/features/user/userApi';
import { updateCacheKey } from '@/features/cacheKey/cacheKeySlice';
import UpdateUserStatus from './components/UpdateUserStatus';

const User = () => {
    const userCacheKey = useSelector((state) => state.cacheKey.user);
    const dispatch = useDispatch();

    console.log(userCacheKey)

    const { data, isLoading, isError, error, } = useGetUsersQuery(userCacheKey);

    const handlePagination = (e, page) => {
        e.preventDefault();
        console.log(typeof (page))
        dispatch(updateCacheKey({
            key: 'user', payload: { "page": page }
        }))
    }

    return (
        <>
            <div className='mb-2 flex items-center justify-between space-y-2'>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
                    <p className='text-muted-foreground'>
                        Here&apos;s a list of your tasks for this month!
                    </p>
                </div>
            </div>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <Table>
                    <TableCaption>A list of your recent users.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Photo</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.data?.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.profile_image}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.status}</TableCell>
                                <TableCell className="text-right">
                                    <UpdateUserStatus user_id={user.id} status={user.status} />
                                    {/* <UpdateUserStatus id={user.id} action="Rejected" /> */}
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

export default User;