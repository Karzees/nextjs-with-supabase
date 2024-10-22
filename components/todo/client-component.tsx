"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function ClientTodoComponent() {
    const [todos, setTodos] = useState<any[] | null>([]);
    const supabase = createClient();

    console.log("hi");

    useEffect(() => {
        const getTodos = async () => {
            let { data: todos, error } = await supabase.from("todos").select("*");
            setTodos(todos);
        };
        getTodos();
}, []);

return (
    <>
        <main className="flex-1 flex flex-col gap-6 px-4">
            {JSON.stringify(todos)}
        </main>
    </>


);
}