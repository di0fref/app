import {Popover} from "@headlessui/react";
import {BsThreeDotsVertical, BsX} from "react-icons/bs";
import {useDispatch} from "react-redux";
import {archiveCards} from "../redux/dataSlice"

export default function ColumnMenu({column}) {

        const dispatch = useDispatch()


    const archiveAllCards = () => {

        // column.cards.map(card => {
        //     console.log(card);
        // })

        dispatch(archiveCards(
            column.cards.map(card => card.id)
        ))

    }

    return (
        <div className={'relative'}>

            <Popover>

                <Popover.Button className={'hover:bg-modal-darker w-6 h-6 rounded-box flex items-center justify-center'}>
                    <BsThreeDotsVertical/>
                </Popover.Button>

                <Popover.Panel className="absolute top-6 -right-4 z-10 mt-1 w-80 ">
                    {({close}) => (
                        <div className="overflow-hidden rounded shadow-lg _min-h-[24rem] ring-1 ring-black ring-opacity-5 bg-white">
                            <div className="relative bg-white p-4 ">

                                <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>List actions</div>
                                <button onClick={close} className={'absolute top-2 right-2'}>
                                    <BsX className={'h-6 w-6'}/>
                                </button>

                                <div className={'text-md flex flex-col space-y-1'}>
                                    <button className={'text-left w-full hover:bg-modal px-2 py-1'}>Move all cards in this list</button>

                                    <button onClick={e => {
                                        archiveAllCards(e)
                                        close()
                                    }} className={'text-left w-full hover:bg-modal px-2 py-1'}>Archive all cards in this list</button>
                                    <div className={'text-left w-full border-b'}/>

                                    <button className={'text-left w-full hover:bg-modal px-2 py-1'}>Archive this list</button>
                                </div>

                            </div>
                        </div>
                    )}
                </Popover.Panel>
            </Popover>

        </div>
    )
}
