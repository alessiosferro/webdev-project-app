'use client';

import {PropsWithChildren} from "react";
import {useFormStatus} from "react-dom";

export default function AddPostWrapper({children}: PropsWithChildren) {
    const {pending} = useFormStatus();

    console.log(pending);

    return (
        <>
            {children}
        </>
    )
}