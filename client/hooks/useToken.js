import { useSelector } from "react-redux";

export default function useToken() {
    const token = useSelector(
        (state) => state.users.data
    )
    return token[0]?.accessToken;
}