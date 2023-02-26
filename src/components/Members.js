import {Popover} from "@headlessui/react";
import {BsFilter} from "react-icons/bs";
import {HiUser} from "react-icons/hi";

export default function Members() {
    return (
        <div className={'relative'}>

            <Popover>
                {({open, close}) => (
                    <>
                        <div className={'flex'}>
                            <Popover.Button>

                                <div className={'bg-modal  hover:bg-modal-dark rounded-box text-sm flex py-1 px-2 items-center space-x-2'}>
                                    <HiUser/>
                                    <div>Share</div>
                                </div>

                            </Popover.Button>
                            <Popover.Panel>
                                
                            </Popover.Panel>
                        </div>
                    </>
                )}
            </Popover>
        </div>


    )
}
