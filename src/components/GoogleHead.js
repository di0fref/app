import {useSelector} from "react-redux";
import {HiUser} from "react-icons/hi";
import {useState} from "react";

export const GoogleHead = (props) => {

    const user = useSelector(state => state?.data.user)
    return (
        <img {...props} alt="Avatar" src={user.image} referrerPolicy={"no-referrer"}/>
    )

}

export const Avatar = ({user, ...props}) => {

    const [isUndefined, updateIsUndefined] = useState(false);
    const onError = () => {
        updateIsUndefined(true);
    };

    if (isUndefined || !user?.image) {
        return (
            <div className={`${props.className} bg-modal-darker flex items-center justify-center`} style={
                {
                    color: "#444", padding: "3px_"
                }}>
                {
                    user?.name
                        ? user.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()
                        : "n/a"
                }
            </div>


        );
    }

    return <img {...props} src={user.image} alt={"Avatar"} onError={onError} referrerPolicy={"no-referrer"}/>;
};

