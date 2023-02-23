import {useSelector} from "react-redux";

export const GoogleHead = (props) => {

    const user = useSelector(state => state.current.user)
    return (
        <img {...props} alt="Avatar" src={user.image} referrerPolicy={"no-referrer"}/>
    )

}

export const Avatar = ({user, ...props}) => {
    console.log(user)
    return (
        <img {...props} alt="Avatar" src={user.image} referrerPolicy={"no-referrer"}/>
    )

}
