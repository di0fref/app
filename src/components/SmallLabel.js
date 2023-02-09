import color from "color";

export default function SmallLabel({label}) {
    return (
        <div style={{backgroundColor: label.color}} className={`h-3 py-2.5 px-1.5 flex items-center space-x-1 rounded`}>
            <div style={{
                backgroundColor: color(label.color).saturate(30).darken(0.4).hex(),
            }} className={'h-2 w-2 rounded-full'}/>
            <div className={'text-xs'}>{label.title}</div>
        </div>
    )
}
