import { Dispatch, SetStateAction } from "react";

export default function clearString(...setStates:Dispatch<SetStateAction<string>>[]){
    setStates.forEach(func => func(""))
}