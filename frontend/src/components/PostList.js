import React from "react";
import { List,Datagrid,TextField,DateField,EditButton,DeleteButton } from "react-admin";

const PostList = (props)=>{
     return(
        <List {...props}>
            <Datagrid>
                <TextField source="id"/>
                <TextField source="id"/>
                <TextField source="id"/>
                <TextField source="id"/>
                <EditButton basePath = '/course'/>
                <DeleteButton basePath = '/course'/>
            </Datagrid>
        </List>
     )
}

export default PostList