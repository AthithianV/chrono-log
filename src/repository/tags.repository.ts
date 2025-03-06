import Database from "@tauri-apps/plugin-sql";
import { error } from "@tauri-apps/plugin-log";
import { z } from "zod";

import { TagSchema } from "../validation/schemas";

export const getAllTagsRepository = async (sort:'ASC'|'DESC'='DESC')=>{
    try {
        const db = await Database.load("sqlite:app.db");
        const result = await db.select(`SELECT * FROM tags ORDER BY tags.name ${sort};`);     
        db.close();  
        return result as Tag[];
    } catch (err) {
        error("Error Occurred While Fetching Tags: "+JSON.stringify(err));
    }
}

export const addTagRepository = async (data:z.infer<typeof TagSchema>)=>{
    try {
        const db = await Database.load("sqlite:app.db");
        const result = await db.execute(
            "INSERT INTO tags (name, details, color) VALUES ($1, $2, $3)",
            [data.name, data.details, data.color]
        );
        db.close();  
        return result.lastInsertId; 
    } catch (err) {
        error("Error Occurred While adding Tags: "+JSON.stringify(err));
    }
}

export const updateTagRepository = async (data:Tag)=>{
    try {
        const db = await Database.load("sqlite:app.db");
        await db.execute(
            "UPDATE tags SET name=$1, details=$2, color=$3 WHERE id = $4",
            [data.name, data.details, data.color, data.id]
        )
    } catch (err) {
        error("Error Occurred While Updating Tags: "+JSON.stringify(err));
        throw error;
    }
}

export const deleteTagRepository = async (id:number)=>{
    try {
        const db = await Database.load("sqlite:app.db");
        await db.execute("DELETE FROM tags WHERE id = $1",[id]);
        db.close();
    } catch (err) {
        error("Error Occurred While Updating Tags: "+JSON.stringify(err));
        throw error;
    }
}