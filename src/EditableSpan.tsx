import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            props.changeTitle(title)
        }
    }

    return (
        editMode
            ? <TextField
                color={"secondary"}
                variant={"standard"}
                value={title}
                autoFocus
                onChange={changeTitle}
                onBlur={offEditMode}
                onKeyPress={onEnter}

            />
            /*<input
                value = {title}
                autoFocus={true} // или просто autoFocus без аргументов
                onChange={changeTitle}
                onBlur={offEditMode}
                onKeyPress={onEnter}
            />*/
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}