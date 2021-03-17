import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {AddBox, Delete} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType ={
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError("Error")
        }
        setTitle("")
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    return(
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                label={"Title"}
                error={!!error} //превращение в булево значение
                helperText={error}

            />
            {/*<input
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                className={error ? "error" : ""}/>*/}

           {/* <button onClick={addItem}>+</button>*/}
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
           {/* {error && <div className={"errorMessage"}>Title is required!</div>}*/}
        </div>
    )
}