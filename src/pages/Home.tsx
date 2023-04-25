import React, { memo } from "react"
import ListTodo from "./todos/ListTodo"

const HomePage = () => {
    return <ListTodo />
}

export default memo(HomePage);