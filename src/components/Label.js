import color from "color";


export default function Label({label}) {

    return (
        <div style={{backgroundColor: color(label.color).saturate(30).darken(0).hex()}} className={`px-2 h-8 flex items-center space-x-2 rounded-box`}>
            <div style={{
                backgroundColor: label.color && color(label.color).saturate(30).darken(0.4).hex(),
            }} className={'h-3 w-3 rounded-full'}/>
            <div className={'text-sm'}>{label.title}</div>
        </div>
    )
}
