export default {
    control: {
        // backgroundColor: "#fff",
        // fontSize: 14,
        // fontWeight: "normal",
    },

    "&multiLine": {
        control: {
            // fontFamily: "monospace",
            minHeight: 63,
        },
        highlighter: {
            padding: 0,
            border: "1px solid transparent",
        },
        input: {
            // padding: 9,
            // border: "1px solid white",
            border: 0,
            padding: 0
        },
    },

    suggestions: {
        list: {
            // backgroundColor: "white",
            // border: "1px solid rgba(0,0,0,0.15)",
            // fontSize: 14,
        },
        item: {
            // padding: "5px 15px",
            // borderBottom: "1px solid rgba(0,0,0,0.15)",
            "&focused": {
                backgroundColor: "#ebecef",
            },
        },
    },
};
