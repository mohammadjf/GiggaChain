import {useContext} from "react";
import {StoreContext} from "../stores/store.ts";

export default function useStore() {
	return useContext(StoreContext)
}