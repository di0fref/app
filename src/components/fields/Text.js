
const fieldDefs = {
    text: {},
    number: {},
    date: {},
    select: {}
}

export default function Text({value, edit}) {

    if(edit){
        return(
            <div>
                <input type={"text"} value={value}/>
            </div>
        )
    }

    return (
        <div>{value}</div>
    )
}
