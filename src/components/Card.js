import {formatDate} from "../helper"
import {Link} from "react-router-dom";
import {BsPencil} from "react-icons/bs";
import SmallLabel from "./SmallLabel";

export default function Card({card, setIsOpen}) {


    console.log(card.labels);

    return (
        <Link key={card.id} to={"card/" + card.id} className={'group'}>
            <div className={'hover:shadow-md p-2 my-1 rounded bg-white shadow w-64 _min-h-[6rem] hover:bg-neutral-50 relative'}>
                {/*<BsPencil className={'w-3 h-3 absolute right-2 top-2 text-transparent group-hover:text-neutral-400'}/>*/}
                <div className={'pb-1'}>
                    {/*{card.position}*/}
                    {/*<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Green</span>*/}
                    {/*<span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Yellow</span>*/}

                    <div className={'flex flex-wrap gap-1'}>
                        {card.labels.map(label => {
                            return <SmallLabel label={label}/>
                        })}
                    </div>
                </div>
                <div className={'flex-grow pb-4 _text-md'}>{card.title} </div>
                <div className={'flex items-center space-x-4'}>
                    <div className={'text-xs'}>High</div>
                    <div className={'text-xs'}>{formatDate(card.due)}</div>
                </div>
            </div>
        </Link>

    )
}