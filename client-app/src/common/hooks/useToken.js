import { useSelector } from "react-redux";
import { getToken } from "../redux/selectors";

export const useToken = () => useSelector(getToken);
