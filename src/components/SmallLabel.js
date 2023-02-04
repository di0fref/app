export default function SmallLabel({label}) {
    return (
        <div style={{backgroundColor: label.color}} className={`h-4 px-1 flex items-center space-x-1 rounded`}>
            <div style={{
                backgroundColor: label.color
            }} className={'h-2 w-2 rounded-full brightness-90'}></div>
            <div className={'text-xs'}>{label.title}</div>
        </div>
    )
}