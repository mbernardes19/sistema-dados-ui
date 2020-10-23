import { FunctionComponent, ElementType, useRef, ChangeEvent, ChangeEventHandler, useState } from "react"
import { SimpleButton, ButtonProps } from "./simple-button";
import React from "react";


interface UploadButtonProps extends ButtonProps {
    onFileSelect?: (file: File) => void
}

export const PrimaryUploadButton: FunctionComponent<UploadButtonProps> = ({ children, onFileSelect }) => {
    const inputFile = useRef<HTMLInputElement>(null);

    return (
        <SimpleButton
            textColor='white'
            color='#2D2D2D'
            primary
            onClick={() => {
                inputFile.current.click()
                inputFile.current.addEventListener('change',(ev: Event) => onFileSelect((ev.target as HTMLInputElement).files[0]))
            }}
        >
            { children }
            <input type='file' ref={inputFile} style={{display: 'none'}} />
        </SimpleButton>
    )
}