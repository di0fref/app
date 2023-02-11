import {TwitterPicker, AlphaPicker, CirclePicker} from "react-color";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addLabel} from "../redux/dataSlice";
import Label from "./Label";
import color from "color";


export default function AddLabel({close}) {

    const project = useSelector(state => state.data.project)

    const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const [_color_, setColor] = useState("")
    const ref = useRef(null)
    const dispatch = useDispatch()

    const saveLabel = () => {

        if (name === "") {
            setError("Please add a title")
            return false
        }
        if (color === "") {
            setError("Please choose a color")
            return false
        }

        dispatch(addLabel({
            title: name,
            color: _color_,
            projectId: project.id
        })).unwrap()
        close()
    }
    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker)
    }
    const onColorChange = (color) => {
        setColor(color.hex)
    }

    useEffect(() => {
        if (name || _color_) {
            setError("")
        }
    }, [name, _color_])

    return (
        <div className={''}>
            <div className={'p-4'}>
                <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center'}>Create new label</div>


                {/*Label preview */}
                <Label label={{
                    title: name,
                    color: _color_
                }}/>

                <label htmlFor={"name"} className={'text-sm text-neutral-500 font-semibold mb-4'}>Title</label>
                <input ref={ref} className={'mt-1 border-1 border-neutral-300 text-md px-2 py-1.5 w-full  rounded-box '} type={"text"} onChange={(e) => setName(e.target.value)}/>

                <div className={'text-red-600 text-sm'}>{error}</div>

            </div>
            <div>
                <div className={'px-4'}>
                    <div>
                        <CirclePicker colors={[
                            "#EDDBF4",
                            "#EEF6EC",
                            "#c2d8e8",
                            "#D6ECD2",
                            "#BDECF3",
                            "#FAF3C0",
                            "#FCE6C6",
                            "#F5D3CE",
                            "#DFE1E6",
                            "#8FDFEB",
                            "#FCDCEF",
                            "#C1C7D0"
                        ]
                            .map(col => {
                                return color(col).saturate(5).hex()
                            })
                        } width={"100%"} onChange={onColorChange}/>
                    </div>
                </div>

            </div>
            <div className={'flex justify-end_ space-x-2 p-4'}>
                <button className={'save-btn mt-2'} onClick={saveLabel}>Create</button>
            </div>
        </div>
    )
}
