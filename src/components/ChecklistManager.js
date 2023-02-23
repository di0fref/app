import {HiCheck} from "react-icons/hi";
import {CardModelButton} from "./CardModal";
import {Popover} from '@headlessui/react'
import {BsCheck2Square} from "react-icons/bs";

export default function ChecklistManager() {
    return (

        <Popover>
            <Popover.Button onClick={() => {
            }} className={'mb-2'}>
                <CardModelButton value={"Checklist"} icon={<BsCheck2Square/>}/>
            </Popover.Button>

            <Popover.Panel>



            </Popover.Panel>

        </Popover>


    )
}
