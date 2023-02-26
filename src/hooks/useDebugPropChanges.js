
import {useEffect, useRef} from "react";


function logPropDifferences(newProps, lastProps) {
    const allKeys = new Set(Object.keys(newProps)).add(Object.keys(lastProps));
    allKeys.forEach(key => {
        const newValue = newProps[key];
        const lastValue = lastProps[key];
        if (newValue !== lastValue) {
            console.log('New Value: ', newValue);
            console.log('Last Value: ', lastValue);
        }
    });
}

export default function useDebugPropChanges(newProps) {
    const lastProps = useRef();
    // Should only run when the component re-mounts
    useEffect(() => {
        console.log('Mounted');
    }, []);
    if (lastProps.current) {
        logPropDifferences(newProps, lastProps.current);
    }
    lastProps.current = newProps;
}
