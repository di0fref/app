export default function Label({label}) {
    return (
        <div style={{backgroundColor: label.color}} className={`px-2 h-8 flex items-center space-x-2 _rounded`}>
            <div style={{
                backgroundColor: label.color
            }} className={'h-3 w-3 rounded-full brightness-90'}></div>
            <div className={'text-md'}>{label.title}</div>
        </div>
    )
}