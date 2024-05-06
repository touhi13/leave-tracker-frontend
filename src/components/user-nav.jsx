import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/custom/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '@/features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { userLoggedOut } from '@/features/auth/authSlice';

export function UserNav() {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const [logout, { isLoading, isError, error }] = useLogoutMutation();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(userLoggedOut());
      navigate("/login");

    } catch (error) {
      console.error(error);
    }
  };

  const capitalizeFirstTwoLetters = (str) => {
    return str.slice(0, 2).toUpperCase();
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/avatars/01.png' alt='@shadcn' />
            <AvatarFallback>{capitalizeFirstTwoLetters(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user.name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick = {handleLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
