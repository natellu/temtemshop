import { DESTROY_SESSION } from "../types"

export const onLogout = () => dispatch => {
        dispatch({ type: DESTROY_SESSION })
}