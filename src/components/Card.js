export default function Card({card}) {
    return (
        <div className={'flex w-full items-center'}>
            <div className={'hover:shadow-md px-4 my-1 rounded-xl h-12 flex items-center space-x-4 bg-white shadow w-full'}>

                <div><input type={"checkbox"}/></div>
                <div className={'flex-grow text-sm font-semibold'}>{card.title}</div>
                <div className={'flex items-center space-x-4'}>
                    <div>High</div>
                    <div>{Intl.DateTimeFormat("sv-SE").format(new Date(card.createdAt))}</div>
                </div>

            </div>
            <div className={'bg-red-200 w-8 h-8'}></div>
        </div>

    )
}