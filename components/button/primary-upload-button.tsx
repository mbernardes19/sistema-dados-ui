import { FunctionComponent, ElementType, useRef, ChangeEvent, ChangeEventHandler, useState } from "react"
import { SimpleButton, ButtonProps } from "./simple-button";
import React from "react";


interface UploadButtonProps extends ButtonProps {
    onFileSelect?: (file: File) => void
}

export const PrimaryUploadButton: FunctionComponent<UploadButtonProps> = ({ children, onFileSelect, style }) => {
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
            style={style}
        >
            { children }
            <input 
                type='file'
                ref={inputFile}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                style={{display: 'none'}}
            />
        </SimpleButton>
    )
}