import { useSelector } from "react-redux";
import { User, selectIsLoggedIn, selectUser } from './slices/userSlice';

export default function useUser() {
    return useSelector(selectUser) as User
}

export function useIsLoggedIn() {
    return useSelector(selectIsLoggedIn) as boolean
}