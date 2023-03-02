import {useSelector} from "react-redux";


export const Avatar = (props) => {

    const user = useSelector(state => state.data.user)
    return (
        <img {...props} alt="Avatar" src={user.image} referrerPolicy={"no-referrer"}/>
    )

}
