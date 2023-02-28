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

    if (isUndefined) {
        return (
            // <HiUser {...props} style={{backgroundColor: "#dddddd", color: "#aaa", padding: "3px" }}/>

            <div className={'flex items-center justify-center rounded-full h-8 w-8'} style={{backgroundColor: "#eee", color: "#444", padding: "3px" }}>
                {user.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()}
            </div>


        );
    }

    return <img {...props} src={user.image} alt={"Avatar"} onError={onError} referrerPolicy={"no-referrer"}/>;
};

