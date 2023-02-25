import {useSelector} from "react-redux";

export const GoogleHead = (props) => {

    const user = useSelector(state => state?.data.user)
    return (
        <img {...props} alt="Avatar" src={user.image} referrerPolicy={"no-referrer"}/>
    )

}

export const Avatar = ({user, ...props}) => {
    return (
        <img {...props} alt="Avatar" src={user.image} referrerPolicy={"no-referrer"}/>
    )

}
