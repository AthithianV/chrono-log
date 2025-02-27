import Database from "@tauri-apps/plugin-sql";
import { error } from "@tauri-apps/plugin-log";
import { z } from "zod";

import { TaskSchema } from "../validation/schemas";

export const getAllTasksRepository = async (sort:'ASC'|'DESC'='DESC')=>{
    try {
        const db = await Database.load("sqlite:app.db");
        const result = await db.select(`SELECT * FROM tasks ORDER BY tasks.name ${sort};`);     
        db.close();  
        return result as Task[];
    } catch (err) {
        error("Error Occurred While Fetching tasks: "+JSON.stringify(err));
    }
}

export const addTaskRepository = async (data:z.infer<typeof TaskSchema>)=>{
    try {
        const db = await Database.load("sqlite:app.db");
        const result = await db.execute(
            "INSERT INTO tasks (name, details, color) VALUES ($1, $2, $3)",
            [data.name, data.details, data.color]
        );
        db.close();  
        return result.lastInsertId; 
    } catch (err) {
        error("Error Occurred While adding tasks: "+JSON.stringify(err));
    }
}

export const updateTaskRepository = async (data:Task)=>{
    try {
        const db = await Database.load("sqlite:app.db");
        await db.execute(
            "UPDATE tasks SET name=$1, details=$2, color=$3 WHERE id = $4",
            [data.name, data.details, data.color, data.id]
        )
    } catch (err) {
        error("Error Occurred While Updating tasks: "+JSON.stringify(err));
        throw error;
    }
}

export const deleteTaskRepository = async (id:number)=>{
    try {
        const db = await Database.load("sqlite:app.db");
        await db.execute("DELETE FROM tasks WHERE id = $1",[id]);
        db.close();
    } catch (err) {
        error("Error Occurred While Updating tasks: "+JSON.stringify(err));
        throw error;
    }
}